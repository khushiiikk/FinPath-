/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                serif: ['"Playfair Display"', 'serif'],
                sans: ['"Inter"', 'sans-serif'],
            },
            colors: {
                brand: {
                    dark: '#213448',   // Darkest Blue
                    primary: '#537691', // Muted Blue
                    light: '#97B6C8',   // Light Gray-Blue
                    accent: '#E9DECB',  // Beige
                }
            }
        },
    },
    plugins: [],
}
