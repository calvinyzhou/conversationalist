/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'tc-black': '#000000',
        'tc-orange': '#FF6B35',
        'tc-yellow': '#FFC107',
        'tc-blue': '#2196F3',
        'tc-pink': '#FF4081',
        'tc-purple': '#9C27B0',
        'tc-green': '#4CAF50',
        // Keep some old colors for compatibility
        'peachy-gold': '#FFC107',
        'dark-blue': '#000000',
        'accent-blue': '#2196F3',
        'accent-purple': '#9C27B0',
      },
      fontFamily: {
        'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        'display': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      fontSize: {
        'hero': ['4rem', { lineHeight: '1.1', fontWeight: '800' }],
      },
    },
  },
  plugins: [],
}