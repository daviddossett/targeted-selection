"use client";
import React, { useState, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useAppContext } from "@/contexts/AppContext";
import { ThemeSettings } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { tailwindColors } from "./AppPreview";

interface StyleOption {
  value: string;
  label: string;
  id?: string; // Optional unique identifier
  tailwindClass?: string; // Tailwind class representation
}

interface StyleOptionDropdownProps {
  options: StyleOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  renderOptionPreview?: (option: StyleOption) => React.ReactNode;
  type: "color" | "select";
  allowInherit?: boolean;
  inheritedValue?: string;
  inheritedLabel?: string;
  isInherited?: boolean;
  themeVariableName?: string;
  label?: string;
}

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
  allowInherit?: boolean;
  inheritedValue?: string;
  inheritedLabel?: string;
  isInherited?: boolean;
  themeVariableName?: string | null;
  showOnlyThemeColors?: boolean;
}

interface ColorOption {
  value: string;
  label: string;
  id?: string;
}

// Curated accent colors for the main dropdown
const curatedAccentColors: ColorOption[] = [
  { value: "bg-blue-500", label: "bg-blue-500", id: "bg-blue-500" },
  { value: "bg-indigo-500", label: "bg-indigo-500", id: "bg-indigo-500" },
  { value: "bg-purple-500", label: "bg-purple-500", id: "bg-purple-500" },
  { value: "bg-pink-500", label: "bg-pink-500", id: "bg-pink-500" },
  { value: "bg-red-500", label: "bg-red-500", id: "bg-red-500" },
  { value: "bg-orange-500", label: "bg-orange-500", id: "bg-orange-500" },
  { value: "bg-amber-500", label: "bg-amber-500", id: "bg-amber-500" },
  { value: "bg-yellow-500", label: "bg-yellow-500", id: "bg-yellow-500" },
  { value: "bg-lime-500", label: "bg-lime-500", id: "bg-lime-500" },
  { value: "bg-green-500", label: "bg-green-500", id: "bg-green-500" },
  { value: "bg-emerald-500", label: "bg-emerald-500", id: "bg-emerald-500" },
  { value: "bg-teal-500", label: "bg-teal-500", id: "bg-teal-500" },
  { value: "bg-cyan-500", label: "bg-cyan-500", id: "bg-cyan-500" },
  { value: "bg-sky-500", label: "bg-sky-500", id: "bg-sky-500" },
];

// Complete list of all Tailwind colors
const allTailwindColors: ColorOption[] = [
  { value: "slate", label: "Slate", id: "slate" },
  { value: "gray", label: "Gray", id: "gray" },
  { value: "zinc", label: "Zinc", id: "zinc" },
  { value: "neutral", label: "Neutral", id: "neutral" },
  { value: "stone", label: "Stone", id: "stone" },
  { value: "red", label: "Red", id: "red" },
  { value: "orange", label: "Orange", id: "orange" },
  { value: "amber", label: "Amber", id: "amber" },
  { value: "yellow", label: "Yellow", id: "yellow" },
  { value: "lime", label: "Lime", id: "lime" },
  { value: "green", label: "Green", id: "green" },
  { value: "emerald", label: "Emerald", id: "emerald" },
  { value: "teal", label: "Teal", id: "teal" },
  { value: "cyan", label: "Cyan", id: "cyan" },
  { value: "sky", label: "Sky", id: "sky" },
  { value: "blue", label: "Blue", id: "blue" },
  { value: "indigo", label: "Indigo", id: "indigo" },
  { value: "violet", label: "Violet", id: "violet" },
  { value: "purple", label: "Purple", id: "purple" },
  { value: "fuchsia", label: "Fuchsia", id: "fuchsia" },
  { value: "pink", label: "Pink", id: "pink" },
  { value: "rose", label: "Rose", id: "rose" },
];

// Base colors that don't fit in the groups
const baseColors: ColorOption[] = [
  { value: "bg-black", label: "bg-black", id: "bg-black" },
  { value: "bg-white", label: "bg-white", id: "bg-white" },
  { value: "bg-transparent", label: "bg-transparent", id: "bg-transparent" },
];

