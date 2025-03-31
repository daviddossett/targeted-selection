"use client";
import React, { useEffect, useCallback } from "react";
import { useAppContext } from "@/contexts/AppContext";
import { ComponentRenderer } from "./ComponentRenderer";

export const AppPreview: React.FC = () => {
  const {
    appDefinition,
    editorMode,
    setEditorMode,
    setIsSelectMode,
    hasUnsavedChanges,
    saveChanges,
    discardChanges,
    themeSettings,
  } = useAppContext();

  const isEditMode = editorMode !== "preview";

  const enterEditMode = useCallback(() => {
    if (!isEditMode) {
      setEditorMode("component"); // Default to component editing mode when toggling edit mode on
      setIsSelectMode(true); // Automatically enter selection mode when edit mode is enabled
    } else {
      setEditorMode("preview"); // Exit edit mode
      setIsSelectMode(false); // Exit selection mode
    }
  }, [isEditMode, setEditorMode, setIsSelectMode]);

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
            <div className="flex gap-2">
              <button
                onClick={saveChanges}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ease-in-out cursor-pointer bg-green-600 text-white hover:bg-green-700"
              >
                Save Changes
              </button>
              <button
                onClick={discardChanges}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ease-in-out cursor-pointer bg-red-600 text-white hover:bg-red-700"
              >
                Discard Changes
              </button>
            </div>
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
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Components to Preview</h3>
            <p className="text-gray-500 mb-4">Add some components from the sidebar to get started.</p>
            <button
              onClick={enterEditMode}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              <span>Add Components</span>
              <span className="text-xs px-2 py-0.5 rounded bg-blue-700">{isMac ? "⌘" : "Ctrl"}+E</span>
            </button>
          </div>
        )}
      </div>

      {/* Save indicator */}
      {hasUnsavedChanges && (
        <div className="fixed bottom-4 right-4 bg-yellow-50 text-yellow-800 px-4 py-3 rounded-lg text-sm shadow-lg border border-yellow-200 flex items-center gap-2">
          <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span>You have unsaved changes</span>
        </div>
      )}
    </div>
  );
};
