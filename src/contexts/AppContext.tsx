"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { AppDefinition, ComponentDefinition, ComponentInstance, ComponentStyle } from "@/lib/types";
import { defaultAppTemplate } from "@/lib/defaultAppTemplate";

const LOCAL_STORAGE_KEY = "targeted-selection-app-state";

interface AppContextType {
  appDefinition: AppDefinition;
  selectedInstanceId: string | null;
  editorMode: "instance" | "component" | "preview";
  isSelectMode: boolean;
  hasUnsavedChanges: boolean;
  setAppDefinition: (appDefinition: AppDefinition) => void;
  selectInstance: (id: string | null) => void;
  setEditorMode: (mode: "instance" | "component" | "preview") => void;
  setIsSelectMode: (mode: boolean) => void;
  toggleSelectMode: () => void;
  updateInstanceProperty: (instanceId: string, key: string, value: unknown) => void;
  updateInstanceStyle: (instanceId: string, key: keyof ComponentStyle, value: string) => void;
  updateComponentProperty: (componentId: string, key: string, value: unknown) => void;
  updateComponentStyle: (componentId: string, key: keyof ComponentStyle, value: string) => void;
  getSelectedInstance: () => ComponentInstance | null;
  getComponentById: (id: string) => ComponentDefinition | undefined;
  resetAllOverrides: (instanceId: string) => void;
  pushOverridesToComponent: (instanceId: string) => void;
  saveChanges: () => void;
  discardChanges: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [appDefinition, setAppDefinitionState] = useState<AppDefinition>(defaultAppTemplate);
  const [selectedInstanceId, setSelectedInstanceId] = useState<string | null>(null);
  const [editorMode, setEditorMode] = useState<"instance" | "component" | "preview">("preview");
  const [isSelectMode, setIsSelectMode] = useState<boolean>(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);
  const [originalState, setOriginalState] = useState<AppDefinition | null>(null);

