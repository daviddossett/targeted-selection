import { AppDefinition } from './types';

export const defaultAppTemplate: AppDefinition = {
    components: [
        {
            id: 'button',
            type: 'button',
            label: 'Button',
            defaultStyles: {
                borderRadius: '0.375rem',
                padding: '0.5rem 1rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
            },
            properties: {
                text: 'Button',
                onClick: 'alert("Button clicked")',
                variant: 'primary',
            },
        },
        {
            id: 'text',
            type: 'text',
            label: 'Text',
            defaultStyles: {
                color: 'hsl(var(--foreground))',
                fontSize: '1rem',
                margin: '0',
                lineHeight: '1.5',
            },
            properties: {
                content: 'Text content',
                element: 'p',
            },
        },
        {
            id: 'heading',
            type: 'text',
            label: 'Heading',
            defaultStyles: {
                color: 'hsl(var(--foreground))',
                fontSize: '1.5rem',
                fontWeight: '600',
                margin: '0 0 0.75rem 0',
                lineHeight: '1.2',
            },
            properties: {
                content: 'Card Heading',
                element: 'h2',
            },
        },
        {
            id: 'image',
            type: 'container',
            label: 'Image',
            defaultStyles: {
                backgroundColor: '#f3f4f6',
                borderRadius: '0.375rem',
                width: '100%',
                height: '150px',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            },
            properties: {
                title: 'Image Placeholder',
            },
        },
        {
            id: 'card',
            type: 'card',
            label: 'Card',
            defaultStyles: {
                backgroundColor: 'white',
                borderRadius: '0.5rem',
                padding: '1.5rem',
                width: '100%',
                border: '1px solid #e5e7eb',
                boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
            },
            properties: {
                title: '',
            },
        },
        {
            id: 'grid',
            type: 'container',
            label: 'Grid',
            defaultStyles: {
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1.5rem',
                width: '100%',
                maxWidth: '900px',
                margin: '0 auto',
            },
            properties: {
                title: '',
            },
        },
    ],
    instances: [
        {
            id: 'main-grid',
            componentId: 'grid',
            properties: {
                title: '',
            },
            children: [
                // Card 1
                {
                    id: 'card-1',
                    componentId: 'card',
                    parentId: 'main-grid',
                    properties: {
                        title: '',
                    },
                    children: [
                        {
                            id: 'image-1',
                            componentId: 'image',
                            parentId: 'card-1',
                            properties: {
                                title: 'Image 1',
                            },
                            instanceStyles: {
                                backgroundColor: '#e0f2fe',
                            },
                        },
                        {
                            id: 'heading-1',
                            componentId: 'heading',
                            parentId: 'card-1',
                            properties: {
                                content: 'Product Feature',
                                element: 'h2',
                            },
                        },
                        {
                            id: 'description-1',
                            componentId: 'text',
                            parentId: 'card-1',
                            properties: {
                                content: 'This is a description of the first card. It provides details about the features and benefits.',
                                element: 'p',
                            },
                            instanceStyles: {
                                marginBottom: '1.5rem',
                            },
                        },
                        {
                            id: 'button-primary-1',
                            componentId: 'button',
                            parentId: 'card-1',
                            properties: {
                                text: 'Learn More',
                                onClick: 'alert("Learn more clicked!")',
                                variant: 'primary',
                            },
                            instanceStyles: {
                                marginRight: '0.5rem',
                            },
                        },
                        {
                            id: 'button-secondary-1',
                            componentId: 'button',
                            parentId: 'card-1',
                            properties: {
                                text: 'Dismiss',
                                onClick: 'alert("Dismissed!")',
                                variant: 'secondary',
                            },
                        },
                    ],
                },

                // Card 2
                {
                    id: 'card-2',
                    componentId: 'card',
                    parentId: 'main-grid',
                    properties: {
                        title: '',
                    },
                    children: [
                        {
                            id: 'image-2',
                            componentId: 'image',
                            parentId: 'card-2',
                            properties: {
                                title: 'Image 2',
                            },
                            instanceStyles: {
                                backgroundColor: '#fef3c7',
                            },
                        },
                        {
                            id: 'heading-2',
                            componentId: 'heading',
                            parentId: 'card-2',
                            properties: {
                                content: 'User Experience',
                                element: 'h2',
                            },
                        },
                        {
                            id: 'description-2',
                            componentId: 'text',
                            parentId: 'card-2',
                            properties: {
                                content: 'The second card explains how our product enhances the user experience and creates engagement.',
                                element: 'p',
                            },
                            instanceStyles: {
                                marginBottom: '1.5rem',
                            },
                        },
                        {
                            id: 'button-primary-2',
                            componentId: 'button',
                            parentId: 'card-2',
                            properties: {
                                text: 'Get Started',
                                onClick: 'alert("Getting started!")',
                                variant: 'primary',
                            },
                            instanceStyles: {
                                marginRight: '0.5rem',
                            },
                        },
                        {
                            id: 'button-secondary-2',
                            componentId: 'button',
                            parentId: 'card-2',
                            properties: {
                                text: 'Learn More',
                                onClick: 'alert("Learn more clicked!")',
                                variant: 'secondary',
                            },
                        },
                    ],
                },

                // Card 3
                {
                    id: 'card-3',
                    componentId: 'card',
                    parentId: 'main-grid',
                    properties: {
                        title: '',
                    },
                    children: [
                        {
                            id: 'image-3',
                            componentId: 'image',
                            parentId: 'card-3',
                            properties: {
                                title: 'Image 3',
                            },
                            instanceStyles: {
                                backgroundColor: '#dcfce7',
                            },
                        },
                        {
                            id: 'heading-3',
                            componentId: 'heading',
                            parentId: 'card-3',
                            properties: {
                                content: 'Performance',
                                element: 'h2',
                            },
                        },
                        {
                            id: 'description-3',
                            componentId: 'text',
                            parentId: 'card-3',
                            properties: {
                                content: 'The third card highlights the performance metrics and efficiency improvements of our solution.',
                                element: 'p',
                            },
                            instanceStyles: {
                                marginBottom: '1.5rem',
                            },
                        },
                        {
                            id: 'button-primary-3',
                            componentId: 'button',
                            parentId: 'card-3',
                            properties: {
                                text: 'View Demo',
                                onClick: 'alert("Demo viewed!")',
                                variant: 'primary',
                            },
                            instanceStyles: {
                                marginRight: '0.5rem',
                            },
                        },
                        {
                            id: 'button-secondary-3',
                            componentId: 'button',
                            parentId: 'card-3',
                            properties: {
                                text: 'Documentation',
                                onClick: 'alert("Documentation clicked!")',
                                variant: 'secondary',
                            },
                        },
                    ],
                },

                // Card 4
                {
                    id: 'card-4',
                    componentId: 'card',
                    parentId: 'main-grid',
                    properties: {
                        title: '',
                    },
                    children: [
                        {
                            id: 'image-4',
                            componentId: 'image',
                            parentId: 'card-4',
                            properties: {
                                title: 'Image 4',
                            },
                            instanceStyles: {
                                backgroundColor: '#ddd6fe',
                            },
                        },
                        {
                            id: 'heading-4',
                            componentId: 'heading',
                            parentId: 'card-4',
                            properties: {
                                content: 'Integration',
                                element: 'h2',
                            },
                        },
                        {
                            id: 'description-4',
                            componentId: 'text',
                            parentId: 'card-4',
                            properties: {
                                content: 'The fourth card shows how our product integrates with existing workflows and systems.',
                                element: 'p',
                            },
                            instanceStyles: {
                                marginBottom: '1.5rem',
                            },
                        },
                        {
                            id: 'button-primary-4',
                            componentId: 'button',
                            parentId: 'card-4',
                            properties: {
                                text: 'Connect',
                                onClick: 'alert("Connect clicked!")',
                                variant: 'primary',
                            },
                            instanceStyles: {
                                marginRight: '0.5rem',
                            },
                        },
                        {
                            id: 'button-secondary-4',
                            componentId: 'button',
                            parentId: 'card-4',
                            properties: {
                                text: 'API Docs',
                                onClick: 'alert("API Docs clicked!")',
                                variant: 'secondary',
                            },
                        },
                    ],
                },
            ],
        },
    ],
};