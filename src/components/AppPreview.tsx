"use client";
import React, { useEffect } from "react";
import { useAppContext } from "@/contexts/AppContext";
import { ComponentRenderer } from "./ComponentRenderer";
import { Card } from "@/components/ui/card";

export const AppPreview: React.FC = () => {
  const { appDefinition, editorMode, setEditorMode, setIsSelectMode, selectInstance } = useAppContext();

  // We expect the first instance to be the root container
  const rootInstance = appDefinition.instances[0];
  const isEditMode = editorMode !== "preview";

  const toggleEditMode = () => {
    if (isEditMode) {
      setEditorMode("preview");
      setIsSelectMode(false);
      selectInstance(null); // Clear any selected component when exiting edit mode
    } else {
      setEditorMode("component"); // Default to component editing mode when toggling edit mode on
      setIsSelectMode(true); // Automatically enter selection mode when edit mode is enabled
    }
  };

  // Add keyboard shortcut for edit mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Cmd/Ctrl + E
      if ((e.metaKey || e.ctrlKey) && e.key === 'e') {
        e.preventDefault(); // Prevent browser's default behavior
        toggleEditMode();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isEditMode]); // Re-run effect when isEditMode changes

  // Platform detection using userAgent
  const [isMac, setIsMac] = React.useState(false);

  React.useEffect(() => {
    setIsMac(/Macintosh|MacIntel|MacPPC|Mac68K/i.test(navigator.userAgent));
  }, []);

  return (
    <div className="w-full h-full bg-background flex flex-col">
      {/* Toolbar */}
      <div className="border-b border-gray-200 bg-white px-4 py-2 flex justify-center">
        <button
          onClick={toggleEditMode}
          className={`
            inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium
            transition-all duration-200 ease-in-out
            ${isEditMode 
              ? 'bg-blue-600 text-white hover:bg-blue-700 border-b-0 border-r-0 border border-blue-800' 
              : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
            }
          `}
        >
          <span className="flex items-center gap-2">
            {isEditMode ? "Edit Mode" : "Preview Mode"}
            <span className={`
              text-xs px-2 py-0.5 rounded transition-colors duration-300
              ${isEditMode 
                ? 'bg-blue-700 text-white' 
                : 'bg-gray-100 text-gray-600'
              }
            `}>
              {isMac ? '⌘' : 'Ctrl'}+E
            </span>
          </span>
        </button>
      </div>

      {/* Preview Content */}
      <div className="flex-1 overflow-auto">
        <div className="min-h-full flex flex-col items-center justify-center p-8">
          <Card className={`w-full max-w-4xl ${isEditMode ? "relative" : ""}`}>
            <div className="p-4">
              <ComponentRenderer instance={rootInstance} />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
