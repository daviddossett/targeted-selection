import { ThemeSettings } from './types';

export const defaultTheme: ThemeSettings = {
    primaryAccent: '#3b82f6', // Blue-500
    secondaryAccent: '#10b981', // Emerald-500
    primaryBackground: '#ffffff', // White
    secondaryBackground: '#f3f4f6', // Gray-100
    primaryText: '#111827', // Gray-900
    secondaryText: '#6b7280', // Gray-500
    fontFamily: 'Inter, system-ui, sans-serif',
    borderRadius: '0.375rem', // Default medium rounded corners
    cardShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    buttonShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
};

// Simplified accent color list with only 500 variants from each color family
export const commonAccentColors = [
    { value: '#3b82f6', label: 'Blue 500', category: 'accent', id: 'blue-500', tailwindClass: 'bg-blue-500' },
    { value: '#6366f1', label: 'Indigo 500', category: 'accent', id: 'indigo-500', tailwindClass: 'bg-indigo-500' },
    { value: '#8b5cf6', label: 'Purple 500', category: 'accent', id: 'purple-500', tailwindClass: 'bg-purple-500' },
    { value: '#ec4899', label: 'Pink 500', category: 'accent', id: 'pink-500', tailwindClass: 'bg-pink-500' },
    { value: '#ef4444', label: 'Red 500', category: 'accent', id: 'red-500', tailwindClass: 'bg-red-500' },
    { value: '#f97316', label: 'Orange 500', category: 'accent', id: 'orange-500', tailwindClass: 'bg-orange-500' },
    { value: '#eab308', label: 'Yellow 500', category: 'accent', id: 'yellow-500', tailwindClass: 'bg-yellow-500' },
    { value: '#22c55e', label: 'Green 500', category: 'accent', id: 'green-500', tailwindClass: 'bg-green-500' },
    { value: '#10b981', label: 'Emerald 500', category: 'accent', id: 'emerald-500', tailwindClass: 'bg-emerald-500' },
    { value: '#14b8a6', label: 'Teal 500', category: 'accent', id: 'teal-500', tailwindClass: 'bg-teal-500' },
];

