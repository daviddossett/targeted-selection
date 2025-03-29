import { AppDefinition } from './types';

export const defaultAppTemplate: AppDefinition = {
    components: [
        {
            id: 'button',
            type: 'button',
            label: 'Button',
            defaultStyles: {
                backgroundColor: 'hsl(var(--primary))',
                color: 'hsl(var(--primary-foreground))',
                borderRadius: 'var(--radius)',
                padding: 'var(--button-padding)',
                fontSize: 'var(--font-size-sm)',
                fontWeight: '500',
                border: 'none',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-sm)',
            },
            properties: {
                text: 'Click me',
                onClick: 'alert("Button clicked")',
            },
        },
        {
            id: 'text',
            type: 'text',
            label: 'Text',
            defaultStyles: {
                color: 'hsl(var(--foreground))',
                fontSize: 'var(--font-size-base)',
                lineHeight: 'var(--line-height-base)',
                margin: '0',
            },
            properties: {
                content: 'Text content',
                element: 'p',
            },
        },
        {
            id: 'card',
            type: 'card',
            label: 'Card',
            defaultStyles: {
                backgroundColor: 'hsl(var(--card))',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--spacing-6)',
                boxShadow: 'var(--shadow-md)',
                width: '100%',
                border: '1px solid hsl(var(--border))',
            },
            properties: {
                title: 'Card Title',
            },
        },
        {
            id: 'container',
            type: 'container',
            label: 'Container',
            defaultStyles: {
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--spacing-4)',
                padding: 'var(--spacing-4)',
                width: '100%',
                backgroundColor: 'hsl(var(--background))',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid hsl(var(--border))',
            },
            properties: {
                title: '',
            },
        },
    ],
    instances: [
        {
            id: 'root',
            componentId: 'container',
            properties: {
                title: 'Registration Form',
            },
            instanceStyles: {
                padding: 'var(--spacing-4)',
                maxWidth: '500px',
                margin: '0 auto',
            },
            children: [
                {
                    id: 'header-section',
                    componentId: 'container',
                    parentId: 'root',
                    properties: {
                        title: 'Header',
                    },
                    instanceStyles: {
                        padding: 'var(--spacing-4)',
                        backgroundColor: 'hsl(var(--muted))',
                        borderRadius: 'var(--radius-xl)',
                        marginBottom: 'var(--spacing-6)',
                    },
                    children: [
                        {
                            id: 'header-text',
                            componentId: 'text',
                            parentId: 'header-section',
                            properties: {
                                content: 'Create your account',
                                element: 'h1',
                            },
                            instanceStyles: {
                                fontSize: 'var(--font-size-2xl)',
                                fontWeight: '700',
                                marginBottom: 'var(--spacing-2)',
                            },
                        },
                        {
                            id: 'subheader-text',
                            componentId: 'text',
                            parentId: 'header-section',
                            properties: {
                                content: 'Fill in your details to get started',
                                element: 'p',
                            },
                            instanceStyles: {
                                fontSize: 'var(--font-size-lg)',
                                color: 'hsl(var(--muted-foreground))',
                            },
                        },
                    ],
                },
                {
                    id: 'form-section',
                    componentId: 'card',
                    parentId: 'root',
                    properties: {
                        title: 'Registration Form',
                    },
                    instanceStyles: {
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'var(--spacing-4)',
                    },
                    children: [
                        {
                            id: 'name-field',
                            componentId: 'container',
                            parentId: 'form-section',
                            properties: {
                                title: 'Name Field',
                            },
                            instanceStyles: {
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 'var(--spacing-2)',
                                padding: '0',
                                border: 'none',
                                backgroundColor: 'transparent',
                            },
                            children: [
                                {
                                    id: 'name-label',
                                    componentId: 'text',
                                    parentId: 'name-field',
                                    properties: {
                                        content: 'Full Name',
                                        element: 'label',
                                    },
                                    instanceStyles: {
                                        fontWeight: '500',
                                        fontSize: 'var(--font-size-sm)',
                                    },
                                },
                                {
                                    id: 'name-input',
                                    componentId: 'container',
                                    parentId: 'name-field',
                                    properties: {
                                        title: 'Name Input',
                                    },
                                    instanceStyles: {
                                        height: '40px',
                                        padding: '0 12px',
                                        border: '1px solid hsl(var(--border))',
                                        borderRadius: 'var(--radius)',
                                        backgroundColor: 'hsl(var(--background))',
                                    },
                                },
                            ],
                        },
                        {
                            id: 'description-field',
                            componentId: 'container',
                            parentId: 'form-section',
                            properties: {
                                title: 'Description Field',
                            },
                            instanceStyles: {
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 'var(--spacing-2)',
                                padding: '0',
                                border: 'none',
                                backgroundColor: 'transparent',
                            },
                            children: [
                                {
                                    id: 'description-label',
                                    componentId: 'text',
                                    parentId: 'description-field',
                                    properties: {
                                        content: 'Description',
                                        element: 'label',
                                    },
                                    instanceStyles: {
                                        fontWeight: '500',
                                        fontSize: 'var(--font-size-sm)',
                                    },
                                },
                                {
                                    id: 'description-input',
                                    componentId: 'container',
                                    parentId: 'description-field',
                                    properties: {
                                        title: 'Description Input',
                                    },
                                    instanceStyles: {
                                        height: '100px',
                                        padding: '12px',
                                        border: '1px solid hsl(var(--border))',
                                        borderRadius: 'var(--radius)',
                                        backgroundColor: 'hsl(var(--background))',
                                    },
                                },
                            ],
                        },
                        {
                            id: 'company-field',
                            componentId: 'container',
                            parentId: 'form-section',
                            properties: {
                                title: 'Company Field',
                            },
                            instanceStyles: {
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 'var(--spacing-2)',
                                padding: '0',
                                border: 'none',
                                backgroundColor: 'transparent',
                            },
                            children: [
                                {
                                    id: 'company-label',
                                    componentId: 'text',
                                    parentId: 'company-field',
                                    properties: {
                                        content: 'Company',
                                        element: 'label',
                                    },
                                    instanceStyles: {
                                        fontWeight: '500',
                                        fontSize: 'var(--font-size-sm)',
                                    },
                                },
                                {
                                    id: 'company-input',
                                    componentId: 'container',
                                    parentId: 'company-field',
                                    properties: {
                                        title: 'Company Input',
                                    },
                                    instanceStyles: {
                                        height: '40px',
                                        padding: '0 12px',
                                        border: '1px solid hsl(var(--border))',
                                        borderRadius: 'var(--radius)',
                                        backgroundColor: 'hsl(var(--background))',
                                    },
                                },
                            ],
                        },
                        {
                            id: 'submit-button',
                            componentId: 'button',
                            parentId: 'form-section',
                            properties: {
                                text: 'Register Now',
                                onClick: 'alert("Form submitted!")',
                            },
                            instanceStyles: {
                                margin: 'var(--spacing-4) 0 0 0',
                                width: '100%',
                            },
                        },
                    ],
                },
            ],
        },
    ],
};