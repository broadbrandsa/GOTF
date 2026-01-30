import type { Metadata } from 'next';
import { Inter, Inter_Tight } from 'next/font/google';
import './globals.css';
import { clsx } from 'clsx';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const interTight = Inter_Tight({ subsets: ['latin'], variable: '--font-inter-tight' });

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
      <body className={clsx(inter.variable, interTight.variable, "font-sans bg-zinc-100 min-h-screen")}>
        {/* Center on desktop */}
        <div className="mx-auto max-w-md min-h-screen bg-background shadow-xl overflow-hidden relative">
          {children}
        </div>
      </body>
    </html>
  );
}
