import { AppDefinition } from './types';

export const defaultAppTemplate: AppDefinition = {
    components: [
        {
            id: 'button',
            type: 'button',
            label: 'Button',
            defaultStyles: {
                backgroundColor: '#3b82f6',
                color: '#ffffff',
                borderRadius: '0.25rem',
                padding: '0.5rem 1rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                border: 'none',
                cursor: 'pointer',
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
                color: '#000000',
                fontSize: '1rem',
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
                backgroundColor: '#ffffff',
                borderRadius: '0.5rem',
                padding: '1.5rem',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                width: '100%',
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
                gap: '1rem',
                padding: '1rem',
                width: '100%',
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
                title: 'Root Container',
            },
            children: [
                {
                    id: 'card1',
                    componentId: 'card',
                    parentId: 'root',
                    properties: {
                        title: 'Welcome to App Builder',
                    },
                    children: [
                        {
                            id: 'text1',
                            componentId: 'text',
                            parentId: 'card1',
                            properties: {
                                content: 'This is a sample app that you can customize.',
                                element: 'p',
                            },
                        },
                        {
                            id: 'button1',
                            componentId: 'button',
                            parentId: 'card1',
                            properties: {
                                text: 'Click me',
                                onClick: 'alert("Hello world!")',
                            },
                        },
                    ],
                },
                {
                    id: 'card2',
                    componentId: 'card',
                    parentId: 'root',
                    properties: {
                        title: 'Another Card',
                    },
                    children: [
                        {
                            id: 'text2',
                            componentId: 'text',
                            parentId: 'card2',
                            properties: {
                                content: 'You can edit both components and instances.',
                                element: 'p',
                            },
                        },
                        {
                            id: 'button2',
                            componentId: 'button',
                            parentId: 'card2',
                            instanceStyles: {
                                backgroundColor: '#10b981',
                                borderRadius: '9999px',
                            },
                            properties: {
                                text: 'Custom Button',
                                onClick: 'alert("This is a custom button")',
                            },
                        },
                    ],
                },
            ],
        },
    ],
};