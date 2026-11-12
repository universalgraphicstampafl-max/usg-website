/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async redirects() {
    return [
      { source: '/success-stories', destination: '/gallery', permanent: true },
      { source: '/services', destination: '/', permanent: true },
      { source: '/client-login', destination: 'https://client.usgfla.com/PortalLogin.aspx', permanent: false },
      { source: '/Client-Resources/Client-Portal', destination: 'https://client.usgfla.com/PortalLogin.aspx', permanent: true },
      { source: '/Client-Resources/Client-Portal/', destination: 'https://client.usgfla.com/PortalLogin.aspx', permanent: true },
      { source: '/client-resources/client-portal', destination: 'https://client.usgfla.com/PortalLogin.aspx', permanent: true },
      { source: '/client-resources/client-portal/', destination: 'https://client.usgfla.com/PortalLogin.aspx', permanent: true },
    ];
  },
};

export default nextConfig;
