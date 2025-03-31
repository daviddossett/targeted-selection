"use client";
import React, { useState, useRef, useEffect } from "react";

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
  onReset?: () => void;
  themeVariableName?: string;
  label?: string;
}

interface ColorPickerProps {
  options: StyleOption[];
  value: string;
  onChange: (value: string) => void;
  allowInherit?: boolean;
  inheritedValue?: string;
  inheritedLabel?: string;
  isInherited?: boolean;
  onReset?: () => void;
  themeVariableName?: string;
}

// Common Tailwind color classes for custom picker
const tailwindColorClasses = [
  // Gray
  { value: "bg-gray-50", label: "Gray 50" },
  { value: "bg-gray-100", label: "Gray 100" },
  { value: "bg-gray-200", label: "Gray 200" },
  { value: "bg-gray-300", label: "Gray 300" },
  { value: "bg-gray-400", label: "Gray 400" },
  { value: "bg-gray-500", label: "Gray 500" },
  { value: "bg-gray-600", label: "Gray 600" },
  { value: "bg-gray-700", label: "Gray 700" },
  { value: "bg-gray-800", label: "Gray 800" },
  { value: "bg-gray-900", label: "Gray 900" },

  // Slate
  { value: "bg-slate-50", label: "Slate 50" },
  { value: "bg-slate-100", label: "Slate 100" },
  { value: "bg-slate-200", label: "Slate 200" },
  { value: "bg-slate-300", label: "Slate 300" },
  { value: "bg-slate-400", label: "Slate 400" },
  { value: "bg-slate-500", label: "Slate 500" },
  { value: "bg-slate-600", label: "Slate 600" },
  { value: "bg-slate-700", label: "Slate 700" },
  { value: "bg-slate-800", label: "Slate 800" },
  { value: "bg-slate-900", label: "Slate 900" },

  // Zinc
  { value: "bg-zinc-50", label: "Zinc 50" },
  { value: "bg-zinc-100", label: "Zinc 100" },
  { value: "bg-zinc-200", label: "Zinc 200" },
  { value: "bg-zinc-300", label: "Zinc 300" },
  { value: "bg-zinc-400", label: "Zinc 400" },
  { value: "bg-zinc-500", label: "Zinc 500" },
  { value: "bg-zinc-600", label: "Zinc 600" },
  { value: "bg-zinc-700", label: "Zinc 700" },
  { value: "bg-zinc-800", label: "Zinc 800" },
  { value: "bg-zinc-900", label: "Zinc 900" },

  // Red
  { value: "bg-red-50", label: "Red 50" },
  { value: "bg-red-100", label: "Red 100" },
  { value: "bg-red-200", label: "Red 200" },
  { value: "bg-red-300", label: "Red 300" },
  { value: "bg-red-400", label: "Red 400" },
  { value: "bg-red-500", label: "Red 500" },
  { value: "bg-red-600", label: "Red 600" },
  { value: "bg-red-700", label: "Red 700" },
  { value: "bg-red-800", label: "Red 800" },
  { value: "bg-red-900", label: "Red 900" },

  // Orange
  { value: "bg-orange-50", label: "Orange 50" },
  { value: "bg-orange-100", label: "Orange 100" },
  { value: "bg-orange-200", label: "Orange 200" },
  { value: "bg-orange-300", label: "Orange 300" },
  { value: "bg-orange-400", label: "Orange 400" },
  { value: "bg-orange-500", label: "Orange 500" },
  { value: "bg-orange-600", label: "Orange 600" },
  { value: "bg-orange-700", label: "Orange 700" },
  { value: "bg-orange-800", label: "Orange 800" },
  { value: "bg-orange-900", label: "Orange 900" },

  // Amber
  { value: "bg-amber-50", label: "Amber 50" },
  { value: "bg-amber-100", label: "Amber 100" },
  { value: "bg-amber-200", label: "Amber 200" },
  { value: "bg-amber-300", label: "Amber 300" },
  { value: "bg-amber-400", label: "Amber 400" },
  { value: "bg-amber-500", label: "Amber 500" },
  { value: "bg-amber-600", label: "Amber 600" },
  { value: "bg-amber-700", label: "Amber 700" },
  { value: "bg-amber-800", label: "Amber 800" },
  { value: "bg-amber-900", label: "Amber 900" },

  // Yellow
  { value: "bg-yellow-50", label: "Yellow 50" },
  { value: "bg-yellow-100", label: "Yellow 100" },
  { value: "bg-yellow-200", label: "Yellow 200" },
  { value: "bg-yellow-300", label: "Yellow 300" },
  { value: "bg-yellow-400", label: "Yellow 400" },
  { value: "bg-yellow-500", label: "Yellow 500" },
  { value: "bg-yellow-600", label: "Yellow 600" },
  { value: "bg-yellow-700", label: "Yellow 700" },
  { value: "bg-yellow-800", label: "Yellow 800" },
  { value: "bg-yellow-900", label: "Yellow 900" },

  // Lime
  { value: "bg-lime-50", label: "Lime 50" },
  { value: "bg-lime-100", label: "Lime 100" },
  { value: "bg-lime-200", label: "Lime 200" },
  { value: "bg-lime-300", label: "Lime 300" },
  { value: "bg-lime-400", label: "Lime 400" },
  { value: "bg-lime-500", label: "Lime 500" },
  { value: "bg-lime-600", label: "Lime 600" },
  { value: "bg-lime-700", label: "Lime 700" },
  { value: "bg-lime-800", label: "Lime 800" },
  { value: "bg-lime-900", label: "Lime 900" },

  // Green
  { value: "bg-green-50", label: "Green 50" },
  { value: "bg-green-100", label: "Green 100" },
  { value: "bg-green-200", label: "Green 200" },
  { value: "bg-green-300", label: "Green 300" },
  { value: "bg-green-400", label: "Green 400" },
  { value: "bg-green-500", label: "Green 500" },
  { value: "bg-green-600", label: "Green 600" },
  { value: "bg-green-700", label: "Green 700" },
  { value: "bg-green-800", label: "Green 800" },
  { value: "bg-green-900", label: "Green 900" },

  // Emerald
  { value: "bg-emerald-50", label: "Emerald 50" },
  { value: "bg-emerald-100", label: "Emerald 100" },
  { value: "bg-emerald-200", label: "Emerald 200" },
  { value: "bg-emerald-300", label: "Emerald 300" },
  { value: "bg-emerald-400", label: "Emerald 400" },
  { value: "bg-emerald-500", label: "Emerald 500" },
  { value: "bg-emerald-600", label: "Emerald 600" },
  { value: "bg-emerald-700", label: "Emerald 700" },
  { value: "bg-emerald-800", label: "Emerald 800" },
  { value: "bg-emerald-900", label: "Emerald 900" },

  // Teal
  { value: "bg-teal-50", label: "Teal 50" },
  { value: "bg-teal-100", label: "Teal 100" },
  { value: "bg-teal-200", label: "Teal 200" },
  { value: "bg-teal-300", label: "Teal 300" },
  { value: "bg-teal-400", label: "Teal 400" },
  { value: "bg-teal-500", label: "Teal 500" },
  { value: "bg-teal-600", label: "Teal 600" },
  { value: "bg-teal-700", label: "Teal 700" },
  { value: "bg-teal-800", label: "Teal 800" },
  { value: "bg-teal-900", label: "Teal 900" },

  // Cyan
  { value: "bg-cyan-50", label: "Cyan 50" },
  { value: "bg-cyan-100", label: "Cyan 100" },
  { value: "bg-cyan-200", label: "Cyan 200" },
  { value: "bg-cyan-300", label: "Cyan 300" },
  { value: "bg-cyan-400", label: "Cyan 400" },
  { value: "bg-cyan-500", label: "Cyan 500" },
  { value: "bg-cyan-600", label: "Cyan 600" },
  { value: "bg-cyan-700", label: "Cyan 700" },
  { value: "bg-cyan-800", label: "Cyan 800" },
  { value: "bg-cyan-900", label: "Cyan 900" },

  // Sky
  { value: "bg-sky-50", label: "Sky 50" },
  { value: "bg-sky-100", label: "Sky 100" },
  { value: "bg-sky-200", label: "Sky 200" },
  { value: "bg-sky-300", label: "Sky 300" },
  { value: "bg-sky-400", label: "Sky 400" },
  { value: "bg-sky-500", label: "Sky 500" },
  { value: "bg-sky-600", label: "Sky 600" },
  { value: "bg-sky-700", label: "Sky 700" },
  { value: "bg-sky-800", label: "Sky 800" },
  { value: "bg-sky-900", label: "Sky 900" },

  // Blue
  { value: "bg-blue-50", label: "Blue 50" },
  { value: "bg-blue-100", label: "Blue 100" },
  { value: "bg-blue-200", label: "Blue 200" },
  { value: "bg-blue-300", label: "Blue 300" },
  { value: "bg-blue-400", label: "Blue 400" },
  { value: "bg-blue-500", label: "Blue 500" },
  { value: "bg-blue-600", label: "Blue 600" },
  { value: "bg-blue-700", label: "Blue 700" },
  { value: "bg-blue-800", label: "Blue 800" },
  { value: "bg-blue-900", label: "Blue 900" },

  // Indigo
  { value: "bg-indigo-50", label: "Indigo 50" },
  { value: "bg-indigo-100", label: "Indigo 100" },
  { value: "bg-indigo-200", label: "Indigo 200" },
  { value: "bg-indigo-300", label: "Indigo 300" },
  { value: "bg-indigo-400", label: "Indigo 400" },
  { value: "bg-indigo-500", label: "Indigo 500" },
  { value: "bg-indigo-600", label: "Indigo 600" },
  { value: "bg-indigo-700", label: "Indigo 700" },
  { value: "bg-indigo-800", label: "Indigo 800" },
  { value: "bg-indigo-900", label: "Indigo 900" },

  // Violet
  { value: "bg-violet-50", label: "Violet 50" },
  { value: "bg-violet-100", label: "Violet 100" },
  { value: "bg-violet-200", label: "Violet 200" },
  { value: "bg-violet-300", label: "Violet 300" },
  { value: "bg-violet-400", label: "Violet 400" },
  { value: "bg-violet-500", label: "Violet 500" },
  { value: "bg-violet-600", label: "Violet 600" },
  { value: "bg-violet-700", label: "Violet 700" },
  { value: "bg-violet-800", label: "Violet 800" },
  { value: "bg-violet-900", label: "Violet 900" },

  // Purple
  { value: "bg-purple-50", label: "Purple 50" },
  { value: "bg-purple-100", label: "Purple 100" },
  { value: "bg-purple-200", label: "Purple 200" },
  { value: "bg-purple-300", label: "Purple 300" },
  { value: "bg-purple-400", label: "Purple 400" },
  { value: "bg-purple-500", label: "Purple 500" },
  { value: "bg-purple-600", label: "Purple 600" },
  { value: "bg-purple-700", label: "Purple 700" },
  { value: "bg-purple-800", label: "Purple 800" },
  { value: "bg-purple-900", label: "Purple 900" },

  // Fuchsia
  { value: "bg-fuchsia-50", label: "Fuchsia 50" },
  { value: "bg-fuchsia-100", label: "Fuchsia 100" },
  { value: "bg-fuchsia-200", label: "Fuchsia 200" },
  { value: "bg-fuchsia-300", label: "Fuchsia 300" },
  { value: "bg-fuchsia-400", label: "Fuchsia 400" },
  { value: "bg-fuchsia-500", label: "Fuchsia 500" },
  { value: "bg-fuchsia-600", label: "Fuchsia 600" },
  { value: "bg-fuchsia-700", label: "Fuchsia 700" },
  { value: "bg-fuchsia-800", label: "Fuchsia 800" },
  { value: "bg-fuchsia-900", label: "Fuchsia 900" },

  // Pink
  { value: "bg-pink-50", label: "Pink 50" },
  { value: "bg-pink-100", label: "Pink 100" },
  { value: "bg-pink-200", label: "Pink 200" },
  { value: "bg-pink-300", label: "Pink 300" },
  { value: "bg-pink-400", label: "Pink 400" },
  { value: "bg-pink-500", label: "Pink 500" },
  { value: "bg-pink-600", label: "Pink 600" },
  { value: "bg-pink-700", label: "Pink 700" },
  { value: "bg-pink-800", label: "Pink 800" },
  { value: "bg-pink-900", label: "Pink 900" },

  // Rose
  { value: "bg-rose-50", label: "Rose 50" },
  { value: "bg-rose-100", label: "Rose 100" },
  { value: "bg-rose-200", label: "Rose 200" },
  { value: "bg-rose-300", label: "Rose 300" },
  { value: "bg-rose-400", label: "Rose 400" },
  { value: "bg-rose-500", label: "Rose 500" },
  { value: "bg-rose-600", label: "Rose 600" },
  { value: "bg-rose-700", label: "Rose 700" },
  { value: "bg-rose-800", label: "Rose 800" },
  { value: "bg-rose-900", label: "Rose 900" },

  // Base colors
  { value: "bg-black", label: "Black" },
  { value: "bg-white", label: "White" },
  { value: "bg-transparent", label: "Transparent" },
];

