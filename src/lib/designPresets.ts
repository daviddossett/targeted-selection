// Design system presets for the application

// Color palette
export const colorOptions = {
    gray: {
        50: '#f9fafb',
        100: '#f3f4f6',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
        900: '#111827',
    },
    red: {
        50: '#fef2f2',
        100: '#fee2e2',
        200: '#fecaca',
        300: '#fca5a5',
        400: '#f87171',
        500: '#ef4444',
        600: '#dc2626',
        700: '#b91c1c',
        800: '#991b1b',
        900: '#7f1d1d',
    },
    blue: {
        50: '#eff6ff',
        100: '#dbeafe',
        200: '#bfdbfe',
        300: '#93c5fd',
        400: '#60a5fa',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
        800: '#1e40af',
        900: '#1e3a8a',
    },
    green: {
        50: '#f0fdf4',
        100: '#dcfce7',
        200: '#bbf7d0',
        300: '#86efac',
        400: '#4ade80',
        500: '#22c55e',
        600: '#16a34a',
        700: '#15803d',
        800: '#166534',
        900: '#14532d',
    },
    purple: {
        50: '#faf5ff',
        100: '#f3e8ff',
        200: '#e9d5ff',
        300: '#d8b4fe',
        400: '#c084fc',
        500: '#a855f7',
        600: '#9333ea',
        700: '#7e22ce',
        800: '#6b21a8',
        900: '#581c87',
    },
    yellow: {
        50: '#fefce8',
        100: '#fef9c3',
        200: '#fef08a',
        300: '#fde047',
        400: '#facc15',
        500: '#eab308',
        600: '#ca8a04',
        700: '#a16207',
        800: '#854d0e',
        900: '#713f12',
    },
};

// Element type options
export const elementTypeOptions = [
    { value: 'p', label: 'Paragraph' },
    { value: 'h1', label: 'Heading 1' },
    { value: 'h2', label: 'Heading 2' },
    { value: 'h3', label: 'Heading 3' },
    { value: 'h4', label: 'Heading 4' },
    { value: 'span', label: 'Span' },
    { value: 'blockquote', label: 'Blockquote' },
    { value: 'pre', label: 'Preformatted' },
    { value: 'div', label: 'Division' },
];

// Font size options
export const fontSizeOptions = [
    { value: '0.75rem', label: 'XS - 0.75rem' },
    { value: '0.875rem', label: 'SM - 0.875rem' },
    { value: '1rem', label: 'Base - 1rem' },
    { value: '1.125rem', label: 'LG - 1.125rem' },
    { value: '1.25rem', label: 'XL - 1.25rem' },
    { value: '1.5rem', label: '2XL - 1.5rem' },
    { value: '1.875rem', label: '3XL - 1.875rem' },
    { value: '2.25rem', label: '4XL - 2.25rem' },
    { value: '3rem', label: '5XL - 3rem' },
    { value: '3.75rem', label: '6XL - 3.75rem' },
];

// Font weight options
export const fontWeightOptions = [
    { value: '100', label: 'Thin - 100' },
    { value: '200', label: 'Extra Light - 200' },
    { value: '300', label: 'Light - 300' },
    { value: '400', label: 'Regular - 400' },
    { value: '500', label: 'Medium - 500' },
    { value: '600', label: 'Semi Bold - 600' },
    { value: '700', label: 'Bold - 700' },
    { value: '800', label: 'Extra Bold - 800' },
    { value: '900', label: 'Black - 900' },
];

// Border radius options
export const borderRadiusOptions = [
    { value: '0', label: 'None - 0px' },
    { value: '0.125rem', label: 'XS - 2px' },
    { value: '0.25rem', label: 'SM - 4px' },
    { value: '0.375rem', label: 'MD - 6px' },
    { value: '0.5rem', label: 'LG - 8px' },
    { value: '0.75rem', label: 'XL - 12px' },
    { value: '1rem', label: '2XL - 16px' },
    { value: '1.5rem', label: '3XL - 24px' },
    { value: '9999px', label: 'Full - Rounded' },
];

