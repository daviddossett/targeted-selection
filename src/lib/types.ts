export type ComponentType = 'button' | 'text' | 'card' | 'container';

export interface ThemeSettings {
    primaryAccent: string;
    secondaryAccent: string;
    primaryBackground: string;
    secondaryBackground: string;
    primaryText: string;
    secondaryText: string;
    fontFamily: string;
    borderRadius: string;
    cardShadow: string;
    buttonShadow: string;
}

export interface ComponentStyle {
    backgroundColor?: string;
    color?: string;
    borderRadius?: string;
    padding?: string;
    paddingTop?: string;
    paddingRight?: string;
    paddingBottom?: string;
    paddingLeft?: string;
    margin?: string;
    marginTop?: string;
    marginRight?: string;
    marginBottom?: string;
    marginLeft?: string;
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