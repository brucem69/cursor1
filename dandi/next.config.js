/** @type {import('next').NextConfig} */
const nextConfig = {
  // Usuwamy experimental.serverActions, ponieważ jest to już domyślnie włączone w Next.js 14
  // i powoduje ostrzeżenie
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig 