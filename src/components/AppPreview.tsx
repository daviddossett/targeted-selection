"use client";
import React from "react";
import { useAppContext } from "@/contexts/AppContext";
import { ComponentRenderer } from "./ComponentRenderer";

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
      setEditorMode("instance"); // Default to instance editing mode when toggling edit mode on
      setIsSelectMode(true); // Automatically enter selection mode when edit mode is enabled
    }
  };

  return (
    <div className="w-full h-full bg-background overflow-auto p-8">
      <div className="w-full h-full flex flex-col items-start justify-center">
        <div className="w-full flex justify-end mb-4">
          <button
            onClick={toggleEditMode}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              isEditMode ? "bg-accent text-accent-foreground" : "bg-muted text-foreground hover:bg-muted/80"
            }`}
          >
            {isEditMode ? "Exit Edit Mode" : "Edit Mode"}
          </button>
        </div>

        <div
          className={`bg-card border border-border rounded-lg shadow-sm w-full max-w-4xl min-h-[50vh] ${
            isEditMode ? "relative" : ""
          }`}
        >
          <div className="p-4">
            <ComponentRenderer instance={rootInstance} />
          </div>
        </div>
      </div>
    </div>
  );
};
