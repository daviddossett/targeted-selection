"use client";

import React, { CSSProperties, ElementType } from "react";
import { ComponentInstance } from "@/lib/types";
import { useAppContext } from "@/contexts/AppContext";

interface ComponentRendererProps {
  instance: ComponentInstance;
}

export const ComponentRenderer: React.FC<ComponentRendererProps> = ({ instance }) => {
  const { getComponentById, selectInstance, selectedInstanceId, isSelectMode, editorMode } = useAppContext();
  const component = getComponentById(instance.componentId);
  const [isHovered, setIsHovered] = React.useState(false);

  if (!component) {
    return <div>Component not found: {instance.componentId}</div>;
  }

  const mergedStyles = {
    ...component.defaultStyles,
    ...(instance.instanceStyles || {}),
  };

  const handleClick = (e: React.MouseEvent) => {
    // In edit mode, components should always be selectable
    if (editorMode !== "preview") {
      e.stopPropagation();
      selectInstance(instance.id);
    }
  };

  const isSelected = selectedInstanceId === instance.id;

  // Enhanced selection styling
  const selectionStyles: CSSProperties = isSelected
    ? {
        outline: "3px solid #0070f3",
        outlineOffset: "2px",
        position: "relative",
      }
    : isSelectMode
    ? {
        outline: isSelectMode ? "1px dashed #aaa" : "none",
        outlineOffset: "2px",
        cursor: isSelectMode ? "pointer" : "default",
        position: "relative",
      }
    : {};

  // Hover styles for edit mode
  const hoverStyles: CSSProperties =
    isHovered && editorMode !== "preview" && !isSelected
      ? {
          outline: "2px dashed #10b981",
          outlineOffset: "2px",
          position: "relative",
        }
      : {};

  // Mouse event handlers
  const handleMouseEnter = () => {
    if (editorMode !== "preview") {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Badge to show when element is selected
  const SelectedBadge = isSelected ? (
    <div
      className="absolute -top-6 left-0 bg-blue-500 text-white text-xs py-1 px-2 rounded-t-md"
      style={{ zIndex: 10 }}
    >
      {component.label} - {instance.id}
    </div>
  ) : null;

  // Hover label to show element type when hovering
  const HoverLabel =
    isHovered && editorMode !== "preview" && !isSelected ? (
      <div
        className="absolute -top-6 left-0 bg-green-500 text-white text-xs py-1 px-2 rounded-t-md"
        style={{ zIndex: 9 }}
      >
        {component.label}
      </div>
    ) : null;

  const renderChildren = () => {
    if (!instance.children || instance.children.length === 0) return null;
    return instance.children.map((child) => <ComponentRenderer key={child.id} instance={child} />);
  };

  switch (component.type) {
    case "button":
      return (
        <div
          className="relative"
          style={{ display: "inline-block" }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {SelectedBadge}
          {HoverLabel}
          <button
            onClick={handleClick}
            style={{
              ...(mergedStyles as CSSProperties),
              ...selectionStyles,
              ...hoverStyles,
            }}
          >
            {/* Always read component properties as the fallback if instance doesn't override */}
            {instance.properties.text !== undefined ? instance.properties.text : component.properties.text}
          </button>
        </div>
      );

    case "text": {
      const ElementTag = (
        instance.properties.element !== undefined ? instance.properties.element : component.properties.element || "p"
      ) as ElementType;
      return (
        <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {SelectedBadge}
          {HoverLabel}
          <ElementTag
            onClick={handleClick}
            style={{
              ...(mergedStyles as CSSProperties),
              ...selectionStyles,
              ...hoverStyles,
            }}
          >
            {instance.properties.content !== undefined ? instance.properties.content : component.properties.content}
          </ElementTag>
        </div>
      );
    }

    case "card":
      return (
        <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {SelectedBadge}
          {HoverLabel}
          <div
            onClick={handleClick}
            style={{
              ...(mergedStyles as CSSProperties),
              ...selectionStyles,
              ...hoverStyles,
            }}
          >
            {/* Check if instance has a title property, otherwise use component default */}
            {(instance.properties.title !== undefined ? instance.properties.title : component.properties.title) && (
              <h3 className="text-lg font-medium mb-2">
                {instance.properties.title !== undefined ? instance.properties.title : component.properties.title}
              </h3>
            )}
            {renderChildren()}
          </div>
        </div>
      );

    case "container":
      return (
        <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {SelectedBadge}
          {HoverLabel}
          <div
            onClick={handleClick}
            style={{
              ...(mergedStyles as CSSProperties),
              ...selectionStyles,
              ...hoverStyles,
            }}
          >
            {/* Check if instance has a title property, otherwise use component default */}
            {(instance.properties.title !== undefined ? instance.properties.title : component.properties.title) && (
              <h2 className="text-xl font-medium mb-4">
                {instance.properties.title !== undefined ? instance.properties.title : component.properties.title}
              </h2>
            )}
            {renderChildren()}
          </div>
        </div>
      );

    default:
      return <div>Unknown component type: {component.type}</div>;
  }
};
