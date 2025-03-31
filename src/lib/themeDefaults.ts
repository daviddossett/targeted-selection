import { ThemeSettings } from './types';

export const defaultTheme: ThemeSettings = {
    primaryAccent: 'bg-blue-500',
    secondaryAccent: 'bg-emerald-500',
    primaryBackground: 'bg-white',
    secondaryBackground: 'bg-gray-100',
    primaryText: 'text-gray-900',
    secondaryText: 'text-gray-500',
    fontFamily: 'Inter, system-ui, sans-serif',
    borderRadius: '0.375rem', // Default medium rounded corners
    cardShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    buttonShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
};

// Curated accent colors for the main dropdown
export const commonAccentColors = [
    { value: 'bg-blue-500', label: 'bg-blue-500', category: 'accent', id: 'bg-blue-500' },
    { value: 'bg-indigo-500', label: 'bg-indigo-500', category: 'accent', id: 'bg-indigo-500' },
    { value: 'bg-purple-500', label: 'bg-purple-500', category: 'accent', id: 'bg-purple-500' },
    { value: 'bg-pink-500', label: 'bg-pink-500', category: 'accent', id: 'bg-pink-500' },
    { value: 'bg-red-500', label: 'bg-red-500', category: 'accent', id: 'bg-red-500' },
    { value: 'bg-orange-500', label: 'bg-orange-500', category: 'accent', id: 'bg-orange-500' },
    { value: 'bg-amber-500', label: 'bg-amber-500', category: 'accent', id: 'bg-amber-500' },
    { value: 'bg-yellow-500', label: 'bg-yellow-500', category: 'accent', id: 'bg-yellow-500' },
    { value: 'bg-lime-500', label: 'bg-lime-500', category: 'accent', id: 'bg-lime-500' },
    { value: 'bg-green-500', label: 'bg-green-500', category: 'accent', id: 'bg-green-500' },
    { value: 'bg-emerald-500', label: 'bg-emerald-500', category: 'accent', id: 'bg-emerald-500' },
    { value: 'bg-teal-500', label: 'bg-teal-500', category: 'accent', id: 'bg-teal-500' },
    { value: 'bg-cyan-500', label: 'bg-cyan-500', category: 'accent', id: 'bg-cyan-500' },
    { value: 'bg-sky-500', label: 'bg-sky-500', category: 'accent', id: 'bg-sky-500' },
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
    { value: 'bg-white', label: 'bg-white', category: 'background', id: 'bg-white' },
    { value: 'bg-gray-50', label: 'bg-gray-50', category: 'background', id: 'bg-gray-50' },
    { value: 'bg-gray-100', label: 'bg-gray-100', category: 'background', id: 'bg-gray-100' },
    { value: 'bg-gray-200', label: 'bg-gray-200', category: 'background', id: 'bg-gray-200' },
    { value: 'bg-gray-300', label: 'bg-gray-300', category: 'background', id: 'bg-gray-300' },

    // Slate backgrounds
    { value: 'bg-slate-50', label: 'bg-slate-50', category: 'background', id: 'bg-slate-50' },
    { value: 'bg-slate-100', label: 'bg-slate-100', category: 'background', id: 'bg-slate-100' },
    { value: 'bg-slate-200', label: 'bg-slate-200', category: 'background', id: 'bg-slate-200' },
    { value: 'bg-slate-300', label: 'bg-slate-300', category: 'background', id: 'bg-slate-300' },

    // Zinc backgrounds
    { value: 'bg-zinc-50', label: 'bg-zinc-50', category: 'background', id: 'bg-zinc-50' },
    { value: 'bg-zinc-100', label: 'bg-zinc-100', category: 'background', id: 'bg-zinc-100' },
    { value: 'bg-zinc-200', label: 'bg-zinc-200', category: 'background', id: 'bg-zinc-200' },
    { value: 'bg-zinc-300', label: 'bg-zinc-300', category: 'background', id: 'bg-zinc-300' },

    // Blue tinted backgrounds
    { value: 'bg-blue-50', label: 'bg-blue-50', category: 'background', id: 'bg-blue-50' },
    { value: 'bg-blue-100', label: 'bg-blue-100', category: 'background', id: 'bg-blue-100' },

    // Green tinted backgrounds
    { value: 'bg-green-50', label: 'bg-green-50', category: 'background', id: 'bg-green-50' },
    { value: 'bg-green-100', label: 'bg-green-100', category: 'background', id: 'bg-green-100' },

    // Dark mode backgrounds
    { value: 'bg-gray-700', label: 'bg-gray-700', category: 'background', id: 'bg-gray-700' },
    { value: 'bg-gray-800', label: 'bg-gray-800', category: 'background', id: 'bg-gray-800' },
    { value: 'bg-gray-900', label: 'bg-gray-900', category: 'background', id: 'bg-gray-900' },
    { value: 'bg-zinc-900', label: 'bg-zinc-900', category: 'background', id: 'bg-zinc-900' },
    { value: 'bg-slate-900', label: 'bg-slate-900', category: 'background', id: 'bg-slate-900' },
];

export const textColorOptions = [
    // Neutral text colors (most relevant for text)
    { value: 'text-black', label: 'text-black', category: 'text', id: 'text-black' },
    { value: 'text-gray-950', label: 'text-gray-950', category: 'text', id: 'text-gray-950' },
    { value: 'text-gray-900', label: 'text-gray-900', category: 'text', id: 'text-gray-900' },
    { value: 'text-gray-800', label: 'text-gray-800', category: 'text', id: 'text-gray-800' },
    { value: 'text-gray-700', label: 'text-gray-700', category: 'text', id: 'text-gray-700' },
    { value: 'text-gray-600', label: 'text-gray-600', category: 'text', id: 'text-gray-600' },
    { value: 'text-gray-500', label: 'text-gray-500', category: 'text', id: 'text-gray-500' },
    { value: 'text-gray-400', label: 'text-gray-400', category: 'text', id: 'text-gray-400' },

    // Slate variants (popular for text)
    { value: 'text-slate-900', label: 'text-slate-900', category: 'text', id: 'text-slate-900' },
    { value: 'text-slate-800', label: 'text-slate-800', category: 'text', id: 'text-slate-800' },
    { value: 'text-slate-700', label: 'text-slate-700', category: 'text', id: 'text-slate-700' },
    { value: 'text-slate-600', label: 'text-slate-600', category: 'text', id: 'text-slate-600' },
    { value: 'text-slate-500', label: 'text-slate-500', category: 'text', id: 'text-slate-500' },

    // Zinc variants (neutral gray)
    { value: 'text-zinc-900', label: 'text-zinc-900', category: 'text', id: 'text-zinc-900' },
    { value: 'text-zinc-800', label: 'text-zinc-800', category: 'text', id: 'text-zinc-800' },
    { value: 'text-zinc-700', label: 'text-zinc-700', category: 'text', id: 'text-zinc-700' },
    { value: 'text-zinc-600', label: 'text-zinc-600', category: 'text', id: 'text-zinc-600' },
    { value: 'text-zinc-500', label: 'text-zinc-500', category: 'text', id: 'text-zinc-500' },

    // Light text colors for dark backgrounds
    { value: 'text-white', label: 'text-white', category: 'text', id: 'text-white' },
    { value: 'text-gray-100', label: 'text-gray-100', category: 'text', id: 'text-gray-100' },
    { value: 'text-gray-200', label: 'text-gray-200', category: 'text', id: 'text-gray-200' },
    { value: 'text-gray-300', label: 'text-gray-300', category: 'text', id: 'text-gray-300' },
];