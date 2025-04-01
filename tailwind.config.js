/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    safelist: [
        // Gray scales
        ...['slate', 'gray', 'zinc', 'neutral', 'stone'].flatMap(color => 
            [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map(shade => `bg-${color}-${shade}`)
        ),
        // Standard colors
        ...['red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky',
           'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose'].flatMap(color => 
            [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map(shade => `bg-${color}-${shade}`)
        ),
        // Text colors - Gray scales
        ...['slate', 'gray', 'zinc', 'neutral', 'stone'].flatMap(color => 
            [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map(shade => `text-${color}-${shade}`)
        ),
        // Text colors - Standard colors
        ...['red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky',
           'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose'].flatMap(color => 
            [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map(shade => `text-${color}-${shade}`)
        ),
        // Base colors
        'bg-black',
        'bg-white',
        'bg-transparent',
        'text-black',
        'text-white',
        'text-transparent'
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-sans)'],
                mono: ['var(--font-mono)'],
            },
        },
    },
    plugins: [],
};