  // Load state from localStorage on initial mount
  useEffect(() => {
    const savedState = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        setAppDefinitionState(parsedState);
      } catch (error) {
        console.error("Failed to parse saved state:", error);
        // Fallback to default template if parsing fails
        setAppDefinitionState(defaultAppTemplate);
      }
    }
  }, []);

  // Save state to localStorage whenever appDefinition changes
  const setAppDefinition = (newDefinition: AppDefinition | ((prev: AppDefinition) => AppDefinition)) => {
    if (typeof newDefinition === "function") {
      setAppDefinitionState((prevState) => {
        const nextState = (newDefinition as (prev: AppDefinition) => AppDefinition)(prevState);
        try {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(nextState));
        } catch (error) {
          console.error("Failed to save state to localStorage:", error);
        }
        setHasUnsavedChanges(true);
        return nextState;
      });
    } else {
      setAppDefinitionState(newDefinition);
      setHasUnsavedChanges(true);

      // Store in localStorage
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newDefinition));
      } catch (error) {
        console.error("Failed to save state to localStorage:", error);
      }
    }
  };

  const saveChanges = () => {
    setHasUnsavedChanges(false);
    setEditorMode("preview");
    setIsSelectMode(false);
    selectInstance(null);

    // Update original state to match current state
    setOriginalState(null);
  };

  const discardChanges = () => {
    if (originalState) {
      setAppDefinitionState(originalState);
      // Also update localStorage to match the reverted state
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(originalState));
      } catch (error) {
        console.error("Failed to save reverted state to localStorage:", error);
      }
    }

    setHasUnsavedChanges(false);
    setEditorMode("preview");
    setIsSelectMode(false);
    selectInstance(null);
    setOriginalState(null);
  };

  // When entering edit mode, store the current state as original
  useEffect(() => {
    if (editorMode !== "preview" && !originalState) {
      setOriginalState(JSON.parse(JSON.stringify(appDefinition)));
    }
  }, [editorMode, appDefinition, originalState]);

  const selectInstance = (id: string | null) => {
    setSelectedInstanceId(id);
    // No longer exiting selection mode when selecting a component
    // This allows users to keep selecting different components
  };

  const toggleSelectMode = () => {
    setIsSelectMode((prev) => !prev);
    if (selectedInstanceId && !isSelectMode) {
      setSelectedInstanceId(null);
    }
  };

  const findInstance = (instances: ComponentInstance[], id: string): ComponentInstance | null => {
    for (const instance of instances) {
      if (instance.id === id) {
        return instance;
      }
      if (instance.children) {
        const found = findInstance(instance.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const updateInstancesRecursively = (
    instances: ComponentInstance[],
    id: string,
    updater: (instance: ComponentInstance) => ComponentInstance
  ): ComponentInstance[] => {
    return instances.map((instance) => {
      if (instance.id === id) {
        return updater(instance);
      }
      if (instance.children) {
        return {
          ...instance,
          children: updateInstancesRecursively(instance.children, id, updater),
        };
      }
      return instance;
    });
  };

  const updateInstanceProperty = (instanceId: string, key: string, value: unknown) => {
    setAppDefinition((prev: AppDefinition) => ({
      ...prev,
      instances: updateInstancesRecursively(prev.instances, instanceId, (instance) => {
        // Create a new properties object
        const updatedProperties = { ...instance.properties };

        if (value === undefined) {
          // If value is undefined, remove the property to reset to component default
          // Use type assertion to tell TypeScript this is a valid operation
          delete (updatedProperties as Record<string, unknown>)[key];
        } else {
          // Otherwise set the new value
          // Use type assertion to tell TypeScript this is a valid operation
          (updatedProperties as Record<string, unknown>)[key] = value;
        }

        return {
          ...instance,
          properties: updatedProperties,
        };
      }),
    }));
  };

  const updateInstanceStyle = (instanceId: string, key: keyof ComponentStyle, value: string) => {
    setAppDefinition((prev: AppDefinition) => ({
      ...prev,
      instances: updateInstancesRecursively(prev.instances, instanceId, (instance) => {
        // Create a new instanceStyles object or use empty object if it doesn't exist
        const updatedStyles: ComponentStyle = { ...(instance.instanceStyles || {}) };

        if (value === "") {
          // If value is empty string, remove the style to reset to component default
          delete updatedStyles[key];
        } else {
          // Otherwise set the new value
          updatedStyles[key] = value;
        }

        return {
          ...instance,
          instanceStyles: updatedStyles,
        };
      }),
    }));
  };

  const updateComponentProperty = (componentId: string, key: string, value: unknown) => {
    setAppDefinition((prev: AppDefinition) => {
      // First find the component to update
      const updatedComponents = prev.components.map((component: ComponentDefinition) => {
        if (component.id === componentId) {
          return {
            ...component,
            properties: {
              ...component.properties,
              [key]: value,
            },
          };
        }
        return component;
      });

      // Update instances that are using this component
      // If instances haven't overridden this property, they should use the new value
      const updatedInstances = updateInstancesForComponentChange(prev.instances, componentId, key, value, true);

      return {
        ...prev,
        components: updatedComponents,
        instances: updatedInstances,
      };
    });
  };

  const updateComponentStyle = (componentId: string, key: keyof ComponentStyle, value: string) => {
    setAppDefinition((prev: AppDefinition) => {
      // First find the component to update
      const updatedComponents = prev.components.map((component: ComponentDefinition) => {
        if (component.id === componentId) {
          return {
            ...component,
            defaultStyles: {
              ...component.defaultStyles,
              [key]: value,
            },
          };
        }
        return component;
      });

      // Update instances that are using this component
      // If instances haven't overridden this style, they should use the new value
      const updatedInstances = updateInstancesForComponentChange(prev.instances, componentId, key, value, false);

      return {
        ...prev,
        components: updatedComponents,
        instances: updatedInstances,
      };
    });
  };

  // Helper function to update instances when a component property changes
  const updateInstancesForComponentChange = (
    instances: ComponentInstance[],
    componentId: string,
    key: string,
    value: unknown,
    isProperty: boolean
  ): ComponentInstance[] => {
    return instances.map((instance) => {
      // Create a new instance reference to ensure re-render
      let updatedInstance = { ...instance };

      // Update this instance if it's using the changed component
      if (instance.componentId === componentId) {
        // Create a new instance reference even for instances that use the default values
        // This is necessary to trigger re-renders in React
        updatedInstance = { ...updatedInstance };
      }

      // If instance has children, recursively update them
      if (instance.children && instance.children.length > 0) {
        updatedInstance = {
          ...updatedInstance,
          children: updateInstancesForComponentChange(instance.children, componentId, key, value, isProperty),
        };
      }

      return updatedInstance;
    });
  };

  const getSelectedInstance = (): ComponentInstance | null => {
    if (!selectedInstanceId) return null;
    return findInstance(appDefinition.instances, selectedInstanceId);
  };

  const getComponentById = (id: string): ComponentDefinition | undefined => {
    return appDefinition.components.find((comp) => comp.id === id);
  };

  const resetAllOverrides = (instanceId: string) => {
    setAppDefinition((prev: AppDefinition) => ({
      ...prev,
      instances: updateInstancesRecursively(prev.instances, instanceId, (instance) => ({
        ...instance,
        properties: {}, // Reset all property overrides
        instanceStyles: {}, // Reset all style overrides
      })),
    }));
  };

  const pushOverridesToComponent = (instanceId: string) => {
    const instance = findInstance(appDefinition.instances, instanceId);
    if (!instance) return;

    const component = getComponentById(instance.componentId);
    if (!component) return;

    // Start updating the app definition
    setAppDefinition((prev: AppDefinition) => {
      // Update component properties with instance overrides
      const updatedComponents = prev.components.map((comp: ComponentDefinition) => {
        if (comp.id === instance.componentId) {
          return {
            ...comp,
            // Merge instance property overrides into component properties
            properties: {
              ...comp.properties,
              ...instance.properties,
            },
            // Merge instance style overrides into component default styles
            defaultStyles: {
              ...comp.defaultStyles,
              ...(instance.instanceStyles || {}),
            },
          };
        }
        return comp;
      });

      // Reset instance overrides after pushing them up
      const updatedInstances = updateInstancesRecursively(prev.instances, instanceId, (instance) => ({
        ...instance,
        properties: {}, // Reset all property overrides
        instanceStyles: {}, // Reset all style overrides
      }));

      return {
        ...prev,
        components: updatedComponents,
        instances: updatedInstances,
      };
    });
  };

  const value = {
    appDefinition,
    selectedInstanceId,
    editorMode,
    isSelectMode,
    hasUnsavedChanges,
    setAppDefinition,
    selectInstance,
    setEditorMode,
    setIsSelectMode,
    toggleSelectMode,
    updateInstanceProperty,
    updateInstanceStyle,
    updateComponentProperty,
    updateComponentStyle,
    getSelectedInstance,
    getComponentById,
    resetAllOverrides,
    pushOverridesToComponent,
    saveChanges,
    discardChanges,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
