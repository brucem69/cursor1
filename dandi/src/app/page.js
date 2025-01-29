export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full">
        {/* Header section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Welcome to API Management Platform</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Manage your API keys and access with ease
          </p>
        </div>

        {/* Features section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="p-6 border rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Secure Access</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Generate and manage API keys with advanced security features
            </p>
          </div>
          <div className="p-6 border rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Easy Integration</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Simple integration with your existing applications
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] bg-blue-500 text-white transition-colors flex items-center justify-center hover:bg-blue-600 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="/api-keys"
          >
            Manage API Keys
          </a>
        </div>
      </div>
    </main>
  );
}