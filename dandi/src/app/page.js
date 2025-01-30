export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black p-24">
      <div className="z-10 max-w-5xl w-full">
        {/* Header section */}
        <div className="text-center mb-20 space-y-4">
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            API Management Platform
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Secure, scalable, and easy-to-use platform for managing your API keys and access controls
          </p>
        </div>

        {/* Features section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="p-8 border rounded-xl hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-800 hover:scale-105">
            <div className="mb-4 text-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold mb-4">Secure Access</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Generate and manage API keys with advanced security features and real-time monitoring
            </p>
          </div>
          <div className="p-8 border rounded-xl hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-800 hover:scale-105">
            <div className="mb-4 text-purple-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold mb-4">Easy Integration</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Simple integration with your existing applications through our comprehensive API
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          <a
            className="group rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-all duration-300 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-transparent text-sm sm:text-base h-12 sm:h-14 px-6 sm:px-8 sm:min-w-[200px]"
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Read our docs</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
          <a
            className="group rounded-full transition-all duration-300 flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white text-sm sm:text-base h-12 sm:h-14 px-6 sm:px-8 sm:min-w-[200px]"
            href="/api-keys"
          >
            <span>Manage API Keys</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </main>
  );
}