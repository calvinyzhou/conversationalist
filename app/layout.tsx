import type { Metadata, Viewport } from 'next';
import { Inter, Gelasio } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const gelasio = Gelasio({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-serif' });

export const metadata: Metadata = {
  title: 'The Conversationalist - Build Meaningful Connections',
  description: 'Join local events and workshops to improve communication skills and form meaningful relationships in your community.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${gelasio.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
