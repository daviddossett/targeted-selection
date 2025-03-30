"use client";
import React, { useEffect, useCallback } from "react";
import { useAppContext } from "@/contexts/AppContext";
import { ComponentRenderer } from "./ComponentRenderer";

export const AppPreview: React.FC = () => {
  const { appDefinition, editorMode, setEditorMode, setIsSelectMode, hasUnsavedChanges, saveChanges, discardChanges } =
    useAppContext();

  const isEditMode = editorMode !== "preview";

  const enterEditMode = useCallback(() => {
    if (!isEditMode) {
      setEditorMode("component"); // Default to component editing mode when toggling edit mode on
      setIsSelectMode(true); // Automatically enter selection mode when edit mode is enabled
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
  }, [enterEditMode]); // Added enterEditMode as dependency

  // Platform detection using userAgent
  const [isMac, setIsMac] = React.useState(false);

  React.useEffect(() => {
    setIsMac(/Macintosh|MacIntel|MacPPC|Mac68K/i.test(navigator.userAgent));
  }, []);

  return (
    <div className="w-full h-full bg-background flex flex-col">
      {/* Toolbar */}
      <div className="bg-white px-4 py-4 flex justify-between items-center border-b border-gray-200">
        <div className="text-sm text-gray-500 flex items-center">
          {isEditMode && <span className="bg-blue-50 text-blue-800 px-2 py-0.5 rounded-md text-xs">Editing Mode</span>}
        </div>
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
            <>
              <button
                onClick={saveChanges}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ease-in-out cursor-pointer bg-green-600 text-white hover:bg-green-700"
              >
                <span>Save Changes</span>
              </button>
              <button
                onClick={discardChanges}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ease-in-out cursor-pointer bg-red-50 text-red-700 border border-red-200 hover:bg-red-100"
              >
                <span>Discard Changes</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Preview Content - Directly render the card without extra wrappers */}
      <div className="flex-1 overflow-auto flex items-center justify-center p-4">
        <div className={`${isEditMode ? "relative" : ""}`}>
          <ComponentRenderer instance={appDefinition.instances[0]} />
        </div>
      </div>

      {/* Save indicator */}
      {hasUnsavedChanges && (
        <div className="fixed bottom-4 right-4 bg-yellow-50 text-yellow-800 px-3 py-2 rounded-md text-sm shadow-md border border-yellow-200">
          You have unsaved changes
        </div>
      )}
    </div>
  );
};
