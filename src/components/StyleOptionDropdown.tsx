"use client";
import React from "react";

interface StyleOption {
  value: string;
  label: string;
}

interface StyleOptionDropdownProps {
  options: StyleOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  showColorPreview?: boolean;
}

export const StyleOptionDropdown: React.FC<StyleOptionDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select option",
  showColorPreview = false,
}) => {
  return (
    <div className="relative w-full">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full rounded-md border-gray-200 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border appearance-none pr-8 text-gray-900"
      >
        {value === "" && placeholder && (
          <option value="" className="bg-white text-gray-900">
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-white text-gray-900">
            {option.label}
          </option>
        ))}
      </select>

      {/* Dropdown arrow */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
        <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>

      {/* Color preview box */}
      {showColorPreview && value && (
        <div className="absolute inset-y-0 left-2 flex items-center" style={{ pointerEvents: "none" }}>
          <div className="w-4 h-4 rounded border border-gray-200" style={{ backgroundColor: value }} />
        </div>
      )}
    </div>
  );
};

// Organized Tailwind colors for the color picker
export const tailwindColorGroups = [
  {
    name: "Gray",
    colors: [
      { label: "50", value: "#f9fafb" },
      { label: "100", value: "#f3f4f6" },
      { label: "200", value: "#e5e7eb" },
      { label: "300", value: "#d1d5db" },
      { label: "400", value: "#9ca3af" },
      { label: "500", value: "#6b7280" },
      { label: "600", value: "#4b5563" },
      { label: "700", value: "#374151" },
      { label: "800", value: "#1f2937" },
      { label: "900", value: "#111827" },
    ],
  },
  {
    name: "Red",
    colors: [
      { label: "50", value: "#fef2f2" },
      { label: "100", value: "#fee2e2" },
      { label: "200", value: "#fecaca" },
      { label: "300", value: "#fca5a5" },
      { label: "400", value: "#f87171" },
      { label: "500", value: "#ef4444" },
      { label: "600", value: "#dc2626" },
      { label: "700", value: "#b91c1c" },
      { label: "800", value: "#991b1b" },
      { label: "900", value: "#7f1d1d" },
    ],
  },
  {
    name: "Blue",
    colors: [
      { label: "50", value: "#eff6ff" },
      { label: "100", value: "#dbeafe" },
      { label: "200", value: "#bfdbfe" },
      { label: "300", value: "#93c5fd" },
      { label: "400", value: "#60a5fa" },
      { label: "500", value: "#3b82f6" },
      { label: "600", value: "#2563eb" },
      { label: "700", value: "#1d4ed8" },
      { label: "800", value: "#1e40af" },
      { label: "900", value: "#1e3a8a" },
    ],
  },
  {
    name: "Green",
    colors: [
      { label: "50", value: "#f0fdf4" },
      { label: "100", value: "#dcfce7" },
      { label: "200", value: "#bbf7d0" },
      { label: "300", value: "#86efac" },
      { label: "400", value: "#4ade80" },
      { label: "500", value: "#22c55e" },
      { label: "600", value: "#16a34a" },
      { label: "700", value: "#15803d" },
      { label: "800", value: "#166534" },
      { label: "900", value: "#14532d" },
    ],
  },
  {
    name: "Yellow",
    colors: [
      { label: "50", value: "#fefce8" },
      { label: "100", value: "#fef9c3" },
      { label: "200", value: "#fef08a" },
      { label: "300", value: "#fde047" },
      { label: "400", value: "#facc15" },
      { label: "500", value: "#eab308" },
      { label: "600", value: "#ca8a04" },
      { label: "700", value: "#a16207" },
      { label: "800", value: "#854d0e" },
      { label: "900", value: "#713f12" },
    ],
  },
  {
    name: "Purple",
    colors: [
      { label: "50", value: "#faf5ff" },
      { label: "100", value: "#f3e8ff" },
      { label: "200", value: "#e9d5ff" },
      { label: "300", value: "#d8b4fe" },
      { label: "400", value: "#c084fc" },
      { label: "500", value: "#a855f7" },
      { label: "600", value: "#9333ea" },
      { label: "700", value: "#7e22ce" },
      { label: "800", value: "#6b21a8" },
      { label: "900", value: "#581c87" },
    ],
  },
  {
    name: "Pink",
    colors: [
      { label: "50", value: "#fdf2f8" },
      { label: "100", value: "#fce7f3" },
      { label: "200", value: "#fbcfe8" },
      { label: "300", value: "#f9a8d4" },
      { label: "400", value: "#f472b6" },
      { label: "500", value: "#ec4899" },
      { label: "600", value: "#db2777" },
      { label: "700", value: "#be185d" },
      { label: "800", value: "#9d174d" },
      { label: "900", value: "#831843" },
    ],
  },
  {
    name: "Indigo",
    colors: [
      { label: "50", value: "#eef2ff" },
      { label: "100", value: "#e0e7ff" },
      { label: "200", value: "#c7d2fe" },
      { label: "300", value: "#a5b4fc" },
      { label: "400", value: "#818cf8" },
      { label: "500", value: "#6366f1" },
      { label: "600", value: "#4f46e5" },
      { label: "700", value: "#4338ca" },
      { label: "800", value: "#3730a3" },
      { label: "900", value: "#312e81" },
    ],
  },
];