// Helper function to generate theme color options with semantic names
const getThemeColorOptions = (themeSettings: ThemeSettings) => [
  { value: themeSettings.primaryAccent, label: "Primary Accent", id: "theme-primary-accent" },
  { value: themeSettings.secondaryAccent, label: "Secondary Accent", id: "theme-secondary-accent" },
  { value: themeSettings.primaryBackground, label: "Primary Background", id: "theme-primary-bg" },
  { value: themeSettings.secondaryBackground, label: "Secondary Background", id: "theme-secondary-bg" },
  { value: themeSettings.primaryText, label: "Primary Text", id: "theme-primary-text" },
  { value: themeSettings.secondaryText, label: "Secondary Text", id: "theme-secondary-text" },
];

// Generate all color variations for a given color name
const generateColorVariations = (colorName: string, prefix = "bg-"): ColorOption[] => {
  if (!colorName) return [];
  
  const colorShades: Record<string, number[]> = {
    // Gray scales have extended range
    slate: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    gray: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    zinc: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    neutral: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    stone: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    // Standard colors
    red: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900],
    orange: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900],
    amber: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900],
    yellow: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900],
    lime: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900],
    green: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900],
    emerald: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900],
    teal: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900],
    cyan: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900],
    sky: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900],
    blue: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900],
    indigo: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900],
    violet: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900],
    purple: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900],
    fuchsia: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900],
    pink: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900],
    rose: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900],
  };

  // Handle special cases like 'bg-black' or if the color doesn't exist
  if (!colorShades[colorName]) {
    if (colorName === "black" || colorName === "white" || colorName === "transparent") {
      return [{ 
        value: `${prefix}${colorName}`, 
        label: `${prefix}${colorName}`, 
        id: `${colorName}` 
      }];
    }
    return [];
  }

  const shades = colorShades[colorName];
  return shades.map((shade) => ({
    value: `${prefix}${colorName}-${shade}`,
    label: `${prefix}${colorName}-${shade}`,
    id: `${colorName}-${shade}`,
  }));
};

// Generate all color variations for all colors
const allColorVariations: ColorOption[] = allTailwindColors.flatMap((color) =>
  generateColorVariations(color.id || "", "bg-")
);

// Helper function to normalize color values for comparison
// This will handle both Tailwind classes and hex values
const normalizeColorValue = (color: string): string => {
  if (!color) return "";
  // Keep only the core part of the Tailwind class (bg-blue-500 -> blue-500)
  if (color.startsWith("bg-") || color.startsWith("text-")) {
    return color.includes("-") ? color.substring(color.indexOf("-") + 1) : color;
  }
  return color;
};

