"use client";
import React, { useState, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useAppContext } from "@/contexts/AppContext";
import { ThemeSettings } from "@/lib/types";

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
  { value: "bg-slate-500", label: "bg-slate-500", id: "slate" },
  { value: "bg-gray-500", label: "bg-gray-500", id: "gray" },
  { value: "bg-zinc-500", label: "bg-zinc-500", id: "zinc" },
  { value: "bg-neutral-500", label: "bg-neutral-500", id: "neutral" },
  { value: "bg-stone-500", label: "bg-stone-500", id: "stone" },
  { value: "bg-red-500", label: "bg-red-500", id: "red" },
  { value: "bg-orange-500", label: "bg-orange-500", id: "orange" },
  { value: "bg-amber-500", label: "bg-amber-500", id: "amber" },
  { value: "bg-yellow-500", label: "bg-yellow-500", id: "yellow" },
  { value: "bg-lime-500", label: "bg-lime-500", id: "lime" },
  { value: "bg-green-500", label: "bg-green-500", id: "green" },
  { value: "bg-emerald-500", label: "bg-emerald-500", id: "emerald" },
  { value: "bg-teal-500", label: "bg-teal-500", id: "teal" },
  { value: "bg-cyan-500", label: "bg-cyan-500", id: "cyan" },
  { value: "bg-sky-500", label: "bg-sky-500", id: "sky" },
  { value: "bg-blue-500", label: "bg-blue-500", id: "blue" },
  { value: "bg-indigo-500", label: "bg-indigo-500", id: "indigo" },
  { value: "bg-violet-500", label: "bg-violet-500", id: "violet" },
  { value: "bg-purple-500", label: "bg-purple-500", id: "purple" },
  { value: "bg-fuchsia-500", label: "bg-fuchsia-500", id: "fuchsia" },
  { value: "bg-pink-500", label: "bg-pink-500", id: "pink" },
  { value: "bg-rose-500", label: "bg-rose-500", id: "rose" },
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
const generateColorVariations = (colorName: string): ColorOption[] => {
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

  const shades = colorShades[colorName] || [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

  return shades.map((shade) => ({
    value: `bg-${colorName}-${shade}`,
    label: `bg-${colorName}-${shade}`,
    id: `${colorName}-${shade}`,
  }));
};

// Generate all color variations for all colors
const allColorVariations: ColorOption[] = allTailwindColors.flatMap((color) =>
  generateColorVariations(color.id || color.label.toLowerCase())
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
    const matchesFamily = !selectedColorFamily || option.value.startsWith(`bg-${selectedColorFamily}-`);
    return matchesSearch && matchesFamily;
  });

  // Find the selected color option with normalized comparison
  const selectedOption =
    displayOptions.find((option) => normalizeColorValue(option.value) === normalizeColorValue(effectiveValue)) ||
    filteredTailwindColors.find((option) => normalizeColorValue(option.value) === normalizeColorValue(effectiveValue));

  // Handle color selection
  const handleColorSelect = (colorValue: string) => {
    onChange(colorValue);
    setIsCustomMode(false);
  };

  // Handle custom color selection
  const handleCustomColorSelect = () => {
    if (activeTab === "color" && customColor.startsWith("#")) {
      onChange(customColor);
    } else if (activeTab === "tailwind") {
      if (customTailwindClass.startsWith("bg-") || customTailwindClass.startsWith("text-")) {
        onChange(customTailwindClass);
      }
    }
    setIsCustomMode(false);
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
        border: "1px solid #e5e7eb",
      };
    }

    // For Tailwind classes, we don't need inline styles for the preview circle itself
    return {
      width: "28px",
      height: "28px",
      borderRadius: "28px",
      display: "inline-block",
      border: "1px solid #e5e7eb",
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
          className={effectiveValue.startsWith("bg-") ? effectiveValue : ""}
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
      <PopoverContent className="w-[320px] p-0">
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

              {displayOptions.map((option) => (
                <div
                  key={option.id || option.value}
                  className={`w-8 h-8 cursor-pointer hover:opacity-80 transition-opacity flex items-center justify-center relative ${
                    // Compare with effectiveValue instead of value to highlight the default theme color
                    normalizeColorValue(effectiveValue) === normalizeColorValue(option.value)
                      ? "after:absolute after:inset-[-2px] after:rounded-full after:ring-2 after:ring-blue-500"
                      : ""
                  }`}
                  onClick={() => handleColorSelect(option.value)}
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
              ))}

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
          <div className="p-3">
            <div className="flex justify-between border-b pb-2 mb-3">
              <h3 className="font-medium text-sm">Custom Color</h3>
              <button className="text-xs text-gray-500 hover:text-gray-700" onClick={() => setIsCustomMode(false)}>
                Back to presets
              </button>
            </div>

            {/* Tab buttons */}
            <div className="flex border-b mb-3">
              <button
                className={`flex-1 py-2 text-sm font-medium ${
                  activeTab === "color"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("color")}
              >
                Color Picker
              </button>
              <button
                className={`flex-1 py-2 text-sm font-medium ${
                  activeTab === "tailwind"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("tailwind")}
              >
                Tailwind Class
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
                        setCustomColor(e.target.value);
                        setCustomTailwindClass("");
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
                        }
                      }}
                      className="flex-1 border rounded px-2 py-1 text-sm"
                      placeholder="#000000"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Search Tailwind Colors</label>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full border rounded px-2 py-1 text-sm"
                    placeholder="Search colors..."
                  />
                </div>

                {/* Color family pills */}
                <div className="flex flex-wrap gap-2">
                  <button
                    className={`px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                      !selectedColorFamily ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    onClick={() => setSelectedColorFamily(null)}
                  >
                    All Colors
                  </button>
                  {allTailwindColors.map((color) => (
                    <button
                      key={color.id}
                      className={`px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                        selectedColorFamily === color.id
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                      onClick={() => setSelectedColorFamily(color.id || null)}
                    >
                      {color.label}
                    </button>
                  ))}
                </div>

                {/* Color grid */}
                <div className="max-h-48 overflow-y-auto">
                  {selectedColorFamily ? (
                    <div className="space-y-2">
                      {generateColorVariations(selectedColorFamily).map((option) => (
                        <button
                          key={option.value}
                          className="w-full flex items-center gap-3 p-2 rounded hover:bg-gray-50 transition-colors"
                          onClick={() => {
                            setCustomTailwindClass(option.value);
                            setCustomColor("");
                          }}
                        >
                          <div className={`w-8 h-8 rounded-full border border-gray-200 ${option.value}`} />
                          <span className="text-sm text-gray-700">{option.label}</span>
                          {customTailwindClass === option.value && (
                            <span className="ml-auto text-blue-500">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {allTailwindColors.map((colorFamily) => (
                        <div key={colorFamily.id} className="space-y-2">
                          <div className="text-xs font-medium text-gray-500 px-2">{colorFamily.label}</div>
                          <div className="flex flex-wrap gap-2">
                            {generateColorVariations(colorFamily.id || colorFamily.label.toLowerCase()).map(
                              (option) => (
                                <button
                                  key={option.value}
                                  className={`w-8 h-8 rounded-full border border-gray-200 hover:opacity-80 transition-opacity ${
                                    customTailwindClass === option.value ? "ring-2 ring-blue-500 ring-offset-2" : ""
                                  }`}
                                  onClick={() => {
                                    setCustomTailwindClass(option.value);
                                    setCustomColor("");
                                  }}
                                  title={option.label}
                                >
                                  <div className={`w-full h-full rounded-full ${option.value}`} />
                                </button>
                              )
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs text-gray-600 mb-1">Selected Class</label>
                  <input
                    type="text"
                    value={customTailwindClass}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val.startsWith("bg-") || val.startsWith("text-") || val === "") {
                        setCustomTailwindClass(val);
                        setCustomColor("");
                      }
                    }}
                    className="w-full border rounded px-2 py-1 text-sm"
                    placeholder={isTextColor ? "text-gray-900" : "bg-blue-500"}
                  />
                </div>
              </div>
            )}

            <button
              onClick={handleCustomColorSelect}
              className="w-full bg-blue-500 text-white px-3 py-1.5 rounded text-sm hover:bg-blue-600 mt-2"
            >
              Apply Custom Color
            </button>
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
