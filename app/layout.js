// app/layout.js
import "./globals.css";
// BARIS BARU: Impor CSS dasar untuk Tippy.js
import 'tippy.js/dist/tippy.css'; 

// Metadata untuk SEO dan tab browser
export const metadata = {
  title: "PEBOOM",
  description: "The Meme Frog That Goes BOOM!",
};

// Ini adalah komponen layout utama yang membungkus seluruh website Anda.
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Container ini penting untuk menjaga konten tetap di atas background */}
        <div className="app-root">{children}</div>
      </body>
    </html>
  );
}
