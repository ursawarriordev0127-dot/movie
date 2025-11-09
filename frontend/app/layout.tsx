import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/src/providers';
import { ErrorBoundary } from '@/components/shared';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Movie App',
  description: 'Movie management application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary>
          <AuthProvider>{children}</AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}