export function ColorPicker({
  value,
  onChange,
  allowInherit = false,
  inheritedValue,
  themeVariableName,
  showOnlyThemeColors = false,
}: ColorPickerProps) {
  const { themeSettings } = useAppContext();
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [customColor, setCustomColor] = useState("");
  const [customTailwindClass, setCustomTailwindClass] = useState("");
  const [activeTab, setActiveTab] = useState<"color" | "tailwind">("color");
  const [selectedColorFamily, setSelectedColorFamily] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // When value changes from outside, update customTailwindClass to match
  useEffect(() => {
    if (value && (value.startsWith('bg-') || value.startsWith('text-'))) {
      setCustomTailwindClass(value);
    }
  }, [value]);

  // React to theme changes if using theme colors
  useEffect(() => {
    // Check if the current value is a theme color that has changed
    // If so, update the control to reflect the new theme color
    const themeColorMap = {
      [themeSettings.primaryAccent]: "primaryAccent",
      [themeSettings.secondaryAccent]: "secondaryAccent",
      [themeSettings.primaryBackground]: "primaryBackground",
      [themeSettings.secondaryBackground]: "secondaryBackground",
      [themeSettings.primaryText]: "primaryText",
      [themeSettings.secondaryText]: "secondaryText",
    };

    // If this is a component property that's using a theme color
    // that has changed, update it to the new theme color
    if (!themeVariableName && value) {
      // Find if this value is a theme key
      const themeKey = Object.entries(themeColorMap).find(([oldValue]) => oldValue === value)?.[1] as
        | keyof ThemeSettings
        | undefined;

      if (themeKey) {
        // If this was a theme color that changed, update to the new value
        const newThemeValue = themeSettings[themeKey];
        if (value !== newThemeValue) {
          onChange(newThemeValue);
        }
      }
    }
  }, [themeSettings, value, onChange, themeVariableName]);

  // Determine if this is a theme-level edit (where inheritance is allowed)
  // or a component-level edit (where inheritance should be hidden)
  const showInheritOption = Boolean(themeVariableName) && allowInherit;

  // Get the default color from theme to use when value is empty in component-level editing
  const getDefaultColorFromTheme = () => {
    // If there's an empty value for a component (not a theme setting)
    if (value === "" && !themeVariableName) {
      // Determine if it's a text color or background color based on property name
      if (
        (typeof value === "string" && value.startsWith("text-")) ||
        (typeof inheritedValue === "string" && inheritedValue.startsWith("text-"))
      ) {
        return themeSettings.primaryText;
      } else {
        return themeSettings.primaryBackground;
      }
    }
    return value;
  };

  // The effective value - either the explicitly set value or the theme default
  const effectiveValue = getDefaultColorFromTheme();

  // Determine if we're dealing with text colors or background colors
  const isTextColor =
    effectiveValue?.startsWith("text-") || (effectiveValue === "" && inheritedValue?.startsWith("text-"));

  // Get theme color options
  const themeColorOptions: ColorOption[] = getThemeColorOptions(themeSettings);

  // Determine which color options to display based on context:
  let displayOptions: ColorOption[];

  if (showOnlyThemeColors) {
    // For simplified mode, only show theme colors
    displayOptions = themeColorOptions;
  } else if (themeVariableName) {
    // App level theme settings - show appropriate color palette based on property type
    if (themeVariableName === "primaryText" || themeVariableName === "secondaryText") {
      // For text colors, show text color options
      displayOptions = textColorOptions;
    } else {
      // For backgrounds and accents, show the standard color palette
      displayOptions = [...curatedAccentColors, ...baseColors];
    }
  } else {
    // Component level - show theme colors from app settings
    displayOptions = themeColorOptions.filter(
      (option) =>
        // Ensure uniqueness by only including each theme property once
        themeColorOptions.findIndex((o) => o.id === option.id) === themeColorOptions.indexOf(option)
    );
  }

  // Filter Tailwind colors based on selected family and search term
  const filteredTailwindColors = allColorVariations.filter((option) => {
    const matchesSearch =
      option.value.toLowerCase().includes(searchTerm.toLowerCase()) ||
      option.label.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFamily = !selectedColorFamily || option.value.includes(`${selectedColorFamily}-`);
    return matchesSearch && matchesFamily;
  });

  // Find the selected color option with normalized comparison
  const selectedOption =
    displayOptions.find((option) => normalizeColorValue(option.value) === normalizeColorValue(effectiveValue)) ||
    filteredTailwindColors.find((option) => normalizeColorValue(option.value) === normalizeColorValue(effectiveValue));

  // Handle color selection with inline style fallback
  const handleColorSelect = (colorValue: string) => {
    // Store the color value in state
    onChange(colorValue);
    setCustomTailwindClass(colorValue);
    
    // Apply the fallback using a data attribute that can be styled via CSS
    if (colorValue.startsWith('bg-')) {
      try {
        // Extract color information (e.g., "blue-500" from "bg-blue-500")
        const colorMatch = colorValue.match(/bg-([a-z]+)-(\d+)/);
        if (colorMatch) {
          const colorName = colorMatch[1];
          const shade = colorMatch[2];
          
          // Find the equivalent hex color to use as a fallback
          document.querySelectorAll(`[data-color-value="${colorValue}"]`).forEach(el => {
            // Map to get the actual hex color
            const colorMap = getColorMap();
            if (colorMap[colorName] && colorMap[colorName][shade]) {
              (el as HTMLElement).style.backgroundColor = colorMap[colorName][shade];
            }
          });
        }
      } catch (e) {
        console.error("Error applying color fallback:", e);
      }
    }
  };

  // Get a complete map of Tailwind colors to hex values
  const getColorMap = (): Record<string, Record<string, string>> => {
    return tailwindColors;
  };

  // Handle custom color selection
  const handleCustomColorSelect = () => {
    if (activeTab === "color" && customColor.startsWith("#")) {
      onChange(customColor);
      setIsCustomMode(false);
    } else if (activeTab === "tailwind") {
      if (customTailwindClass.startsWith("bg-") || customTailwindClass.startsWith("text-")) {
        onChange(customTailwindClass);
        setIsCustomMode(false);
      }
    }
  };

  // Color preview styles
  const getColorPreviewStyle = (colorValue: string) => {
    // For hex values or when no value, use inline styles
    if (!colorValue || colorValue.startsWith("#")) {
      return {
        backgroundColor: colorValue || "#ffffff",
        width: "28px",
        height: "28px",
        borderRadius: "28px",
        display: "inline-block",
        border: "1px solid rgba(0, 0, 0, 0.26)",
      };
    }

    // For Tailwind classes, we don't need inline styles for the preview circle itself
    return {
      width: "28px",
      height: "28px",
      borderRadius: "28px",
      display: "inline-block",
      border: "1px solid rgba(0, 0, 0, 0.26)",
    };
  };

  // Get display value for the trigger
  const getDisplayValue = () => {
    if (value === "") {
      // For theme-level settings, show the inherit option with inherited value
      if (showInheritOption) {
        return (
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-gray-300" />
            </div>
            <span className="text-sm text-blue-600">Inherit ({inheritedValue})</span>
          </div>
        );
      }

      // For component-level settings, show the inherited value instead of "Theme Default"
      const inheritedColorValue =
        inheritedValue || (isTextColor ? themeSettings.primaryText : themeSettings.primaryBackground);
      return (
        <div className="flex items-center space-x-2">
          <div className={`w-7 h-7 rounded-full ${inheritedColorValue}`} />
          <span className="text-sm text-gray-500">Inherited ({inheritedColorValue})</span>
        </div>
      );
    }

    // Different display for text vs background colors
    if (effectiveValue.startsWith("text-")) {
      return (
        <>
          <div className="w-7 h-7 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center">
            <span className={`${effectiveValue} font-medium text-base`}>A</span>
          </div>
          <span className="text-sm">
            {selectedOption?.label || effectiveValue}
            <span className="text-gray-500 ml-1">({effectiveValue})</span>
          </span>
        </>
      );
    }

    return (
      <>
        <div
          className={`w-7 h-7 rounded-full border border-gray-200 ${effectiveValue.startsWith("bg-") ? effectiveValue : ""}`}
          style={getColorPreviewStyle(effectiveValue)}
        />
        <span className="text-sm">
          {selectedOption?.label || effectiveValue}
          {selectedOption?.label !== effectiveValue && effectiveValue && (
            <span className="text-gray-500 ml-1">({effectiveValue})</span>
          )}
        </span>
      </>
    );
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex items-center space-x-2 p-2 border border-gray-200 rounded-md cursor-pointer bg-white w-full">
          {getDisplayValue()}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[320px] p-0 z-50">
        {!isCustomMode ? (
          <div className="p-3">
            {themeVariableName && (
              <div className="mb-3 text-xs text-gray-500">Select a color for {themeVariableName}</div>
            )}
            <div className="grid grid-cols-[repeat(auto-fill,32px)] gap-2 justify-start">
              {showInheritOption && (
                <div
                  className={`w-8 h-8 cursor-pointer hover:opacity-80 transition-opacity flex items-center justify-center relative ${
                    value === ""
                      ? "after:absolute after:inset-[-2px] after:rounded-full after:ring-2 after:ring-blue-500"
                      : ""
                  }`}
                  onClick={() => handleColorSelect("")}
                  title={`Inherit (${inheritedValue})`}
                >
                  <div className="w-full h-full rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-gray-300" />
                  </div>
                </div>
              )}

              {displayOptions.map((option) => {
                // Check if this option is currently selected
                const isSelected = option.value === value;
                
                return (
                <div
                  key={option.id || option.value}
                  className={`w-8 h-8 cursor-pointer hover:opacity-80 transition-opacity flex items-center justify-center relative ${
                      isSelected ? "after:absolute after:inset-[-2px] after:rounded-full after:ring-2 after:ring-blue-500" : ""
                  }`}
                  onClick={() => {
                    // Apply color directly and update internal state
                    onChange(option.value);
                    setCustomTailwindClass(option.value);
                  }}
                  title={option.label}
                >
                  {option.value?.startsWith("text-") ? (
                    <div className="w-full h-full rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center">
                      <span className={`${option.value} font-medium text-base`}>A</span>
                    </div>
                  ) : (
                    <div
                      className={`${
                        option.value?.startsWith("bg-") ? option.value : ""
                      } w-full h-full rounded-full border border-gray-200`}
                      style={getColorPreviewStyle(option.value)}
                    />
                  )}
                </div>
                );
              })}

              {!showOnlyThemeColors && (
                <button
                  className={`w-8 h-8 cursor-pointer hover:opacity-80 transition-opacity flex items-center justify-center`}
                  onClick={() => setIsCustomMode(true)}
                  title="More colors"
                >
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-red-500 via-green-500 to-blue-500" />
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="p-2">
            {/* Back button positioned independently */}
            <div className="flex items-center mb-2">
              <button
                className="p-1 text-xs text-gray-500 hover:text-gray-700 rounded hover:bg-gray-200"
                onClick={() => setIsCustomMode(false)}
                title="Back to presets"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M7.793 2.232a.75.75 0 01-.025 1.06L3.622 7.25h10.003a5.375 5.375 0 010 10.75H10.75a.75.75 0 010-1.5h2.875a3.875 3.875 0 000-7.75H3.622l4.146 3.957a.75.75 0 01-1.036 1.085l-5.5-5.25a.75.75 0 010-1.085l5.5-5.25a.75.75 0 011.06.025z" clipRule="evenodd" />
                </svg>
              </button>
              <span className="ml-1 text-xs text-gray-500">Back to presets</span>
            </div>

            {/* Compact Tabs */}
            <div className="flex bg-gray-100 p-0.5 rounded-md mb-3">
              <button
                className={`flex-1 py-1 text-xs font-medium rounded ${
                  activeTab === "color"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-800"
                }`}
                onClick={() => setActiveTab("color")}
              >
                Color
              </button>
              <button
                className={`flex-1 py-1 text-xs font-medium rounded ${
                  activeTab === "tailwind"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-800"
                }`}
                onClick={() => setActiveTab("tailwind")}
              >
                Tailwind
              </button>
            </div>

            {activeTab === "color" ? (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Hex Color</label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="color"
                      value={customColor}
                      onChange={(e) => {
                        const val = e.target.value;
                        setCustomColor(val);
                        setCustomTailwindClass("");
                        
                        // Apply hex color immediately
                        if (val.startsWith('#')) {
                          onChange(val);
                        }
                      }}
                      className="w-8 h-8 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={customColor}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val.startsWith("#") || val === "") {
                          setCustomColor(val);
                          setCustomTailwindClass("");
                          
                          // Apply valid hex colors immediately
                          if (val.match(/^#[0-9A-Fa-f]{6}$/)) {
                            onChange(val);
                          }
                        }
                      }}
                      className="flex-1 border rounded px-2 py-1 text-sm"
                      placeholder="#000000"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                {/* All colors view - removed search and pills */}
                <div className="max-h-72 overflow-y-auto pr-1 relative z-10">
                  <div className="space-y-2 overflow-visible">
                    {allTailwindColors.map((colorFamily) => (
                      <div key={colorFamily.id} className="space-y-1">
                        <div className="text-xs font-medium text-gray-500">{colorFamily.label}</div>
                        <div className="flex flex-wrap gap-1 relative">
                          {generateColorVariations(colorFamily.id || "").map((option) => {
                            // Extract shade info to generate dynamic style
                            const matches = option.value.match(/bg-([a-z]+)-(\d+)/);
                            const colorName = matches ? matches[1] : '';
                            const shade = matches ? matches[2] : '';
                            
                            // Check if this color is currently selected
                            const isSelected = option.value === value;
                            
                            // Get color style for preview
                            const getListColorStyle = () => {
                              // Use the tailwindColors import instead of duplicating the mapping
                              if (option.value === 'bg-white') return { backgroundColor: '#ffffff' };
                              if (option.value === 'bg-black') return { backgroundColor: '#000000' };
                              if (option.value === 'bg-transparent') return { 
                                backgroundColor: 'transparent', 
                                backgroundImage: 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)', 
                                backgroundSize: '10px 10px', 
                                backgroundPosition: '0 0, 0 5px, 5px -5px, -5px 0px' 
                              };
                              
                              if (tailwindColors[colorName] && tailwindColors[colorName][shade]) {
                                return { backgroundColor: tailwindColors[colorName][shade] };
                              }
                              
                              return { backgroundColor: `var(--${colorName}-${shade}, #ddd)` };
                            };
                            
                            return (
                              <button
                                key={option.value}
                                title={option.label}
                                className={`w-7 h-7 rounded-full border transition-all ${
                                  isSelected 
                                    ? "ring-2 ring-offset-1 ring-blue-500 border-blue-500" 
                                    : "border-gray-200 hover:scale-110"
                                }`}
                                onClick={() => {
                                  // Apply color directly and update internal state
                                  onChange(option.value);
                                  setCustomTailwindClass(option.value);
                                }}
                                style={getListColorStyle()}
                              >
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

export function StyleOptionDropdown({
  options,
  value,
  onChange,
  renderOptionPreview,
  type,
  allowInherit,
  inheritedValue,
  inheritedLabel = "Inherit",
  isInherited,
  themeVariableName,
  label,
  placeholder,
}: StyleOptionDropdownProps) {
  // Different components based on option type
  if (type === "color") {
    // Only allow inheritance when editing theme variables, not component-level colors
    // If themeVariableName exists, we're editing a theme setting, otherwise it's a component color
    const showInheritOption = Boolean(themeVariableName) && allowInherit;

    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <ColorPicker
          value={value}
          onChange={onChange}
          allowInherit={showInheritOption}
          inheritedValue={inheritedValue}
          inheritedLabel={inheritedLabel}
          isInherited={isInherited}
          themeVariableName={themeVariableName}
        />
      </div>
    );
  }

  // For other option types (select dropdowns)
  return (
    <div className="relative w-full">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full rounded-md border-gray-200 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border appearance-none pr-8 text-gray-900"
      >
        {value === "" && placeholder && (
          <option key="placeholder-option" value="">
            {placeholder}
          </option>
        )}
        {options.map((option, index) => {
          // Generate a reliable unique key using index as fallback
          const optionKey = option.id || option.value || `option-${index}`;
          return (
            <option key={optionKey} value={option.value}>
              {option.label}
              {renderOptionPreview && renderOptionPreview(option)}
            </option>
          );
        })}
      </select>
    </div>
  );
}

// Text color options for the dropdown
const textColorOptions: ColorOption[] = [
  { value: "text-black", label: "text-black", id: "text-black" },
  { value: "text-gray-950", label: "text-gray-950", id: "text-gray-950" },
  { value: "text-gray-900", label: "text-gray-900", id: "text-gray-900" },
  { value: "text-gray-800", label: "text-gray-800", id: "text-gray-800" },
  { value: "text-gray-700", label: "text-gray-700", id: "text-gray-700" },
  { value: "text-gray-600", label: "text-gray-600", id: "text-gray-600" },
  { value: "text-gray-500", label: "text-gray-500", id: "text-gray-500" },
  { value: "text-gray-400", label: "text-gray-400", id: "text-gray-400" },
  { value: "text-white", label: "text-white", id: "text-white" },
];
