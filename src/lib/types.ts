export type ComponentType = 'button' | 'text' | 'card' | 'container';

export interface ComponentStyle {
    backgroundColor?: string;
    color?: string;
    borderRadius?: string;
    padding?: string;
    margin?: string;
    marginBottom?: string;
    marginRight?: string;
    marginTop?: string;
    fontSize?: string;
    fontWeight?: string;
    width?: string;
    maxWidth?: string;
    height?: string;
    display?: string;
    flexDirection?: string;
    justifyContent?: string;
    alignItems?: string;
    alignSelf?: string;
    gap?: string;
    border?: string;
    boxShadow?: string;
    cursor?: string;
    lineHeight?: string;
    gridTemplateColumns?: string;
}

export interface ComponentProperties {
    text?: string;
    onClick?: string;
    content?: string;
    title?: string;
    variant?: string;
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