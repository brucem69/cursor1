import { Providers } from '@/providers';
import './globals.css';

export const metadata = {
  title: 'Dandi App',
  description: 'API Key Management',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body suppressHydrationWarning={true}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
} 