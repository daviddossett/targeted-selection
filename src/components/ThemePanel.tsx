"use client";

import React from "react";
import { useAppContext } from "@/contexts/AppContext";
import { fontOptions, borderRadiusOptions } from "@/lib/themeDefaults";
import { ThemeSettings } from "@/lib/types";
import { StyleOptionDropdown, ColorPicker } from "./StyleOptionDropdown";

export const ThemePanel: React.FC = () => {
  const { themeSettings, updateThemeSetting } = useAppContext();

  const renderColorPicker = (label: string, key: keyof ThemeSettings) => {
    return (
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-900 mb-2">{label}</label>
        <ColorPicker
          value={themeSettings[key]}
          onChange={(value) => handleThemeUpdate(key, value)}
          themeVariableName={key.toString()} // Pass the key as themeVariableName to show Tailwind colors
        />
      </div>
    );
  };

  const handleThemeUpdate = (key: keyof ThemeSettings, value: string) => {
    updateThemeSetting(key, value);
  };

  return (
    <div className="px-4 py-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">Theme</h2>
      </div>

      <div className="space-y-10">
        {/* Colors Section */}
        <div>
          <h3 className="text-lg font-medium border-b pb-2 mb-4 text-gray-900">Colors</h3>

          <div className="space-y-6">
            {renderColorPicker("Primary Accent", "primaryAccent")}
            {renderColorPicker("Secondary Accent", "secondaryAccent")}
            {renderColorPicker("Primary Background", "primaryBackground")}
            {renderColorPicker("Secondary Background", "secondaryBackground")}
            {renderColorPicker("Primary Text", "primaryText")}
            {renderColorPicker("Secondary Text", "secondaryText")}
          </div>
        </div>

        {/* Typography & Layout Section */}
        <div>
          <h3 className="text-lg font-medium border-b pb-2 mb-4 text-gray-900">Typography & Layout</h3>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-900">Font Family</label>
              <StyleOptionDropdown
                options={fontOptions}
                value={themeSettings.fontFamily}
                onChange={(value) => handleThemeUpdate("fontFamily", value)}
                placeholder="Select font family"
                type="select"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-900">Border Radius</label>
              <StyleOptionDropdown
                options={borderRadiusOptions}
                value={themeSettings.borderRadius}
                onChange={(value) => handleThemeUpdate("borderRadius", value)}
                placeholder="Select border radius"
                type="select"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
