"use client";
import React, { useEffect, useCallback, useRef } from "react";
import { useAppContext } from "@/contexts/AppContext";
import { ComponentRenderer } from "./ComponentRenderer";

// Tailwind color mappings to fallback hex values
export const tailwindColors: Record<string, Record<string, string>> = {
  slate: {
    '50': '#f8fafc', '100': '#f1f5f9', '200': '#e2e8f0', '300': '#cbd5e1', 
    '400': '#94a3b8', '500': '#64748b', '600': '#475569', '700': '#334155', 
    '800': '#1e293b', '900': '#0f172a', '950': '#020617'
  },
  gray: {
    '50': '#f9fafb', '100': '#f3f4f6', '200': '#e5e7eb', '300': '#d1d5db', 
    '400': '#9ca3af', '500': '#6b7280', '600': '#4b5563', '700': '#374151', 
    '800': '#1f2937', '900': '#111827', '950': '#030712'
  },
  zinc: {
    '50': '#fafafa', '100': '#f4f4f5', '200': '#e4e4e7', '300': '#d4d4d8', 
    '400': '#a1a1aa', '500': '#71717a', '600': '#52525b', '700': '#3f3f46', 
    '800': '#27272a', '900': '#18181b', '950': '#09090b'
  },
  neutral: {
    '50': '#fafafa', '100': '#f5f5f5', '200': '#e5e5e5', '300': '#d4d4d4', 
    '400': '#a3a3a3', '500': '#737373', '600': '#525252', '700': '#404040', 
    '800': '#262626', '900': '#171717', '950': '#0a0a0a'
  },
  amber: {
    '50': '#fffbeb', '100': '#fef3c7', '200': '#fde68a', '300': '#fcd34d', 
    '400': '#fbbf24', '500': '#f59e0b', '600': '#d97706', '700': '#b45309', 
    '800': '#92400e', '900': '#78350f', '950': '#451a03'
  },
  blue: {
    '50': '#eff6ff', '100': '#dbeafe', '200': '#bfdbfe', '300': '#93c5fd', 
    '400': '#60a5fa', '500': '#3b82f6', '600': '#2563eb', '700': '#1d4ed8', 
    '800': '#1e40af', '900': '#1e3a8a', '950': '#172554'
  },
  indigo: {
    '50': '#eef2ff', '100': '#e0e7ff', '200': '#c7d2fe', '300': '#a5b4fc', 
    '400': '#818cf8', '500': '#6366f1', '600': '#4f46e5', '700': '#4338ca', 
    '800': '#3730a3', '900': '#312e81', '950': '#1e1b4b'
  },
  violet: {
    '50': '#f5f3ff', '100': '#ede9fe', '200': '#ddd6fe', '300': '#c4b5fd', 
    '400': '#a78bfa', '500': '#8b5cf6', '600': '#7c3aed', '700': '#6d28d9', 
    '800': '#5b21b6', '900': '#4c1d95', '950': '#2e1065'
  },
  purple: {
    '50': '#faf5ff', '100': '#f3e8ff', '200': '#e9d5ff', '300': '#d8b4fe', 
    '400': '#c084fc', '500': '#a855f7', '600': '#9333ea', '700': '#7e22ce', 
    '800': '#6b21a8', '900': '#581c87', '950': '#3b0764'
  },
  fuchsia: {
    '50': '#fdf4ff', '100': '#fae8ff', '200': '#f5d0fe', '300': '#f0abfc', 
    '400': '#e879f9', '500': '#d946ef', '600': '#c026d3', '700': '#a21caf', 
    '800': '#86198f', '900': '#701a75', '950': '#4a044e'
  },
  red: {
    '50': '#fef2f2', '100': '#fee2e2', '200': '#fecaca', '300': '#fca5a5', 
    '400': '#f87171', '500': '#ef4444', '600': '#dc2626', '700': '#b91c1c', 
    '800': '#991b1b', '900': '#7f1d1d', '950': '#450a0a'
  },
  green: {
    '50': '#f0fdf4', '100': '#dcfce7', '200': '#bbf7d0', '300': '#86efac', 
    '400': '#4ade80', '500': '#22c55e', '600': '#16a34a', '700': '#15803d', 
    '800': '#166534', '900': '#14532d', '950': '#052e16'
  },
  emerald: {
    '50': '#ecfdf5', '100': '#d1fae5', '200': '#a7f3d0', '300': '#6ee7b7', 
    '400': '#34d399', '500': '#10b981', '600': '#059669', '700': '#047857', 
    '800': '#065f46', '900': '#064e3b', '950': '#022c22'
  },
  teal: {
    '50': '#f0fdfa', '100': '#ccfbf1', '200': '#99f6e4', '300': '#5eead4', 
    '400': '#2dd4bf', '500': '#14b8a6', '600': '#0d9488', '700': '#0f766e', 
    '800': '#115e59', '900': '#134e4a', '950': '#042f2e'
  },
  cyan: {
    '50': '#ecfeff', '100': '#cffafe', '200': '#a5f3fc', '300': '#67e8f9', 
    '400': '#22d3ee', '500': '#06b6d4', '600': '#0891b2', '700': '#0e7490', 
    '800': '#155e75', '900': '#164e63', '950': '#083344'
  },
  sky: {
    '50': '#f0f9ff', '100': '#e0f2fe', '200': '#bae6fd', '300': '#7dd3fc', 
    '400': '#38bdf8', '500': '#0ea5e9', '600': '#0284c7', '700': '#0369a1', 
    '800': '#075985', '900': '#0c4a6e', '950': '#082f49'
  },
  lime: {
    '50': '#f7fee7', '100': '#ecfccb', '200': '#d9f99d', '300': '#bef264', 
    '400': '#a3e635', '500': '#84cc16', '600': '#65a30d', '700': '#4d7c0f', 
    '800': '#3f6212', '900': '#365314', '950': '#1a2e05'
  },
  yellow: {
    '50': '#fefce8', '100': '#fef9c3', '200': '#fef08a', '300': '#fde047', 
    '400': '#facc15', '500': '#eab308', '600': '#ca8a04', '700': '#a16207', 
    '800': '#854d0e', '900': '#713f12', '950': '#422006'
  },
  orange: {
    '50': '#fff7ed', '100': '#ffedd5', '200': '#fed7aa', '300': '#fdba74', 
    '400': '#fb923c', '500': '#f97316', '600': '#ea580c', '700': '#c2410c', 
    '800': '#9a3412', '900': '#7c2d12', '950': '#431407'
  },
  pink: {
    '50': '#fdf2f8', '100': '#fce7f3', '200': '#fbcfe8', '300': '#f9a8d4', 
    '400': '#f472b6', '500': '#ec4899', '600': '#db2777', '700': '#be185d', 
    '800': '#9d174d', '900': '#831843', '950': '#500724'
  },
  rose: {
    '50': '#fff1f2', '100': '#ffe4e6', '200': '#fecdd3', '300': '#fda4af', 
    '400': '#fb7185', '500': '#f43f5e', '600': '#e11d48', '700': '#be123c', 
    '800': '#9f1239', '900': '#881337', '950': '#4c0519'
  },
  stone: {
    '50': '#fafaf9', '100': '#f5f5f4', '200': '#e7e5e4', '300': '#d6d3d1', 
    '400': '#a8a29e', '500': '#78716c', '600': '#57534e', '700': '#44403c', 
    '800': '#292524', '900': '#1c1917', '950': '#0c0a09'
  },
  // Add white and black
  white: { 'DEFAULT': '#ffffff' },
  black: { 'DEFAULT': '#000000' }
};

