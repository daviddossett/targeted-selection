import { AppDefinition } from './types';
import { defaultTheme } from './themeDefaults';

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
                backgroundColor: defaultTheme.primaryAccent,
                color: 'text-white',
            },
            properties: {
                text: 'Button',
                onClick: 'alert("Button clicked")',
            },
        },
        {
            id: 'text',
            type: 'text',
            label: 'Text',
            defaultStyles: {
                fontSize: '1rem',
                margin: '0',
                lineHeight: '1.5',
                color: defaultTheme.primaryText,
            },
            properties: {
                content: 'Text content',
            },
        },
        {
            id: 'heading',
            type: 'text',
            label: 'Heading',
            defaultStyles: {
                fontSize: '1.5rem',
                fontWeight: '600',
                margin: '0 0 0.75rem 0',
                lineHeight: '1.2',
                color: defaultTheme.primaryText,
            },
            properties: {
                content: 'Card Heading',
            },
        },
        {
            id: 'image',
            type: 'container',
            label: 'Image',
            defaultStyles: {
                borderRadius: '0.375rem',
                width: '100%',
                height: '150px',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: defaultTheme.secondaryBackground,
            },
            properties: {
                imageSrc: 'https://images.unsplash.com/photo-1533240332313-0db49b459ad6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                imageAlt: 'Default image',
            },
        },
        {
            id: 'card',
            type: 'card',
            label: 'Card',
            defaultStyles: {
                borderRadius: '0.5rem',
                padding: '1.5rem',
                width: '100%',
                border: '1px solid #e5e7eb',
                backgroundColor: defaultTheme.primaryBackground,
            },
            properties: {},
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
                    properties: {},
                    children: [
                        {
                            id: 'image-1',
                            componentId: 'image',
                            parentId: 'card-1',
                            properties: {
                                title: 'Image 1',
                                imageSrc: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                                imageAlt: 'Gravel cyclist on mountain trail',
                            },
                        },
                        {
                            id: 'heading-1',
                            componentId: 'heading',
                            parentId: 'card-1',
                            properties: {
                                content: 'About the Event',
                            },
                        },
                        {
                            id: 'description-1',
                            componentId: 'text',
                            parentId: 'card-1',
                            properties: {
                                content: 'Join us for an epic 75-mile gravel adventure through the stunning Cascade Mountains. Experience breathtaking views, challenging terrain, and the best gravel Washington has to offer.',
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
                                text: 'Register Now',
                                onClick: 'alert("Registration clicked!")',
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
                                text: 'View Route',
                                onClick: 'alert("Route details clicked!")',
                            },
                        },
                    ],
                },

                // Card 2
                {
                    id: 'card-2',
                    componentId: 'card',
                    parentId: 'main-grid',
                    properties: {},
                    children: [
                        {
                            id: 'image-2',
                            componentId: 'image',
                            parentId: 'card-2',
                            properties: {
                                title: 'Image 2',
                                imageSrc: 'https://images.unsplash.com/photo-1576698483491-8c43f0862543?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                                imageAlt: 'Elevation chart and trail map',
                            },
                        },
                        {
                            id: 'heading-2',
                            componentId: 'heading',
                            parentId: 'card-2',
                            properties: {
                                content: 'Course Highlights',
                            },
                        },
                        {
                            id: 'description-2',
                            componentId: 'text',
                            parentId: 'card-2',
                            properties: {
                                content: 'Our carefully curated route features forest service roads, moderate climbs, and fast descents. With 6,500 feet of elevation gain and stunning views of Mt. Rainier, this ride offers the ultimate PNW gravel experience.',
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
                                text: 'View Elevation Profile',
                                onClick: 'alert("Elevation profile clicked!")',
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
                                text: 'Download GPX',
                                onClick: 'alert("GPX download clicked!")',
                            },
                        },
                    ],
                },

                // Card 3
                {
                    id: 'card-3',
                    componentId: 'card',
                    parentId: 'main-grid',
                    properties: {},
                    children: [
                        {
                            id: 'image-3',
                            componentId: 'image',
                            parentId: 'card-3',
                            properties: {
                                title: 'Image 3',
                                imageSrc: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                                imageAlt: 'Cyclists at an aid station',
                            },
                        },
                        {
                            id: 'heading-3',
                            componentId: 'heading',
                            parentId: 'card-3',
                            properties: {
                                content: 'Rider Support',
                            },
                        },
                        {
                            id: 'description-3',
                            componentId: 'text',
                            parentId: 'card-3',
                            properties: {
                                content: 'We provide full rider support with three well-stocked aid stations, mechanical assistance, and medical support. Post-ride, enjoy local craft beer, wood-fired pizza, and live music at our festival finish area.',
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
                                text: 'Aid Station Info',
                                onClick: 'alert("Aid stations clicked!")',
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
                                text: 'Festival Details',
                                onClick: 'alert("Festival info clicked!")',
                            },
                        },
                    ],
                },

                // Card 4
                {
                    id: 'card-4',
                    componentId: 'card',
                    parentId: 'main-grid',
                    properties: {},
                    children: [
                        {
                            id: 'image-4',
                            componentId: 'image',
                            parentId: 'card-4',
                            properties: {
                                title: 'Image 4',
                                imageSrc: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                                imageAlt: 'Scenic view of Leavenworth, WA',
                            },
                        },
                        {
                            id: 'heading-4',
                            componentId: 'heading',
                            parentId: 'card-4',
                            properties: {
                                content: 'Logistics & Lodging',
                            },
                        },
                        {
                            id: 'description-4',
                            componentId: 'text',
                            parentId: 'card-4',
                            properties: {
                                content: 'Based in the charming town of Leavenworth, WA. We\'ve secured discounted rates at partner hotels and campgrounds. Free parking is available at the start/finish area, with shuttle service from downtown.',
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
                                text: 'Book Lodging',
                                onClick: 'alert("Lodging options clicked!")',
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
                                text: 'Travel Info',
                                onClick: 'alert("Travel info clicked!")',
                            },
                        },
                    ],
                },
            ],
        },
    ],
};