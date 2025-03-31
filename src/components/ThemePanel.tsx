"use client";

import React from "react";
import { useAppContext } from "@/contexts/AppContext";
import {
  backgroundColorOptions,
  textColorOptions,
  fontOptions,
  borderRadiusOptions,
  commonAccentColors,
} from "@/lib/themeDefaults";
import { ThemeSettings } from "@/lib/types";
import { StyleOptionDropdown, ColorPicker } from "./StyleOptionDropdown";

export const ThemePanel: React.FC = () => {
  const { themeSettings, updateThemeSetting } = useAppContext();

  const renderColorPicker = (
    label: string,
    value: string,
    onChange: (value: string) => void,
    options: Array<{ value: string; label: string; category?: string; id?: string; tailwindClass?: string }>
  ) => {
    return (
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-900 mb-2">{label}</label>
        <ColorPicker value={value} onChange={onChange} options={options} />
      </div>
    );
  };

  const handleThemeUpdate = (key: keyof ThemeSettings, value: string) => {
    updateThemeSetting(key, value);
  };

  return (
    <div className="p-4">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Theme</h2>
      </div>

      <div className="space-y-10">
        {/* Colors Section */}
        <div>
          <h3 className="text-lg font-medium border-b pb-2 mb-4 text-gray-900">Colors</h3>

          <div className="space-y-6">
            {renderColorPicker(
              "Primary Accent",
              themeSettings.primaryAccent,
              (value) => handleThemeUpdate("primaryAccent", value),
              commonAccentColors
            )}

            {renderColorPicker(
              "Secondary Accent",
              themeSettings.secondaryAccent,
              (value) => handleThemeUpdate("secondaryAccent", value),
              commonAccentColors
            )}

            {renderColorPicker(
              "Primary Background",
              themeSettings.primaryBackground,
              (value) => handleThemeUpdate("primaryBackground", value),
              backgroundColorOptions
            )}

            {renderColorPicker(
              "Secondary Background",
              themeSettings.secondaryBackground,
              (value) => handleThemeUpdate("secondaryBackground", value),
              backgroundColorOptions
            )}

            {renderColorPicker(
              "Primary Text",
              themeSettings.primaryText,
              (value) => handleThemeUpdate("primaryText", value),
              textColorOptions
            )}

            {renderColorPicker(
              "Secondary Text",
              themeSettings.secondaryText,
              (value) => handleThemeUpdate("secondaryText", value),
              textColorOptions
            )}
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