export function ColorPicker({
  options,
  value,
  onChange,
  allowInherit = false,
  inheritedLabel = "Inherit",
  isInherited = false,
  onReset,
}: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [customColor, setCustomColor] = useState(value.startsWith("#") ? value : "#000000");
  const [activeTab, setActiveTab] = useState<"hex" | "tailwind">("hex");
  const pickerRef = useRef<HTMLDivElement>(null);

  // Find the selected color option
  const selectedOption = options.find((option) => option.value === value);

  // Handle color selection
  const handleColorSelect = (colorValue: string) => {
    onChange(colorValue);
    setIsOpen(false);
    setIsCustomMode(false);
  };

  // Handle custom color selection
  const handleCustomColorSelect = () => {
    if (activeTab === "hex") {
      onChange(customColor);
    }
    setIsOpen(false);
    setIsCustomMode(false);
  };

  // Handle tailwind class selection
  const handleTailwindClassSelect = (className: string) => {
    onChange(className);
    setIsOpen(false);
    setIsCustomMode(false);
  };

  // Color preview styles
  const getColorPreviewStyle = (colorValue: string) => ({
    backgroundColor: colorValue.startsWith("bg-") ? "currentColor" : colorValue,
    width: "24px",
    height: "24px",
    borderRadius: "24px",
    display: "inline-block",
    border: "1px solid #e5e7eb",
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsCustomMode(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={pickerRef}>
      <div
        className="flex items-center space-x-2 p-2 border border-gray-200 rounded-md cursor-pointer bg-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isInherited ? (
          <span className="text-sm text-blue-600">{inheritedLabel}</span>
        ) : (
          <>
            <div style={getColorPreviewStyle(value || "#ffffff")} className={value.startsWith("bg-") ? value : ""} />
            <span className="text-sm">{selectedOption?.label || value}</span>
          </>
        )}
      </div>

      {isOpen && !isCustomMode && (
        <div className="absolute z-10 mt-1 bg-white border border-gray-200 rounded-md shadow-lg p-2">
          <div className="grid grid-cols-5 gap-2">
            {options.map((option) => (
              <div
                key={option.id || option.value}
                className="cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => handleColorSelect(option.value)}
                title={option.label}
              >
                <div
                  style={getColorPreviewStyle(option.value)}
                  className={`${value === option.value ? "ring-2 ring-blue-500" : ""} ${option.tailwindClass || ""}`}
                />
              </div>
            ))}

            {/* Custom color option added to the grid */}
            <div
              className="cursor-pointer hover:opacity-80 transition-opacity"
              onClick={(e) => {
                e.stopPropagation();
                setIsCustomMode(true);
              }}
              title="Custom color"
            >
              <div className="w-[24px] h-[24px] rounded-xl bg-gradient-to-br from-red-500 via-green-500 to-blue-500 border border-gray-200" />
            </div>
          </div>

          {allowInherit && (
            <div
              className="mt-2 pt-2 border-t border-gray-200 cursor-pointer hover:bg-gray-100 p-1 rounded text-center text-sm text-blue-600"
              onClick={() => handleColorSelect("")}
            >
              {inheritedLabel}
            </div>
          )}

          {onReset && (
            <div
              className="mt-2 cursor-pointer hover:bg-gray-100 p-1 rounded text-center text-sm text-gray-600"
              onClick={() => onReset()}
            >
              Reset to default
            </div>
          )}
        </div>
      )}

      {isOpen && isCustomMode && (
        <div className="absolute z-10 mt-1 w-72 bg-white border border-gray-200 rounded-md shadow-lg p-3">
          <div className="flex justify-between border-b pb-2 mb-3">
            <h3 className="font-medium text-sm">Custom Color</h3>
            <button className="text-xs text-gray-500 hover:text-gray-700" onClick={() => setIsCustomMode(false)}>
              Back to presets
            </button>
          </div>

          <div className="mb-3">
            <div className="flex border rounded overflow-hidden">
              <button
                className={`flex-1 px-3 py-1 rounded-l text-xs font-medium cursor-pointer ${
                  activeTab === "hex"
                    ? "bg-blue-600 text-white hover:bg-blue-700 border-b-0 border-r-0 border border-blue-800"
                    : "text-gray-600 hover:text-gray-900 border border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab("hex")}
              >
                <span>Hex Color</span>
              </button>
              <button
                className={`flex-1 px-3 py-1 rounded-r text-xs font-medium cursor-pointer ${
                  activeTab === "tailwind"
                    ? "bg-blue-600 text-white hover:bg-blue-700 border-b-0 border-r-0 border border-blue-800"
                    : "text-gray-600 hover:text-gray-900 border border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab("tailwind")}
              >
                <span>Tailwind</span>
              </button>
            </div>
          </div>

          {activeTab === "hex" && (
            <div>
              <div className="mb-3">
                <input
                  type="color"
                  value={customColor}
                  onChange={(e) => setCustomColor(e.target.value)}
                  className="w-full h-8 cursor-pointer rounded"
                />
              </div>
              <div className="flex items-center mb-3">
                <span className="text-xs text-gray-500 mr-2">Hex:</span>
                <input
                  type="text"
                  value={customColor}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val.startsWith("#") && val.length <= 7) {
                      setCustomColor(val);
                    }
                  }}
                  className="flex-1 border rounded px-2 py-1 text-sm"
                  placeholder="#000000"
                />
              </div>
            </div>
          )}

          {activeTab === "tailwind" && (
            <div className="grid grid-cols-4 gap-2">
              {tailwindColorClasses.map((colorClass) => (
                <div
                  key={colorClass.value}
                  className="cursor-pointer text-center"
                  onClick={() => handleTailwindClassSelect(colorClass.value)}
                >
                  <div className={`${colorClass.value} w-8 h-8 rounded mx-auto mb-1 border`}></div>
                  <span className="text-xs">{colorClass.label}</span>
                </div>
              ))}
            </div>
          )}

          <div className="mt-3 pt-3 border-t flex justify-end">
            <button
              className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
              onClick={handleCustomColorSelect}
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
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
  onReset,
  themeVariableName,
  label,
  placeholder,
}: StyleOptionDropdownProps) {
  const handleReset = () => {
    if (onReset) {
      onReset();
    }
  };

  // Different components based on option type
  if (type === "color") {
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <ColorPicker
          value={value}
          onChange={onChange}
          options={options}
          allowInherit={allowInherit}
          inheritedValue={inheritedValue}
          inheritedLabel={inheritedLabel}
          isInherited={isInherited}
          onReset={handleReset}
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
        {value === "" && placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.id || option.value} value={option.value}>
            {option.label}
            {renderOptionPreview && renderOptionPreview(option)}
          </option>
        ))}
      </select>
    </div>
  );
}
