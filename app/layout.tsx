import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import CartSidebar from '@/components/CartSidebar';
import Toast from '@/components/Toast';

export const metadata: Metadata = {
  title: 'AquaPlus — Piscines et Spas',
  description: "Configurez votre piscine ou spa, magasinez nos accessoires et réservez votre installation.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700;800&family=Parkinsans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen">
        <Header />
        <CartSidebar />
        <Toast />
        <main className="pt-[70px]">{children}</main>
      </body>
    </html>
  );
}
