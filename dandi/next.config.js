/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  // Dodaj konfigurację portu
  server: {
    port: 3001
  }
};

module.exports = nextConfig; 