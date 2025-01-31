import { AppLayout } from '@/components/AppLayout';
import { Overview } from '@/components/Overview';
import Link from 'next/link';

export default function HomePage() {
  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto">
        <Overview usage={24} limit={1000} />
        
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-20 space-y-4">
            <div className="relative">
              <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 inline-block">
                API Management Platform
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Secure, scalable, and easy-to-use platform for managing your API keys and access controls
            </p>
            <div className="mt-8">
              <Link
                href="/api-keys"
                className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-md hover:opacity-90 transition-opacity"
              >
                Manage API Keys
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="p-8 border rounded-xl hover:shadow-lg transition-all duration-300 bg-white hover:scale-105">
            <div className="mb-4 text-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold mb-4">Secure Access</h2>
            <p className="text-gray-600">
              Generate and manage API keys with advanced security features and real-time monitoring
            </p>
          </div>
          <div className="p-8 border rounded-xl hover:shadow-lg transition-all duration-300 bg-white hover:scale-105">
            <div className="mb-4 text-purple-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold mb-4">Easy Integration</h2>
            <p className="text-gray-600">
              Simple integration with your existing applications through our comprehensive API
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}