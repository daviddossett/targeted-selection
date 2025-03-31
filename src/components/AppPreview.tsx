"use client";
import React, { useEffect, useCallback } from "react";
import { useAppContext } from "@/contexts/AppContext";
import { ComponentRenderer } from "./ComponentRenderer";

export const AppPreview: React.FC = () => {
  const { appDefinition, editorMode, setEditorMode, setIsSelectMode, themeSettings, selectInstance } = useAppContext();

  const isEditMode = editorMode !== "preview";

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
    <div className={`w-full h-full ${backgroundClass} ${textClass}`} style={previewStyle}>
      {/* Toolbar */}
      <div className="bg-white px-4 py-4 flex justify-between items-center border-b border-gray-200">
        <div className="flex gap-2">
          {!isEditMode ? (
            <button
              onClick={enterEditMode}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ease-in-out cursor-pointer bg-blue-600 text-white hover:bg-blue-700"
            >
              <span className="flex items-center gap-2">
                Edit Mode
                <span className="text-xs px-2 py-0.5 rounded bg-blue-700 text-white">{isMac ? "⌘" : "Ctrl"}+E</span>
              </span>
            </button>
          ) : (
            <button
              onClick={enterEditMode}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ease-in-out cursor-pointer bg-gray-100 text-gray-800 hover:bg-gray-200"
            >
              Exit Edit Mode
            </button>
          )}
        </div>
      </div>

      {/* Preview Content */}
      <div className="p-4">
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
  );
};
