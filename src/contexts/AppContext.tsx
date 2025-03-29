"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { AppDefinition, ComponentDefinition, ComponentInstance, ComponentStyle } from "@/lib/types";
import { defaultAppTemplate } from "@/lib/defaultAppTemplate";

interface AppContextType {
  appDefinition: AppDefinition;
  selectedInstanceId: string | null;
  editorMode: "instance" | "component" | "preview";
  isSelectMode: boolean;
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
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [appDefinition, setAppDefinition] = useState<AppDefinition>(defaultAppTemplate);
  const [selectedInstanceId, setSelectedInstanceId] = useState<string | null>(null);
  const [editorMode, setEditorMode] = useState<"instance" | "component" | "preview">("preview");
  const [isSelectMode, setIsSelectMode] = useState<boolean>(false);

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
    setAppDefinition((prev) => ({
      ...prev,
      instances: updateInstancesRecursively(prev.instances, instanceId, (instance) => {
        // Create a new properties object
        const updatedProperties = { ...instance.properties };

        if (value === undefined) {
          // If value is undefined, remove the property to reset to component default
          delete updatedProperties[key];
        } else {
          // Otherwise set the new value
          updatedProperties[key] = value;
        }

        return {
          ...instance,
          properties: updatedProperties,
        };
      }),
    }));
  };

  const updateInstanceStyle = (instanceId: string, key: keyof ComponentStyle, value: string) => {
    setAppDefinition((prev) => ({
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
    setAppDefinition((prev) => {
      // First find the component to update
      const updatedComponents = prev.components.map((component) => {
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
    setAppDefinition((prev) => {
      // First find the component to update
      const updatedComponents = prev.components.map((component) => {
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
      let updatedInstance = { ...instance };

      // Update this instance if it's using the changed component
      if (instance.componentId === componentId) {
        // Nothing needs to be changed for instances that use the default
        // They will automatically use the updated component value
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
    setAppDefinition((prev) => ({
      ...prev,
      instances: updateInstancesRecursively(prev.instances, instanceId, (instance) => ({
        ...instance,
        properties: {}, // Reset all property overrides
        instanceStyles: {}, // Reset all style overrides
      })),
    }));
  };

  const value = {
    appDefinition,
    selectedInstanceId,
    editorMode,
    isSelectMode,
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
