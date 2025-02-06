import { Providers } from '@/providers';
import { AuthProvider } from '@/components/AuthProvider';
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
        <AuthProvider>
          <Providers>
            {children}
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
} 