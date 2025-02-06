"use client";
import { AppLayout } from '@/components/AppLayout';
import { Overview } from '@/components/Overview';
import { UserProfile } from '@/components/UserProfile';
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";

export default function HomePage() {
  const router = useRouter();
  const { data: session } = useSession();

  const handleManageKeys = () => {
    if (session) {
      router.push('/api-keys');
    } else {
      signIn('google');
    }
  };

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto relative">
        <UserProfile />
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
              <button
                onClick={handleManageKeys}
                className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-md hover:opacity-90 transition-opacity"
              >
                Manage API Keys
              </button>
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

      <div className="max-w-5xl mx-auto px-4">
        <div className="flex min-h-screen flex-col items-center justify-center p-24">
          <h1 className="text-4xl font-bold mb-8">
            Welcome to Dandi
          </h1>

          {session ? (
            <div className="space-y-4 text-center">
              <p>Signed in as {session.user.email}</p>
              <img 
                src={session.user.image} 
                alt={session.user.name}
                className="w-12 h-12 rounded-full mx-auto"
              />
              <button
                onClick={() => signIn("google")}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Sign out
              </button>
            </div>
          ) : (
            <button
              onClick={() => signIn("google")}
              className="flex items-center gap-2 bg-white text-gray-800 px-4 py-2 rounded shadow hover:shadow-md"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign in with Google
            </button>
          )}
        </div>
      </div>
    </AppLayout>
  );
}