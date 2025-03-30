"use client";

import React, { ElementType } from "react";
import { ComponentInstance, ComponentStyle } from "@/lib/types";
import { useAppContext } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ResetIcon } from "@/components/icons/ResetIcon";
import { cn } from "@/lib/utils";

interface ComponentRendererProps {
  instance: ComponentInstance;
}

export const ComponentRenderer: React.FC<ComponentRendererProps> = ({ instance }) => {
  const { getComponentById, selectInstance, selectedInstanceId, isSelectMode, editorMode, resetAllOverrides } =
    useAppContext();
  const component = getComponentById(instance.componentId);
  const [isHovered, setIsHovered] = React.useState(false);

  if (!component) {
    return <div>Component not found: {instance.componentId}</div>;
  }

  const handleClick = (e: React.MouseEvent) => {
    // In edit mode, components should always be selectable
    if (editorMode !== "preview") {
      e.stopPropagation();
      selectInstance(instance.id);
    }
  };

  const isSelected = selectedInstanceId === instance.id;

  // Selection and hover classes
  const selectionClasses = isSelected
    ? "outline outline-3 outline-blue-500 outline-offset-2 relative"
    : isSelectMode
    ? "outline outline-dashed outline-gray-300 outline-offset-2 cursor-pointer relative"
    : "";

  const hoverClasses =
    isHovered && editorMode !== "preview" && !isSelected
      ? "outline outline-2 outline-dashed outline-emerald-500 outline-offset-2 relative"
      : "";

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
    <div className="absolute -top-8 left-1 bg-blue-500 text-white text-xs py-1 px-2 rounded-t-md flex items-center gap-2 z-10">
      <span>
        <span className="font-medium">{component.label}</span> - {instance.id}
      </span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          resetAllOverrides(instance.id);
        }}
        className="hover:bg-blue-600 rounded p-1"
        title="Reset all overrides"
      >
        <ResetIcon />
      </button>
    </div>
  ) : null;

  // Hover label to show element type when hovering
  const HoverLabel =
    isHovered && editorMode !== "preview" && !isSelected ? (
      <div className="absolute -top-6 left-0 bg-green-500 text-white text-xs py-1 px-2 rounded-t-md z-9">
        {component.label}
      </div>
    ) : null;

  const renderChildren = () => {
    if (!instance.children || instance.children.length === 0) return null;
    return instance.children.map((child) => <ComponentRenderer key={child.id} instance={child} />);
  };

  // Get combined styles (merge default styles with instance overrides)
  const getStyles = () => {
    // Start with component default styles
    const baseStyles = { ...component.defaultStyles };

    // If no instance styles, just return the component styles
    if (!instance.instanceStyles || Object.keys(instance.instanceStyles).length === 0) {
      return preprocessStyles(baseStyles);
    }

    // Create a new object for the final styles
    const finalStyles: ComponentStyle = {};

    // Process component default styles first
    const componentStyleEntries = Object.entries(baseStyles);
    for (const [key, value] of componentStyleEntries) {
      if (value !== undefined) {
        // Cast key to keyof ComponentStyle since we know it's a valid style property
        finalStyles[key as keyof ComponentStyle] = value;
      }
    }

    // Apply instance style overrides
    const instanceStyleEntries = Object.entries(instance.instanceStyles);
    for (const [key, value] of instanceStyleEntries) {
      if (value !== undefined) {
        // Cast key to keyof ComponentStyle since we know it's a valid style property
        finalStyles[key as keyof ComponentStyle] = value;
      }
    }

    // Apply preprocessing to handle any potential conflicts
    return preprocessStyles(finalStyles);
  };

  // Preprocess styles to avoid conflicts between shorthand and individual properties
  const preprocessStyles = (styles: ComponentStyle): ComponentStyle => {
    const processedStyles: ComponentStyle = { ...styles };

    // Handle margin conflicts
    const hasMarginShorthand = Boolean(processedStyles.margin);
    const hasIndividualMargins = Boolean(
      processedStyles.marginTop ||
        processedStyles.marginRight ||
        processedStyles.marginBottom ||
        processedStyles.marginLeft
    );

    // If both shorthand and individual margins exist, prefer individual ones
    if (hasMarginShorthand && hasIndividualMargins) {
      delete processedStyles.margin;
    }

    // Handle padding conflicts
    const hasPaddingShorthand = Boolean(processedStyles.padding);
    const hasIndividualPaddings = Boolean(
      processedStyles.paddingTop ||
        processedStyles.paddingRight ||
        processedStyles.paddingBottom ||
        processedStyles.paddingLeft
    );

    // If both shorthand and individual paddings exist, prefer individual ones
    if (hasPaddingShorthand && hasIndividualPaddings) {
      delete processedStyles.padding;
    }

    return processedStyles;
  };

  // Use the styles directly with type assertion for React compatibility
  const combinedStyles = getStyles() as React.CSSProperties;

  switch (component.type) {
    case "button":
      // Map our variant names to the actual variant names used by the Button component
      const variantMapping: Record<string, "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"> = {
        primary: "default",
        secondary: "secondary",
        outline: "outline",
        destructive: "destructive",
        ghost: "ghost",
        link: "link",
      };

      const buttonVariant = instance.properties.variant || component.properties.variant || "primary";
      const mappedVariant = variantMapping[buttonVariant] || "default";

      return (
        <div className="relative inline-block" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {SelectedBadge}
          {HoverLabel}
          <Button
            onClick={handleClick}
            className={cn(selectionClasses, hoverClasses)}
            style={combinedStyles}
            variant={mappedVariant}
            size="default"
          >
            {instance.properties.text !== undefined ? instance.properties.text : component.properties.text}
          </Button>
        </div>
      );

    case "text":
      // Use paragraph by default instead of relying on the now-removed element property
      const Element = "p" as ElementType;
      const elementClasses: Record<string, string> = {
        h1: "text-4xl font-bold mb-4 leading-tight",
        h2: "text-3xl font-semibold mb-3 leading-snug",
        h3: "text-2xl font-semibold mb-2 leading-snug",
        h4: "text-xl font-semibold mb-2 leading-snug",
        p: "text-base leading-relaxed mb-2",
        span: "text-base leading-relaxed inline",
        blockquote: "text-xl italic border-l-4 border-gray-200 pl-4 mb-2 leading-relaxed",
        pre: "text-sm bg-gray-100 p-4 rounded-md mb-2 font-mono leading-relaxed whitespace-pre-wrap",
        div: "text-base leading-relaxed mb-2",
      };

      return (
        <div className={cn("relative", "block")} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {SelectedBadge}
          {HoverLabel}
          <Element
            onClick={handleClick}
            className={cn(elementClasses[Element as keyof typeof elementClasses], selectionClasses, hoverClasses)}
            style={combinedStyles}
          >
            {instance.properties.content !== undefined ? instance.properties.content : component.properties.content}
          </Element>
        </div>
      );

    case "card":
      return (
        <div className="relative block" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {SelectedBadge}
          {HoverLabel}
          <Card onClick={handleClick} className={cn(selectionClasses, hoverClasses)} style={combinedStyles}>
            <CardContent>{renderChildren()}</CardContent>
          </Card>
        </div>
      );

    case "container":
      return (
        <div className="relative block" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {SelectedBadge}
          {HoverLabel}
          <div
            onClick={handleClick}
            className={cn("flex flex-col gap-4 w-full", selectionClasses, hoverClasses)}
            style={combinedStyles}
          >
            {instance.properties.title && (
              <>
                <h2 className="text-xl font-medium mb-4">{instance.properties.title}</h2>
                <Separator className="my-4" />
              </>
            )}
            {renderChildren()}
          </div>
        </div>
      );

    default:
      return <div>Unknown component type: {component.type}</div>;
  }
};