export const AppPreview: React.FC = () => {
  const { appDefinition, editorMode, setEditorMode, setIsSelectMode, themeSettings, selectInstance } = useAppContext();
  const previewContainerRef = useRef<HTMLDivElement>(null);

  const isEditMode = editorMode !== "preview";

  // Apply backup inline styles for Tailwind classes that aren't working
  useEffect(() => {
    if (!previewContainerRef.current) return;
    
    // Apply background color to main preview container
    if (themeSettings.primaryBackground?.startsWith("bg-")) {
      if (themeSettings.primaryBackground === 'bg-white') {
        previewContainerRef.current.style.backgroundColor = tailwindColors.white.DEFAULT;
      } else if (themeSettings.primaryBackground === 'bg-black') {
        previewContainerRef.current.style.backgroundColor = tailwindColors.black.DEFAULT;
      } else {
        const bgColorMatch = themeSettings.primaryBackground.match(/bg-([a-z]+)-(\d+)/);
        if (bgColorMatch) {
          const colorFamily = bgColorMatch[1];
          const shade = bgColorMatch[2];
          if (tailwindColors[colorFamily]?.[shade]) {
            // Apply the hex color directly to ensure it's visible even if Tailwind didn't generate the class
            previewContainerRef.current.style.backgroundColor = tailwindColors[colorFamily][shade];
          }
        }
      }
    }
    
    // Apply text color to main preview container
    if (themeSettings.primaryText?.startsWith("text-")) {
      // Handle special cases
      if (themeSettings.primaryText === 'text-white') {
        previewContainerRef.current.style.color = tailwindColors.white.DEFAULT;
      } else if (themeSettings.primaryText === 'text-black') {
        previewContainerRef.current.style.color = tailwindColors.black.DEFAULT;
      } else {
        const textColorMatch = themeSettings.primaryText.match(/text-([a-z]+)-(\d+)/);
        if (textColorMatch) {
          const colorFamily = textColorMatch[1];
          const shade = textColorMatch[2];
          if (tailwindColors[colorFamily]?.[shade]) {
            // Apply the hex color directly to ensure it's visible even if Tailwind didn't generate the class
            previewContainerRef.current.style.color = tailwindColors[colorFamily][shade];
          }
        }
      }
    }
    
    // Apply styles to any elements in the preview with bg- classes
    const allBgElements = previewContainerRef.current.querySelectorAll("[class*='bg-']");
    allBgElements.forEach(el => {
      const classList = Array.from(el.classList);
      const bgClass = classList.find(cls => cls.startsWith("bg-"));
      if (bgClass) {
        if (bgClass === 'bg-white') {
          (el as HTMLElement).style.backgroundColor = tailwindColors.white.DEFAULT;
          return;
        }
        if (bgClass === 'bg-black') {
          (el as HTMLElement).style.backgroundColor = tailwindColors.black.DEFAULT;
          return;
        }
        
        const bgColorMatch = bgClass.match(/bg-([a-z]+)-(\d+)/);
        if (bgColorMatch) {
          const colorFamily = bgColorMatch[1];
          const shade = bgColorMatch[2];
          if (tailwindColors[colorFamily]?.[shade]) {
            (el as HTMLElement).style.backgroundColor = tailwindColors[colorFamily][shade];
          }
        }
      }
    });
    
    // Apply styles to any elements in the preview with text- classes
    const allTextElements = previewContainerRef.current.querySelectorAll("[class*='text-']");
    allTextElements.forEach(el => {
      const classList = Array.from(el.classList);
      const textClass = classList.find(cls => cls.startsWith("text-") && !cls.startsWith("text-xs") && !cls.startsWith("text-sm") && !cls.startsWith("text-base") && !cls.startsWith("text-lg") && !cls.startsWith("text-xl"));
      if (textClass) {
        // Handle special cases
        if (textClass === 'text-white') {
          (el as HTMLElement).style.color = tailwindColors.white.DEFAULT;
          return;
        }
        if (textClass === 'text-black') {
          (el as HTMLElement).style.color = tailwindColors.black.DEFAULT;
          return;
        }
        
        const textColorMatch = textClass.match(/text-([a-z]+)-(\d+)/);
        if (textColorMatch) {
          const colorFamily = textColorMatch[1];
          const shade = textColorMatch[2];
          if (tailwindColors[colorFamily]?.[shade]) {
            (el as HTMLElement).style.color = tailwindColors[colorFamily][shade];
          }
        }
      }
    });
  }, [themeSettings, appDefinition]);

  const enterEditMode = useCallback(() => {
    if (!isEditMode) {
      setEditorMode("component"); // Default to component editing mode when toggling edit mode on
      setIsSelectMode(true); // Automatically enter selection mode when edit mode is enabled
      selectInstance(null); // Clear any previously selected instance
    } else {
      setEditorMode("preview"); // Exit edit mode
      setIsSelectMode(false); // Exit selection mode
    }
  }, [isEditMode, setEditorMode, setIsSelectMode, selectInstance]);

  // Add keyboard shortcut for edit mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Cmd/Ctrl + E
      if ((e.metaKey || e.ctrlKey) && e.key === "e") {
        e.preventDefault(); // Prevent browser's default behavior
        enterEditMode();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [enterEditMode]);

  // Platform detection using userAgent
  const [isMac, setIsMac] = React.useState(false);

  React.useEffect(() => {
    setIsMac(/Macintosh|MacIntel|MacPPC|Mac68K/i.test(navigator.userAgent));
  }, []);

  // Apply global theme settings to the preview area
  const previewStyle: React.CSSProperties = {
    backgroundColor: themeSettings.primaryBackground.startsWith("bg-") ? undefined : themeSettings.primaryBackground,
    color: themeSettings.primaryText.startsWith("text-") ? undefined : themeSettings.primaryText,
    fontFamily: themeSettings.fontFamily,
    borderRadius: themeSettings.borderRadius,
    transition: "all 0.2s ease-in-out",
  };

  // Get Tailwind classes for background and text
  const backgroundClass = themeSettings.primaryBackground.startsWith("bg-") ? themeSettings.primaryBackground : "";
  const textClass = themeSettings.primaryText.startsWith("text-") ? themeSettings.primaryText : "";

  return (
    <div 
      ref={previewContainerRef}
      className={`w-full h-full flex flex-col ${backgroundClass} ${textClass}`} 
      style={previewStyle}
    >
      {/* Toolbar - isolated from theme changes */}
      <div className="bg-white px-4 py-4 flex justify-between items-center border-b border-gray-200 flex-shrink-0" style={{ backgroundColor: 'white', color: '#111827' }}>
        <div className="flex gap-2">
          {!isEditMode ? (
            <button
              onClick={enterEditMode}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ease-in-out cursor-pointer bg-blue-600 hover:bg-blue-700"
              style={{ backgroundColor: '#2563eb', color: 'white' }}
            >
              <span className="flex items-center gap-2">
                Edit Mode
                <span className="text-xs px-2 py-0.5 rounded bg-blue-700 text-white" style={{ backgroundColor: '#1d4ed8', color: 'white' }}>{isMac ? "⌘" : "Ctrl"}+E</span>
              </span>
            </button>
          ) : (
            <button
              onClick={enterEditMode}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ease-in-out cursor-pointer bg-gray-100 text-gray-800 hover:bg-gray-200"
              style={{ backgroundColor: '#f3f4f6', color: '#1f2937' }}
            >
              Exit Edit Mode
            </button>
          )}
        </div>
      </div>

      {/* Preview Content - Scrollable container */}
      <div className="flex-1 overflow-auto no-overscroll">
        <div className="p-4 min-h-full">
          {appDefinition.instances && appDefinition.instances.length > 0 ? (
            <ComponentRenderer instance={appDefinition.instances[0]} />
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 text-gray-400">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Components</h3>
              <p className="text-gray-500">Start by creating components in the sidebar.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
