"use client";
import React from "react";
import { useAppContext } from "@/contexts/AppContext";
import { ComponentStyle } from "@/lib/types";
import {
  elementTypeOptions,
  fontSizeOptions,
  borderRadiusOptions,
  boxShadowOptions,
  flatColorOptions,
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
    // Special handling for element property in text components
    if (key === "element" && component.type === "text") {
      return (
        <StyleOptionDropdown
          options={elementTypeOptions}
          value={String(currentValue)}
          onChange={(value) => onChange(value)}
          placeholder="Select element type"
        />
      );
    }

    // Default input field for other properties
    return (
      <input
        type="text"
        value={String(currentValue)}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full rounded-md border-border bg-card shadow-sm focus:border-accent focus:ring-accent sm:text-sm p-2 border"
      />
    );
  };

  // Determine if a style property should use a specialized dropdown
  const renderStyleField = (
    key: keyof ComponentStyle,
    currentValue: string,
    defaultValue: string,
    onChange: (value: string) => void
  ) => {
    switch (key) {
      case "color":
      case "backgroundColor":
        return <ColorPicker options={flatColorOptions} value={currentValue || ""} onChange={onChange} />;
      case "fontSize":
        return (
          <StyleOptionDropdown
            options={fontSizeOptions}
            value={currentValue || ""}
            onChange={onChange}
            placeholder={defaultValue || "Select font size"}
          />
        );
      case "fontWeight":
        return (
          <StyleOptionDropdown
            options={fontWeightOptions}
            value={currentValue || ""}
            onChange={onChange}
            placeholder={defaultValue || "Select weight"}
          />
        );
      case "borderRadius":
        return (
          <StyleOptionDropdown
            options={borderRadiusOptions}
            value={currentValue || ""}
            onChange={onChange}
            placeholder={defaultValue || "Select radius"}
          />
        );
      case "boxShadow":
        return (
          <StyleOptionDropdown
            options={boxShadowOptions}
            value={currentValue || ""}
            onChange={onChange}
            placeholder={defaultValue || "Select shadow"}
          />
        );
      case "padding":
      case "margin":
      case "gap":
        return (
          <StyleOptionDropdown
            options={spacingOptions}
            value={currentValue || ""}
            onChange={onChange}
            placeholder={defaultValue || `Select ${key}`}
          />
        );

      // Default to text input for other style properties
      default:
        return (
          <input
            type="text"
            value={currentValue || ""}
            placeholder={defaultValue}
            onChange={(e) => onChange(e.target.value)}
            className="block w-full rounded-md border-border bg-card shadow-sm focus:border-accent focus:ring-accent sm:text-sm p-2 border"
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

    return (
      <div className="p-4">
        <h3 className="text-xs font-semibold mb-4 text-gray-800">Instance properties</h3>
        <div className="space-y-4">
          {Object.entries(component.properties).map(([key, defaultValue]) => {
            const hasOverride =
              selectedInstance.properties[key as keyof typeof selectedInstance.properties] !== undefined;
            const currentValue = hasOverride
              ? selectedInstance.properties[key as keyof typeof selectedInstance.properties]
              : defaultValue;
            return (
              <div key={key} className="space-y-1">
                <label className="block text-sm font-medium text-foreground">
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
                {hasOverride && <p className="text-xs text-muted-foreground">Default: {String(defaultValue)}</p>}
              </div>
            );
          })}
        </div>
        <h3 className="text-xs font-semibold mb-4 text-gray-800">Instance styles</h3>
        <div className="space-y-4">
          {sortedInstanceStyles.map(([key, defaultValue]) => {
            const styleKey = key as keyof ComponentStyle;
            const instanceStyleValue = selectedInstance.instanceStyles?.[styleKey];
            const hasOverride = instanceStyleValue !== undefined && instanceStyleValue !== "";
            const currentValue = hasOverride ? instanceStyleValue : "";

            return (
              <div key={styleKey} className="space-y-1">
                <label className="block text-sm font-medium text-foreground">
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
                <p className="text-xs text-gray-500">Default: {defaultValue as string}</p>
              </div>
            );
          })}
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
      <div className="p-4">
        <h3 className="text-xs font-semibold mb-4 text-gray-800">Properties</h3>
        <div className="space-y-4">
          {Object.entries(component.properties).map(([key, value]) => (
            <div key={key} className="space-y-1">
              <label className="block text-sm font-regular text-gray-900">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
              {renderPropertyField(key, value as string, (newValue) =>
                updateComponentProperty(component.id, key, newValue)
              )}
            </div>
          ))}
        </div>
        <h3 className="text-xs font-semibold mb-4 text-gray-800">Styles</h3>
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
