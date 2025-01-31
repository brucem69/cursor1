import { Providers } from '@/providers';
import './globals.css';

export const metadata = {
  title: 'Dandi',
  description: 'API Management Platform',
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