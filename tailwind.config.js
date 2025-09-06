/** @type {import('tailwindcss').Config} */
module.exports = {
  // Bagian ini memberitahu Tailwind untuk mencari class di semua file
  // dalam folder 'app'. Ini sangat penting.
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Di sini Anda bisa menambahkan warna atau font kustom nanti
    },
  },
  plugins: [],
};