export const fontOptions = [
    { value: 'Inter, system-ui, sans-serif', label: 'Inter (Modern)' },
    { value: 'ui-serif, Georgia, Cambria, Times New Roman, Times, serif', label: 'Serif (Traditional)' },
    { value: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace', label: 'Monospace (Code)' },
    { value: 'Helvetica, Arial, sans-serif', label: 'Helvetica (Classic)' },
    { value: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', label: 'System UI (Native)' },
];

export const borderRadiusOptions = [
    { value: '0', label: 'None - Square corners' },
    { value: '0.125rem', label: 'Extra Small - 2px' },
    { value: '0.25rem', label: 'Small - 4px' },
    { value: '0.375rem', label: 'Medium - 6px (Default)' },
    { value: '0.5rem', label: 'Large - 8px' },
    { value: '0.75rem', label: 'Extra Large - 12px' },
    { value: '1rem', label: 'XXL - 16px' },
    { value: '9999px', label: 'Full - Rounded' },
];

export const backgroundColorOptions = [
    // Neutral backgrounds
    { value: '#ffffff', label: 'White', category: 'background', id: 'white', tailwindClass: 'bg-white' },
    { value: '#f9fafb', label: 'Gray 50', category: 'background', id: 'gray-50', tailwindClass: 'bg-gray-50' },
    { value: '#f3f4f6', label: 'Gray 100', category: 'background', id: 'gray-100', tailwindClass: 'bg-gray-100' },
    { value: '#e5e7eb', label: 'Gray 200', category: 'background', id: 'gray-200', tailwindClass: 'bg-gray-200' },
    { value: '#d1d5db', label: 'Gray 300', category: 'background', id: 'gray-300', tailwindClass: 'bg-gray-300' },

    // Slate backgrounds
    { value: '#f8fafc', label: 'Slate 50', category: 'background', id: 'slate-50', tailwindClass: 'bg-slate-50' },
    { value: '#f1f5f9', label: 'Slate 100', category: 'background', id: 'slate-100', tailwindClass: 'bg-slate-100' },
    { value: '#e2e8f0', label: 'Slate 200', category: 'background', id: 'slate-200', tailwindClass: 'bg-slate-200' },
    { value: '#cbd5e1', label: 'Slate 300', category: 'background', id: 'slate-300', tailwindClass: 'bg-slate-300' },

    // Zinc backgrounds
    { value: '#fafafa', label: 'Zinc 50', category: 'background', id: 'zinc-50', tailwindClass: 'bg-zinc-50' },
    { value: '#f4f4f5', label: 'Zinc 100', category: 'background', id: 'zinc-100', tailwindClass: 'bg-zinc-100' },
    { value: '#e4e4e7', label: 'Zinc 200', category: 'background', id: 'zinc-200', tailwindClass: 'bg-zinc-200' },
    { value: '#d4d4d8', label: 'Zinc 300', category: 'background', id: 'zinc-300', tailwindClass: 'bg-zinc-300' },

    // Blue tinted backgrounds
    { value: '#eff6ff', label: 'Blue 50', category: 'background', id: 'blue-50', tailwindClass: 'bg-blue-50' },
    { value: '#dbeafe', label: 'Blue 100', category: 'background', id: 'blue-100-bg', tailwindClass: 'bg-blue-100' },

    // Green tinted backgrounds
    { value: '#f0fdf4', label: 'Green 50', category: 'background', id: 'green-50', tailwindClass: 'bg-green-50' },
    { value: '#dcfce7', label: 'Green 100', category: 'background', id: 'green-100-bg', tailwindClass: 'bg-green-100' },

    // Dark mode backgrounds
    { value: '#374151', label: 'Gray 700', category: 'background', id: 'gray-700', tailwindClass: 'bg-gray-700' },
    { value: '#1f2937', label: 'Gray 800', category: 'background', id: 'gray-800', tailwindClass: 'bg-gray-800' },
    { value: '#111827', label: 'Gray 900', category: 'background', id: 'gray-900', tailwindClass: 'bg-gray-900' },
    { value: '#18181b', label: 'Zinc 900', category: 'background', id: 'zinc-900', tailwindClass: 'bg-zinc-900' },
    { value: '#0f172a', label: 'Slate 900', category: 'background', id: 'slate-900', tailwindClass: 'bg-slate-900' },
];

export const textColorOptions = [
    // Text colors
    { value: '#000000', label: 'Black', category: 'text', id: 'black', tailwindClass: 'text-black' },
    { value: '#111827', label: 'Gray 900', category: 'text', id: 'gray-900-text', tailwindClass: 'text-gray-900' },
    { value: '#1f2937', label: 'Gray 800', category: 'text', id: 'gray-800-text', tailwindClass: 'text-gray-800' },
    { value: '#374151', label: 'Gray 700', category: 'text', id: 'gray-700-text', tailwindClass: 'text-gray-700' },
    { value: '#4b5563', label: 'Gray 600', category: 'text', id: 'gray-600', tailwindClass: 'text-gray-600' },
    { value: '#6b7280', label: 'Gray 500', category: 'text', id: 'gray-500', tailwindClass: 'text-gray-500' },

    // Slate text colors
    { value: '#0f172a', label: 'Slate 900', category: 'text', id: 'slate-900-text', tailwindClass: 'text-slate-900' },
    { value: '#1e293b', label: 'Slate 800', category: 'text', id: 'slate-800', tailwindClass: 'text-slate-800' },
    { value: '#334155', label: 'Slate 700', category: 'text', id: 'slate-700', tailwindClass: 'text-slate-700' },
    { value: '#475569', label: 'Slate 600', category: 'text', id: 'slate-600', tailwindClass: 'text-slate-600' },
    { value: '#64748b', label: 'Slate 500', category: 'text', id: 'slate-500', tailwindClass: 'text-slate-500' },

    // Blue tinted text
    { value: '#1e40af', label: 'Blue 800', category: 'text', id: 'blue-800', tailwindClass: 'text-blue-800' },
    { value: '#1e3a8a', label: 'Blue 900', category: 'text', id: 'blue-900', tailwindClass: 'text-blue-900' },

    // Green tinted text
    { value: '#166534', label: 'Green 800', category: 'text', id: 'green-800', tailwindClass: 'text-green-800' },
    { value: '#14532d', label: 'Green 900', category: 'text', id: 'green-900', tailwindClass: 'text-green-900' },

    // Light text colors (for dark backgrounds)
    { value: '#ffffff', label: 'White', category: 'text', id: 'white-text', tailwindClass: 'text-white' },
    { value: '#f9fafb', label: 'Gray 50', category: 'text', id: 'gray-50-text', tailwindClass: 'text-gray-50' },
    { value: '#f3f4f6', label: 'Gray 100', category: 'text', id: 'gray-100-text', tailwindClass: 'text-gray-100' },
    { value: '#e5e7eb', label: 'Gray 200', category: 'text', id: 'gray-200-text', tailwindClass: 'text-gray-200' },
    { value: '#d1d5db', label: 'Gray 300', category: 'text', id: 'gray-300-text', tailwindClass: 'text-gray-300' },
];