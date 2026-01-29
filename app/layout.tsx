import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; // Or any other font
import './globals.css';
import { clsx } from 'clsx';

const font = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Guardians of the Future',
  description: 'Join the movement.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={clsx(font.className, "bg-zinc-100 min-h-screen")}>
        {/* Center on desktop */}
        <div className="mx-auto max-w-md min-h-screen bg-background shadow-xl overflow-hidden relative">
          {children}
        </div>
      </body>
    </html>
  );
}
