import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'NTU What To Eat',
  description: 'Discover your next meal at NTU',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        {children}
      </body>
    </html>
  );
}
