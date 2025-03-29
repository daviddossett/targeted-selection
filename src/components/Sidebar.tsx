"use client";
import React from "react";
import { useAppContext } from "@/contexts/AppContext";
import { PropertyEditor } from "./PropertyEditor";
import { ResetIcon } from "@/components/icons/ResetIcon";

export const Sidebar: React.FC = () => {
  const { editorMode, setEditorMode, getSelectedInstance, getComponentById, resetAllOverrides } = useAppContext();
  const [isMac, setIsMac] = React.useState(false);

  React.useEffect(() => {
    setIsMac(/Macintosh|MacIntel|MacPPC|Mac68K/i.test(navigator.userAgent));
  }, [setEditorMode]);

  // Add keyboard shortcuts for component/instance toggle
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Cmd/Ctrl + 1/2
      if ((e.metaKey || e.ctrlKey) && (e.key === "1" || e.key === "2")) {
        e.preventDefault(); // Prevent browser's default behavior
        if (e.key === "1") {
          setEditorMode("component");
        } else if (e.key === "2") {
          setEditorMode("instance");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Check if we're in edit mode (not preview)
  const isEditMode = editorMode !== "preview";

  // Get selected instance and its component
  const selectedInstance = getSelectedInstance();
  const selectedComponent = selectedInstance ? getComponentById(selectedInstance.componentId) : null;

  // Check if the selected instance has any overrides
  const hasOverrides =
    selectedInstance &&
    (Object.keys(selectedInstance.properties).length > 0 ||
      Object.keys(selectedInstance.instanceStyles || {}).length > 0);

  return (
    <div className="w-full h-full bg-card border-r border-gray-200 flex flex-col">
      <div className="p-4">
        {isEditMode && selectedInstance && selectedComponent && (
          <div className="flex flex-col space-y-4">
            {/* Combined Edit Mode and Selection Badge */}
            <div
              className={`rounded-lg border ${
                editorMode === "component" ? "bg-purple-50 border-purple-200" : "bg-blue-50 border-blue-200"
              }`}
            >
              <div className="p-2">
                <div
                  className={`text-lg font-bold ${editorMode === "component" ? "text-purple-700" : "text-blue-700"}`}
                >
                  {selectedComponent.label}
                </div>
                <div className={`text-xs ${editorMode === "component" ? "text-purple-500" : "text-blue-500"}`}>
                  {selectedInstance.id}
                </div>
                {hasOverrides && (
                  <button
                    onClick={() => selectedInstance && resetAllOverrides(selectedInstance.id)}
                    className="mt-2 text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1"
                  >
                    <ResetIcon />
                    Reset all overrides
                  </button>
                )}
              </div>
              <div className="p-2 border-t border-inherit">
                <div className="flex">
                  <button
                    onClick={() => setEditorMode("component")}
                    className={`px-2 py-0.5 rounded-l text-xs font-medium cursor-pointer ${
                      editorMode === "component"
                        ? "bg-purple-600 text-white hover:bg-purple-700 border-b-0 border-r-0 border border-purple-800"
                        : "text-gray-600 hover:text-gray-900 border border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      Component
                      <span
                        className={`
                        text-[10px] px-1 py-0.5 rounded transition-colors duration-300
                        ${editorMode === "component" ? "bg-purple-700 text-white" : "bg-gray-100 text-gray-600"}
                      `}
                      >
                        {isMac ? "⌘" : "Ctrl"}+1
                      </span>
                    </span>
                  </button>
                  <button
                    onClick={() => setEditorMode("instance")}
                    className={`px-2 py-0.5 rounded-r text-xs font-medium cursor-pointer ${
                      editorMode === "instance"
                        ? "bg-blue-600 text-white hover:bg-blue-700 border-b-0 border-r-0 border border-blue-800"
                        : "text-gray-600 hover:text-gray-900 border border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      Instance
                      <span
                        className={`
                        text-[10px] px-1 py-0.5 rounded transition-colors duration-300
                        ${editorMode === "instance" ? "bg-blue-700 text-white" : "bg-gray-100 text-gray-600"}
                      `}
                      >
                        {isMac ? "⌘" : "Ctrl"}+2
                      </span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div>
        {editorMode === "instance" && <PropertyEditor mode="instance" />}
        {editorMode === "component" && <PropertyEditor mode="component" />}
        {!isEditMode && (
          <div className="p-4 text-muted-foreground">
            <p className="text-sm">Toggle edit mode in the preview to start editing.</p>
          </div>
        )}
      </div>
    </div>
  );
};
