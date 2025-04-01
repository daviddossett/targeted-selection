"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { AppDefinition, ComponentDefinition, ComponentInstance, ComponentStyle, ThemeSettings } from "@/lib/types";
import { defaultAppTemplate } from "@/lib/defaultAppTemplate";
import { defaultTheme } from "@/lib/themeDefaults";

interface AppContextType {
  appDefinition: AppDefinition;
  selectedInstanceId: string | null;
  editorMode: "instance" | "component" | "preview";
  isSelectMode: boolean;
  themeSettings: ThemeSettings;
  setAppDefinition: (appDefinition: AppDefinition | ((prev: AppDefinition) => AppDefinition)) => void;
  selectInstance: (id: string | null) => void;
  setEditorMode: (mode: "instance" | "component" | "preview") => void;
  setIsSelectMode: (mode: boolean) => void;
  toggleSelectMode: () => void;
  updateInstanceProperty: (instanceId: string, key: string, value: unknown) => void;
  updateInstanceStyle: (instanceId: string, key: keyof ComponentStyle, value: string) => void;
  updateComponentProperty: (componentId: string, key: string, value: unknown) => void;
  updateComponentStyle: (componentId: string, key: keyof ComponentStyle, value: string) => void;
  updateThemeSetting: (key: keyof ThemeSettings, value: string) => void;
  getSelectedInstance: () => ComponentInstance | null;
  getComponentById: (id: string) => ComponentDefinition | undefined;
  resetAllOverrides: (instanceId: string) => void;
  pushOverridesToComponent: (instanceId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [appDefinition, setAppDefinitionState] = useState<AppDefinition>(defaultAppTemplate);
  const [selectedInstanceId, setSelectedInstanceId] = useState<string | null>(null);
  const [editorMode, setEditorMode] = useState<"instance" | "component" | "preview">("preview");
  const [isSelectMode, setIsSelectMode] = useState<boolean>(false);
  const [themeSettings, setThemeSettings] = useState<ThemeSettings>(defaultTheme);

  // Save state to memory (no longer using localStorage)
  const setAppDefinition = (newDefinition: AppDefinition | ((prev: AppDefinition) => AppDefinition)) => {
    if (typeof newDefinition === "function") {
      setAppDefinitionState((prevState) => {
        const nextState = (newDefinition as (prev: AppDefinition) => AppDefinition)(prevState);
        return nextState;
      });
    } else {
      setAppDefinitionState(newDefinition);
    }
  };

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

  const updateThemeSetting = (key: keyof ThemeSettings, value: string) => {
    // Update theme settings immediately with no need for save button
    setThemeSettings((prev) => ({
      ...prev,
      [key]: value,
    }));

    // Now update any component styles that reference this theme property
    // This ensures immediate updates to components using theme colors
    setAppDefinition((prev) => {
      // First, identify components that reference the changed theme property
      const updatedComponents = prev.components.map((component) => {
        const updatedStyles = { ...component.defaultStyles };

        // Check common style properties that might be using the theme values
        if (key === "primaryAccent" && component.defaultStyles.backgroundColor === themeSettings.primaryAccent) {
          updatedStyles.backgroundColor = value;
        }
        if (key === "secondaryAccent" && component.defaultStyles.backgroundColor === themeSettings.secondaryAccent) {
          updatedStyles.backgroundColor = value;
        }
        if (
          key === "primaryBackground" &&
          component.defaultStyles.backgroundColor === themeSettings.primaryBackground
        ) {
          updatedStyles.backgroundColor = value;
        }
        if (
          key === "secondaryBackground" &&
          component.defaultStyles.backgroundColor === themeSettings.secondaryBackground
        ) {
          updatedStyles.backgroundColor = value;
        }
        if (
          (key === "primaryText" || key === "secondaryText") &&
          component.defaultStyles.color === themeSettings[key]
        ) {
          updatedStyles.color = value;
        }

        return {
          ...component,
          defaultStyles: updatedStyles,
        };
      });

      // Update instances to trigger re-renders
      const updatedInstances = prev.instances.map((instance) => ({ ...instance }));

      return {
        ...prev,
        components: updatedComponents,
        instances: updatedInstances,
      };
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
      instances: updateInstancesRecursively(prev.instances, instanceId, (instance) => {
        const componentDef = getComponentById(instance.componentId);
        if (!componentDef) {
          return instance;
        }
        
        return {
          ...instance,
          // Instead of setting to empty object, we'll clone the component's default properties
          properties: { ...componentDef.properties },
          instanceStyles: {}, // Reset all style overrides
        };
      }),
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
      const updatedInstances = updateInstancesRecursively(prev.instances, instanceId, (instance) => {
        // Get the updated component (with the new pushed values)
        const updatedComponent = updatedComponents.find(comp => comp.id === instance.componentId);
        if (!updatedComponent) {
          return instance;
        }
        
        return {
          ...instance,
          // Use the component's properties instead of empty object
          properties: { ...updatedComponent.properties },
          instanceStyles: {}, // Reset all style overrides
        };
      });

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
    themeSettings,
    setAppDefinition,
    selectInstance,
    setEditorMode,
    setIsSelectMode,
    toggleSelectMode,
    updateInstanceProperty,
    updateInstanceStyle,
    updateComponentProperty,
    updateComponentStyle,
    updateThemeSetting,
    getSelectedInstance,
    getComponentById,
    resetAllOverrides,
    pushOverridesToComponent,
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
