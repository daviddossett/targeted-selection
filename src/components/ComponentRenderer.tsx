"use client";

import React, { ElementType, useEffect } from "react";
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
  const {
    getComponentById,
    selectInstance,
    selectedInstanceId,
    isSelectMode,
    editorMode,
    resetAllOverrides,
    themeSettings,
  } = useAppContext();
  const component = getComponentById(instance.componentId);
  const [isHovered, setIsHovered] = React.useState(false);
  // Force re-render when themeSettings change by using a counter
  const [, setRenderCounter] = React.useState(0);

  // Re-render when theme settings change
  useEffect(() => {
    setRenderCounter((prev) => prev + 1);
  }, [themeSettings]);

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

  // Apply theme settings to components when appropriate
  const applyThemeStyles = (componentStyles: React.CSSProperties): React.CSSProperties => {
    const finalStyles = { ...componentStyles };

    // Apply border radius from theme if not explicitly set on component
    if (!finalStyles.borderRadius && themeSettings.borderRadius) {
      finalStyles.borderRadius = themeSettings.borderRadius;
    }

    // Apply font family from theme if not explicitly set on component
    if (!finalStyles.fontFamily && themeSettings.fontFamily) {
      finalStyles.fontFamily = themeSettings.fontFamily;
    }

    // Apply background colors based on component type only if no color is explicitly set
    // This includes tailwind classes that start with "bg-"
    const hasExplicitBgColor = finalStyles.backgroundColor !== undefined && finalStyles.backgroundColor !== "";
    if (!hasExplicitBgColor) {
      if (component.type === "button") {
        finalStyles.backgroundColor = themeSettings.primaryAccent;
      } else if (component.type === "card") {
        finalStyles.backgroundColor = themeSettings.primaryBackground;
      } else if (component.type === "container") {
        finalStyles.backgroundColor = themeSettings.secondaryBackground;
      }
    }

    // Apply text color inheritance from theme if not explicitly set
    // This includes tailwind classes that start with "text-"
    const hasExplicitTextColor = finalStyles.color !== undefined && finalStyles.color !== "";
    if (!hasExplicitTextColor) {
      if (component.type === "button") {
        // Auto-detect if we need light or dark text based on background color
        const bgColor = (finalStyles.backgroundColor as string) || themeSettings.primaryAccent;
        finalStyles.color = isLightColor(bgColor) ? themeSettings.primaryText : "#ffffff";
      } else {
        finalStyles.color = themeSettings.primaryText;
      }
    }

    // Apply consistent text sizes from theme when appropriate
    if (!finalStyles.fontSize) {
      if (component.type === "text") {
        // Text components retain their element-specific sizes
        // We don't override these as they come from the elementClasses
      } else if (component.type === "button") {
        finalStyles.fontSize = "1rem"; // Standard button text size
      }
    }

    // Apply box shadows from theme settings if applicable
    if (!finalStyles.boxShadow) {
      if (component.type === "card" && themeSettings.cardShadow) {
        finalStyles.boxShadow = themeSettings.cardShadow;
      } else if (component.type === "button" && themeSettings.buttonShadow) {
        finalStyles.boxShadow = themeSettings.buttonShadow;
      }
    }

    // Apply transitions for interactive elements
    if (component.type === "button" && !finalStyles.transition) {
      finalStyles.transition = "all 0.2s ease-in-out";
    }

    return finalStyles;
  };

  // Helper function to determine if a color is light or dark
  const isLightColor = (color: string): boolean => {
    // Default to false for non-hex colors or undefined
    if (!color || (!color.startsWith("#") && !color.startsWith("bg-"))) return false;

    // If it's a Tailwind class, we'll assume it's a light color for now
    // This could be improved by checking the actual color value from Tailwind's color palette
    if (color.startsWith("bg-")) return true;

    // Convert hex to RGB
    const hex = color.replace("#", "");
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);

    // Calculate relative luminance
    // Formula: 0.299*R + 0.587*G + 0.114*B
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Return true if light (luminance > 0.5)
    return luminance > 0.5;
  };

  // Use the styles directly with type assertion for React compatibility
  const componentStyles = getStyles() as React.CSSProperties;
  const combinedStyles = applyThemeStyles(componentStyles);

  // Get the component's Tailwind classes
  const getTailwindClasses = () => {
    const classes = [];

    // Add background color class if it's a Tailwind class
    const bgColor = componentStyles.backgroundColor || "";
    if (bgColor.startsWith("bg-")) {
      classes.push(bgColor);
    } else if (!componentStyles.backgroundColor) {
      // If no explicit background color is set, use theme settings
      if (component.type === "button" && themeSettings.primaryAccent.startsWith("bg-")) {
        classes.push(themeSettings.primaryAccent);
      } else if (component.type === "card" && themeSettings.primaryBackground.startsWith("bg-")) {
        classes.push(themeSettings.primaryBackground);
      } else if (component.type === "container" && themeSettings.secondaryBackground.startsWith("bg-")) {
        classes.push(themeSettings.secondaryBackground);
      }
    }

    // Add text color class if it's a Tailwind class
    const textColor = componentStyles.color || "";
    if (textColor.startsWith("text-")) {
      classes.push(textColor);
    } else if (!componentStyles.color) {
      // If no explicit text color is set, use theme settings
      if (themeSettings.primaryText.startsWith("text-")) {
        classes.push(themeSettings.primaryText);
      }
    }

    return classes.join(" ");
  };

  // Get the component's inline styles (excluding Tailwind classes)
  const getInlineStyles = () => {
    const styles = { ...combinedStyles };

    // Remove backgroundColor if it's a Tailwind class
    if (styles.backgroundColor?.startsWith("bg-")) {
      delete styles.backgroundColor;
    }

    // Remove color if it's a Tailwind class
    if (styles.color?.startsWith("text-")) {
      delete styles.color;
    }

    return styles;
  };

  // Render the component based on its type
  switch (component.type) {
    case "button":
      return (
        <div className="relative inline-block" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {SelectedBadge}
          {HoverLabel}
          <Button
            onClick={handleClick}
            className={cn(getTailwindClasses(), selectionClasses, hoverClasses)}
            style={getInlineStyles()}
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
            className={cn(
              elementClasses[Element as keyof typeof elementClasses],
              getTailwindClasses(),
              selectionClasses,
              hoverClasses
            )}
            style={getInlineStyles()}
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
          <Card
            onClick={handleClick}
            className={cn(getTailwindClasses(), selectionClasses, hoverClasses)}
            style={getInlineStyles()}
          >
            <CardContent className="py-4">{renderChildren()}</CardContent>
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
            className={cn("flex flex-col gap-4 w-full", getTailwindClasses(), selectionClasses, hoverClasses)}
            style={getInlineStyles()}
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
