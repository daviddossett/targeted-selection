"use client";
import React from "react";
import { useAppContext } from "@/contexts/AppContext";
import { PropertyEditor } from "./PropertyEditor";
import { ThemeSwitcher } from "./ThemeSwitcher";

export const Sidebar: React.FC = () => {
  const { editorMode, setEditorMode } = useAppContext();

  // Check if we're in edit mode (not preview)
  const isEditMode = editorMode !== "preview";

  return (
    <div className="w-full h-full bg-card border-r border-border flex flex-col">
      <div className="p-4 border-b border-border">
        <h2 className="text-xl font-semibold mb-4">App Builder</h2>
        {isEditMode && (
          <div className="flex flex-col space-y-4">
            <div className="pt-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Editing Mode</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => setEditorMode("instance")}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    editorMode === "instance"
                      ? "bg-accent text-accent-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  Instance
                </button>
                <button
                  onClick={() => setEditorMode("component")}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    editorMode === "component"
                      ? "bg-accent text-accent-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  Component
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-auto">
        {editorMode === "instance" && <PropertyEditor mode="instance" />}
        {editorMode === "component" && <PropertyEditor mode="component" />}
        {!isEditMode && (
          <div className="p-4 text-muted-foreground">
            <p>Toggle edit mode in the preview to start editing.</p>
          </div>
        )}
      </div>

      <ThemeSwitcher />
    </div>
  );
};
