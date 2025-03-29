"use client";
import React from "react";
import { useAppContext } from "@/contexts/AppContext";
import { PropertyEditor } from "./PropertyEditor";
import { ResetIcon } from "@/components/icons/ResetIcon";
import { PushUpIcon } from "@/components/icons/PushUpIcon";

export const Sidebar: React.FC = () => {
  const { editorMode, setEditorMode, getSelectedInstance, getComponentById, resetAllOverrides, pushOverridesToComponent } = useAppContext();
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
              <div className="px-4 py-3">
                <div
                  className={`text-xl font-semibold ${
                    editorMode === "component" ? "text-purple-700" : "text-blue-700"
                  }`}
                >
                  {selectedComponent.label}
                </div>
                <div className={`text-xs ${editorMode === "component" ? "text-purple-500" : "text-blue-500"}`}>
                  {selectedInstance.id}
                </div>
              </div>
              <div className="p-2 border-t border-inherit">
                <div className="flex w-full">
                  <button
                    onClick={() => setEditorMode("component")}
                    className={`flex-1 px-3 py-1 rounded-l text-xs font-medium cursor-pointer ${
                      editorMode === "component"
                        ? "bg-purple-600 text-white hover:bg-purple-700 border-b-0 border-r-0 border border-purple-800"
                        : "text-gray-600 hover:text-gray-900 border border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                    }`}
                  >
                    <span>
                      Component{" "}
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
                    className={`flex-1 px-3 py-1 rounded-r text-xs font-medium cursor-pointer ${
                      editorMode === "instance"
                        ? "bg-blue-600 text-white hover:bg-blue-700 border-b-0 border-r-0 border border-blue-800"
                        : "text-gray-600 hover:text-gray-900 border border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                    }`}
                  >
                    <span>
                      Instance{" "}
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
        {hasOverrides && editorMode === "instance" && (
          <div className="px-4 w-full mb-4 flex gap-2">
            <button
              onClick={() => selectedInstance && resetAllOverrides(selectedInstance.id)}
              className="bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ease-in-out cursor-pointer flex-1"
            >
              <ResetIcon />
              Reset all overrides
            </button>
            <button
              onClick={() => selectedInstance && pushOverridesToComponent(selectedInstance.id)}
              className="bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100 inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ease-in-out cursor-pointer"
              title="Push overrides up to component level"
            >
              <PushUpIcon />
            </button>
          </div>
        )}
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
