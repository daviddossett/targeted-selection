"use client";
import React, { useState } from "react";

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

export function ColorPicker({
  options,
  value,
  onChange,
  allowInherit = false,
  inheritedValue = "",
  inheritedLabel = "Inherit",
  isInherited = false,
  onReset,
  themeVariableName,
}: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Find the selected color option
  const selectedOption = options.find(option => option.value === value);
  
  // Handle color selection
  const handleColorSelect = (colorValue: string) => {
    onChange(colorValue);
    setIsOpen(false);
  };
  
  // Color preview styles
  const getColorPreviewStyle = (colorValue: string) => ({
    backgroundColor: colorValue,
    width: "24px",
    height: "24px",
    borderRadius: "4px",
    display: "inline-block",
    border: "1px solid #e5e7eb",
  });
  
  return (
    <div className="relative">
      <div 
        className="flex items-center space-x-2 p-2 border border-gray-200 rounded-md cursor-pointer bg-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isInherited ? (
          <span className="text-sm text-blue-600">{inheritedLabel}</span>
        ) : (
          <>
            <div style={getColorPreviewStyle(value || "#ffffff")} />
            <span className="text-sm">{selectedOption?.label || value}</span>
          </>
        )}
      </div>
      
      {isOpen && (
        <div className="absolute z-10 mt-1 w-60 bg-white border border-gray-200 rounded-md shadow-lg p-2">
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
                  className={value === option.value ? "ring-2 ring-blue-500" : ""}
                />
              </div>
            ))}
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
  const showColorPreview = type === "color";
  
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
        {value === "" && placeholder && (
          <option value="">{placeholder}</option>
        )}
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