// For color pickers with swatches
interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
  options: StyleOption[];
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ value, onChange, options }) => {
  const [activeTab, setActiveTab] = React.useState<"custom" | "tailwind">("tailwind");
  const [customColor, setCustomColor] = React.useState(value || "#000000");
  const [selectedColorFamily, setSelectedColorFamily] = React.useState("Gray");
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
  const popoverRef = React.useRef<HTMLDivElement>(null);

  // When value changes from outside, update the custom color if needed
  React.useEffect(() => {
    if (value) {
      setCustomColor(value);
    }
  }, [value]);

  // Close popover when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsPopoverOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      {/* Color circle options */}
      <div className="flex flex-wrap gap-2 mb-2">
        {options.slice(0, 9).map((color) => (
          <button
            key={color.value}
            onClick={() => onChange(color.value)}
            className={`w-8 h-8 rounded-full border transition-all hover:scale-110 ${
              value === color.value ? "ring-2 ring-offset-2 ring-blue-500" : "border-gray-200"
            }`}
            style={{ backgroundColor: color.value }}
            title={color.label}
            type="button"
          />
        ))}

        {/* Custom color button that opens the popover */}
        <button
          onClick={() => setIsPopoverOpen(!isPopoverOpen)}
          className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all hover:scale-110 ${
            (!options.some((opt) => opt.value === value) && value) || isPopoverOpen
              ? "ring-2 ring-offset-2 ring-blue-500 bg-gradient-to-r from-pink-500 via-blue-500 to-green-500"
              : "border-gray-200 bg-gradient-to-r from-pink-300 via-blue-300 to-green-300"
          }`}
          title="More colors"
          type="button"
        >
          <span className="text-white font-bold drop-shadow-md">+</span>
        </button>
      </div>

      {/* Currently selected color indicator - always visible */}
      {value && (
        <div className="flex items-center text-xs mt-1 mb-1 bg-gray-50 p-1 rounded">
          <span className="text-gray-500">Selected: </span>
          <div className="w-4 h-4 mx-1 rounded border border-gray-200" style={{ backgroundColor: value }} />
          <span className="font-mono text-gray-900">{value}</span>
        </div>
      )}

      {/* Custom color popover */}
      {isPopoverOpen && (
        <div
          ref={popoverRef}
          className="absolute z-50 left-0 right-0 mt-1 bg-white rounded-md shadow-lg border border-gray-200 p-3"
          style={{ width: "280px" }}
        >
          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-3">
            <button
              onClick={() => setActiveTab("tailwind")}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === "tailwind" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"
              }`}
            >
              Tailwind Colors
            </button>
            <button
              onClick={() => setActiveTab("custom")}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === "custom" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"
              }`}
            >
              Custom Color
            </button>
          </div>

          {/* Tailwind Color Palette Tab */}
          {activeTab === "tailwind" && (
            <div>
              {/* Color family selector */}
              <div className="flex flex-wrap gap-1 mb-3">
                {tailwindColorGroups.map((group) => (
                  <button
                    key={group.name}
                    onClick={() => setSelectedColorFamily(group.name)}
                    className={`px-2 py-1 text-xs rounded-md ${
                      selectedColorFamily === group.name
                        ? "bg-blue-50 text-blue-500"
                        : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                    }`}
                  >
                    {group.name}
                  </button>
                ))}
              </div>

              {/* Selected color family swatches */}
              <div className="grid grid-cols-5 gap-2">
                {tailwindColorGroups
                  .find((g) => g.name === selectedColorFamily)
                  ?.colors.map((color) => (
                    <button
                      key={`${selectedColorFamily}-${color.label}`}
                      onClick={() => {
                        onChange(color.value);
                        setIsPopoverOpen(false);
                      }}
                      className={`w-full flex flex-col items-center ${
                        value === color.value ? "ring-2 ring-offset-1 ring-blue-500" : ""
                      }`}
                    >
                      <div
                        className="w-8 h-8 rounded mb-1 border border-gray-200"
                        style={{ backgroundColor: color.value }}
                      />
                      <span className="text-xs text-gray-900">{color.label}</span>
                    </button>
                  ))}
              </div>
            </div>
          )}

          {/* Custom Color Picker Tab */}
          {activeTab === "custom" && (
            <div>
              <div className="flex space-x-3 mb-3">
                {/* Color preview */}
                <div
                  className="w-12 h-12 rounded border border-gray-200"
                  style={{ backgroundColor: customColor || "#ffffff" }}
                />

                {/* Color inputs */}
                <div className="flex-1 space-y-2">
                  {/* Hex input */}
                  <div>
                    <label className="block text-xs font-medium text-gray-900 mb-1">Hex</label>
                    <input
                      type="text"
                      value={customColor}
                      onChange={(e) => setCustomColor(e.target.value)}
                      className="w-full rounded-md border-gray-200 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-1 border text-gray-900"
                    />
                  </div>

                  {/* Color picker */}
                  <div>
                    <label className="block text-xs font-medium text-gray-900 mb-1">Pick</label>
                    <input
                      type="color"
                      value={customColor}
                      onChange={(e) => setCustomColor(e.target.value)}
                      className="w-full h-8 p-0 border-gray-200 rounded"
                      style={{ padding: 0 }}
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  onChange(customColor);
                  setIsPopoverOpen(false);
                }}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 w-full"
                type="button"
              >
                Apply Custom Color
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
