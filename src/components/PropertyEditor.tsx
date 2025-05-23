"use client";
import React from "react";
import { useAppContext } from "@/contexts/AppContext";
import { ComponentStyle } from "@/lib/types";
import {
  fontSizeOptions,
  borderRadiusOptions,
  boxShadowOptions,
  fontWeightOptions,
  spacingOptions,
} from "@/lib/designPresets";
import { StyleOptionDropdown, ColorPicker } from "./StyleOptionDropdown";

interface PropertyEditorProps {
  mode: "instance" | "component";
}

export const PropertyEditor: React.FC<PropertyEditorProps> = ({ mode }) => {
  const {
    getSelectedInstance,
    getComponentById,
    updateInstanceProperty,
    updateComponentProperty,
    updateInstanceStyle,
    updateComponentStyle,
    themeSettings,
  } = useAppContext();

  const selectedInstance = getSelectedInstance();

  if (!selectedInstance) {
    return (
      <div className="p-4 text-muted-foreground">
        <p className="text-sm">
          No element selected. Enter select mode and click on an element to edit its properties.
        </p>
      </div>
    );
  }

  const component = getComponentById(selectedInstance.componentId);
  if (!component) {
    return <div className="p-4 text-red-500">Component not found</div>;
  }

  // Function to reset an instance property to its default component value
  const resetInstanceProperty = (key: string) => {
    // Setting to undefined effectively removes the override
    updateInstanceProperty(selectedInstance.id, key, undefined);
  };

  // Function to reset an instance style to its default component value
  const resetInstanceStyle = (key: keyof ComponentStyle) => {
    // Setting to empty string effectively removes the override
    updateInstanceStyle(selectedInstance.id, key, "");
  };

  // Determine if a property should use a specialized dropdown based on its key and component type
  const renderPropertyField = (
    key: string,
    currentValue: string | number | boolean,
    onChange: (value: string | number | boolean) => void
  ) => {
    // Handle image source field with file upload capability
    if (key === "imageSrc") {
      return (
        <div className="space-y-2">
          {currentValue && typeof currentValue === 'string' && (
            <div className="mb-2">
              <img 
                src={currentValue as string} 
                alt="Preview" 
                className="h-24 rounded-md object-cover"
              />
            </div>
          )}
          <div className="flex gap-2">
            <input
              type="text"
              value={String(currentValue || '')}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Image URL"
              className="block w-full rounded-md border-border bg-card shadow-sm focus:border-accent focus:ring-accent sm:text-sm p-2 border"
            />
            <label className="bg-blue-500 text-white px-3 py-2 rounded-md text-sm cursor-pointer hover:bg-blue-600 transition-colors flex items-center justify-center">
              Upload
              <input 
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  
                  // Create a URL for the uploaded file
                  const url = URL.createObjectURL(file);
                  onChange(url);
                }}
              />
            </label>
          </div>
        </div>
      );
    }

    // Handle image alt text field
    if (key === "imageAlt") {
      return (
        <input
          type="text"
          value={String(currentValue || '')}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Alt text for image"
          className="block w-full rounded-md border-border bg-card shadow-sm focus:border-accent focus:ring-accent sm:text-sm p-2 border"
        />
      );
    }

    // Keep content fields as text inputs
    if (key === "content" || key === "text") {
      return (
        <input
          type="text"
          value={String(currentValue)}
          onChange={(e) => onChange(e.target.value)}
          className="block w-full rounded-md border-border bg-card shadow-sm focus:border-accent focus:ring-accent sm:text-sm p-2 border"
        />
      );
    }

    // For boolean properties, use a toggle dropdown
    if (typeof currentValue === "boolean") {
      const booleanOptions = [
        { value: "true", label: "Yes" },
        { value: "false", label: "No" },
      ];

      return (
        <StyleOptionDropdown
          options={booleanOptions}
          value={String(currentValue)}
          onChange={(value) => onChange(value === "true")}
          placeholder="Select option"
          type="select"
        />
      );
    }

    // For any other property, create a simple dropdown with a few common options
    const commonOptions = [
      { value: String(currentValue), label: String(currentValue) },
      { value: "", label: "None" },
    ];

    return (
      <StyleOptionDropdown
        options={commonOptions}
        value={String(currentValue)}
        onChange={(value) => onChange(value)}
        placeholder={`Select ${key}`}
        type="select"
      />
    );
  };

  // Helper function to map style property to theme variable
  const getThemeVariableForStyleProperty = (key: string): string => {
    // Map style properties to theme variables
    const styleToThemeMap: Record<string, string> = {
      backgroundColor: "primaryBackground",
      color: "primaryText",
      borderColor: "primaryAccent",
      accentColor: "primaryAccent",
      primaryColor: "primaryAccent",
      secondaryColor: "secondaryAccent",
      // Add additional mappings as needed
    };

    return styleToThemeMap[key] || "";
  };

  // Helper function to check if a style is using a theme color
  const isUsingThemeColor = (key: string, value: string): boolean => {
    const themeVariableName = getThemeVariableForStyleProperty(key);
    if (!themeVariableName) return false;

    // Check if the value matches any of the theme colors
    const themeColors = [
      themeSettings.primaryAccent,
      themeSettings.secondaryAccent,
      themeSettings.primaryBackground,
      themeSettings.secondaryBackground,
      themeSettings.primaryText,
      themeSettings.secondaryText,
    ];

    return themeColors.includes(value);
  };

  // Helper function to get the theme variable name for a style value
  const getThemeVariableForValue = (key: string, value: string): string | null => {
    const themeVariableName = getThemeVariableForStyleProperty(key);
    if (!themeVariableName) return null;

    // Check which theme color matches
    if (value === themeSettings.primaryAccent) return "primaryAccent";
    if (value === themeSettings.secondaryAccent) return "secondaryAccent";
    if (value === themeSettings.primaryBackground) return "primaryBackground";
    if (value === themeSettings.secondaryBackground) return "secondaryBackground";
    if (value === themeSettings.primaryText) return "primaryText";
    if (value === themeSettings.secondaryText) return "secondaryText";

    return null;
  };

  // Determine if a style property should use a specialized dropdown
  const renderStyleField = (
    key: keyof ComponentStyle,
    currentValue: string,
    defaultValue: string,
    onChange: (value: string) => void
  ) => {
    // For all color properties, show theme colors and custom option
    if (key === "color" || key === "backgroundColor" || key.includes("Color")) {
      // Determine if this is a text color or background color
      const isTextColor = key === "color";
      
      return (
        <ColorPicker
          value={currentValue || ""}
          onChange={onChange}
          allowInherit={false}
          inheritedValue={defaultValue} // Pass the inherited value from the parent component
          themeVariableName={null}
          showOnlyThemeColors={false}
          isTextColor={isTextColor} // Force text color options for the "color" property
        />
      );
    }

    // Add "inherit" option for instance mode
    const addInheritOption = (options: { value: string; label: string }[]) => {
      if (mode === "instance") {
        // Create a direct inherit option with empty value but shows what will be inherited
        // Use `${key}:inherit` as the value to make it unique
        return [{ value: `${key}:inherit`, label: `Inherit (${defaultValue || "None"})` }, ...options];
      }
      return options;
    };

    // Custom handler to intercept the inherit special case
    const handleStyleChange = (value: string) => {
      // If it's our special inherit marker, convert to empty string
      if (value && value.endsWith(":inherit")) {
        onChange("");
        return;
      }
      onChange(value);
    };

    switch (key) {
      case "fontSize":
        return (
          <StyleOptionDropdown
            options={addInheritOption(fontSizeOptions)}
            value={currentValue || ""}
            onChange={handleStyleChange}
            placeholder=""
            type="select"
          />
        );

      case "fontWeight":
        return (
          <StyleOptionDropdown
            options={addInheritOption(fontWeightOptions)}
            value={currentValue || ""}
            onChange={handleStyleChange}
            placeholder=""
            type="select"
          />
        );

      case "borderRadius":
        return (
          <StyleOptionDropdown
            options={addInheritOption(borderRadiusOptions)}
            value={currentValue || ""}
            onChange={handleStyleChange}
            placeholder=""
            type="select"
          />
        );

      case "boxShadow":
        return (
          <StyleOptionDropdown
            options={addInheritOption(boxShadowOptions)}
            value={currentValue || ""}
            onChange={handleStyleChange}
            placeholder=""
            type="select"
          />
        );

      case "padding":
      case "margin":
      case "gap":
      case "marginTop":
      case "marginRight":
      case "marginBottom":
        return (
          <StyleOptionDropdown
            options={addInheritOption(spacingOptions)}
            value={currentValue || ""}
            onChange={handleStyleChange}
            placeholder=""
            type="select"
          />
        );

      // For any other style properties use a dropdown with common options
      default:
        // Create common options without duplicates
        const commonOptions = [];

        // Add current value first (if it exists)
        if (currentValue) {
          commonOptions.push({ value: currentValue, label: currentValue });
        } else {
          commonOptions.push({ value: "", label: "None" });
        }

        // Add standard options, but skip if they would create duplicates
        const standardValues = [
          { value: "auto", label: "Auto" },
          { value: "100%", label: "100%" },
          { value: "initial", label: "Initial" },
        ];

        standardValues.forEach((option) => {
          // Only add if not a duplicate of the current value
          if (option.value !== currentValue) {
            commonOptions.push({
              value: option.value,
              label: option.label,
              id: `std-${option.value}`, // Add unique id to prevent key conflicts
            });
          }
        });

        return (
          <StyleOptionDropdown
            options={mode === "instance" ? addInheritOption(commonOptions) : commonOptions}
            value={currentValue || ""}
            onChange={mode === "instance" ? handleStyleChange : onChange}
            placeholder=""
            type="select"
          />
        );
    }
  };

  if (mode === "instance") {
    // Sort the style entries to prioritize colors
    const sortedInstanceStyles = Object.entries(component.defaultStyles).sort(([keyA], [keyB]) => {
      // Color properties should come first
      if (keyA === "color" || keyA === "backgroundColor") return -1;
      if (keyB === "color" || keyB === "backgroundColor") return 1;
      return 0; // Keep original order for other properties
    });

    // Check if component has any properties at all in its definition
    const hasComponentProperties = Object.keys(component.properties).length > 0;

    return (
      <div className="p-4 space-y-10">
        {hasComponentProperties && (
          <div className="bg-background">
            <h3 className="text-xs font-semibold mb-4 text-gray-600">Instance properties</h3>
            <div className="space-y-4">
              {Object.entries(component.properties).map(([key, defaultValue]) => {
                // Skip rendering the variant property
                if (key === "variant") return null;

                const hasOverride =
                  selectedInstance.properties[key as keyof typeof selectedInstance.properties] !== undefined;
                const currentValue = hasOverride
                  ? selectedInstance.properties[key as keyof typeof selectedInstance.properties]
                  : defaultValue;
                return (
                  <div key={key} className="space-y-1">
                    <label className="block text-sm font-medium text-gray-900">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </label>
                    <div className="flex items-center space-x-2">
                      {renderPropertyField(key, currentValue, (value) =>
                        updateInstanceProperty(selectedInstance.id, key, value)
                      )}
                      {hasOverride && (
                        <button
                          onClick={() => resetInstanceProperty(key)}
                          className="px-2 py-2 bg-muted text-muted-foreground rounded hover:bg-muted/80"
                          title="Reset to component default"
                        >
                          <ResetIcon />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="bg-background">
          <h3 className="text-xs font-semibold mb-4 text-gray-600">Instance styles</h3>
          <div className="space-y-4">
            {sortedInstanceStyles.map(([key, defaultValue]) => {
              const styleKey = key as keyof ComponentStyle;
              const instanceStyleValue = selectedInstance.instanceStyles?.[styleKey];
              const hasOverride = instanceStyleValue !== undefined && instanceStyleValue !== "";
              const currentValue = hasOverride ? instanceStyleValue : "";

              return (
                <div key={styleKey} className="space-y-1">
                  <label className="block text-sm font-medium text-gray-900">
                    {styleKey.charAt(0).toUpperCase() + styleKey.slice(1)}
                  </label>
                  <div className="flex items-center space-x-2">
                    {renderStyleField(styleKey, currentValue, defaultValue as string, (value) =>
                      updateInstanceStyle(selectedInstance.id, styleKey, value)
                    )}

                    {hasOverride && (
                      <button
                        onClick={() => resetInstanceStyle(styleKey)}
                        className="px-2 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                        title="Reset to component default"
                      >
                        <ResetIcon />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  } else {
    // Component editing mode
    // Sort the style entries to prioritize colors
    const sortedDefaultStyles = Object.entries(component.defaultStyles).sort(([keyA], [keyB]) => {
      // Color properties should come first
      if (keyA === "color" || keyA === "backgroundColor") return -1;
      if (keyB === "color" || keyB === "backgroundColor") return 1;
      return 0; // Keep original order for other properties
    });

    return (
      <div className="p-4 space-y-10">
        <div className="bg-background">
          <h3 className="text-xs font-semibold mb-4 text-gray-600">Properties</h3>
          <div className="space-y-4">
            {Object.entries(component.properties).map(([key, value]) => {
              // Skip rendering the variant property
              if (key === "variant") return null;

              return (
                <div key={key} className="space-y-1">
                  <label className="block text-sm font-medium text-gray-900">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                  {renderPropertyField(key, value as string, (newValue) =>
                    updateComponentProperty(component.id, key, newValue)
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-background">
          <h3 className="text-xs font-semibold mb-4 text-gray-600">Styles</h3>
          <div className="space-y-4">
            {sortedDefaultStyles.map(([key, value]) => {
              const styleKey = key as keyof ComponentStyle;
              return (
                <div key={styleKey} className="space-y-1">
                  <label className="block text-sm font-medium text-gray-900">
                    {styleKey.charAt(0).toUpperCase() + styleKey.slice(1)}
                  </label>
                  {renderStyleField(styleKey, value as string, "", (newValue) =>
                    updateComponentStyle(component.id, styleKey, newValue)
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
};

// Simple reset icon component
const ResetIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
    <path d="M3 3v5h5"></path>
  </svg>
);
