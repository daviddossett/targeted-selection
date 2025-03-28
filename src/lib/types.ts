export type ComponentType = 'button' | 'text' | 'card' | 'container';

export interface ComponentStyle {
    backgroundColor?: string;
    color?: string;
    borderRadius?: string;
    padding?: string;
    margin?: string;
    fontSize?: string;
    fontWeight?: string;
    width?: string;
    height?: string;
    display?: string;
    flexDirection?: string;
    justifyContent?: string;
    alignItems?: string;
    gap?: string;
    border?: string;
    boxShadow?: string;
    cursor?: string;
}

export interface ComponentProperties {
    text?: string;
    onClick?: string;
    content?: string;
    element?: string;
    title?: string;
}

export interface ComponentDefinition {
    id: string;
    type: ComponentType;
    label: string;
    defaultStyles: ComponentStyle;
    properties: ComponentProperties;
}

export interface ComponentInstance {
    id: string;
    componentId: string;
    instanceStyles?: ComponentStyle;
    properties: ComponentProperties;
    children?: ComponentInstance[];
    parentId?: string;
}

export interface AppDefinition {
    components: ComponentDefinition[];
    instances: ComponentInstance[];
}