// Box shadow options
export const boxShadowOptions = [
    { value: 'none', label: 'None' },
    { value: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', label: 'XS - Extra Small' },
    { value: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)', label: 'SM - Small' },
    { value: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', label: 'MD - Medium' },
    { value: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', label: 'LG - Large' },
    { value: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', label: 'XL - Extra Large' },
    { value: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', label: '2XL - Double Extra Large' },
    { value: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)', label: 'Inner - Inset' },
];

// Selected colors from the Tailwind palette for component-level colors
export const flatColorOptions = [
    // Primary options
    { value: '#3b82f6', label: 'Blue 500', id: 'flat-blue-500', tailwindClass: 'bg-blue-500' },
    { value: '#2563eb', label: 'Blue 600', id: 'flat-blue-600', tailwindClass: 'bg-blue-600' },
    { value: '#1d4ed8', label: 'Blue 700', id: 'flat-blue-700', tailwindClass: 'bg-blue-700' },
    { value: '#6366f1', label: 'Indigo 500', id: 'flat-indigo-500', tailwindClass: 'bg-indigo-500' },
    { value: '#4f46e5', label: 'Indigo 600', id: 'flat-indigo-600', tailwindClass: 'bg-indigo-600' },
    { value: '#8b5cf6', label: 'Violet 500', id: 'flat-violet-500', tailwindClass: 'bg-violet-500' },

    // Secondary options
    { value: '#10b981', label: 'Emerald 500', id: 'flat-emerald-500', tailwindClass: 'bg-emerald-500' },
    { value: '#059669', label: 'Emerald 600', id: 'flat-emerald-600', tailwindClass: 'bg-emerald-600' },
    { value: '#f59e0b', label: 'Amber 500', id: 'flat-amber-500', tailwindClass: 'bg-amber-500' },
    { value: '#ef4444', label: 'Red 500', id: 'flat-red-500', tailwindClass: 'bg-red-500' },
    { value: '#ec4899', label: 'Pink 500', id: 'flat-pink-500', tailwindClass: 'bg-pink-500' },

    // Neutrals
    { value: '#ffffff', label: 'White', id: 'flat-white', tailwindClass: 'bg-white' },
    { value: '#f9fafb', label: 'Gray 50', id: 'flat-gray-50', tailwindClass: 'bg-gray-50' },
    { value: '#f3f4f6', label: 'Gray 100', id: 'flat-gray-100', tailwindClass: 'bg-gray-100' },
    { value: '#e5e7eb', label: 'Gray 200', id: 'flat-gray-200', tailwindClass: 'bg-gray-200' },
    { value: '#6b7280', label: 'Gray 500', id: 'flat-gray-500', tailwindClass: 'bg-gray-500' },
    { value: '#1f2937', label: 'Gray 800', id: 'flat-gray-800', tailwindClass: 'bg-gray-800' },
    { value: '#111827', label: 'Gray 900', id: 'flat-gray-900', tailwindClass: 'bg-gray-900' },
    { value: '#000000', label: 'Black', id: 'flat-black', tailwindClass: 'bg-black' },
];

// Spacing options for padding, margin, and gap
export const spacingOptions = [
    { value: '0', label: '0 - None' },
    { value: '0.25rem', label: '1 - 0.25rem (4px)' },
    { value: '0.5rem', label: '2 - 0.5rem (8px)' },
    { value: '0.75rem', label: '3 - 0.75rem (12px)' },
    { value: '1rem', label: '4 - 1rem (16px)' },
    { value: '1.25rem', label: '5 - 1.25rem (20px)' },
    { value: '1.5rem', label: '6 - 1.5rem (24px)' },
    { value: '1.75rem', label: '7 - 1.75rem (28px)' },
    { value: '2rem', label: '8 - 2rem (32px)' },
    { value: '2.5rem', label: '10 - 2.5rem (40px)' },
    { value: '3rem', label: '12 - 3rem (48px)' },
    { value: '4rem', label: '16 - 4rem (64px)' },
    { value: '5rem', label: '20 - 5rem (80px)' },
    { value: 'auto', label: 'Auto' },
];