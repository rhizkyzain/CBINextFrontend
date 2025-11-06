// next.config.js
module.exports = {
  reactStrictMode: true,
  experimental: {
    turboMode: false, // Disable TurboPack for dev tools
  },
  devIndicators: {
    buildActivity: false, // Disable the build activity indicator in the bottom left
    autoPrerender: false, // Disable the auto prerender indicator in the bottom left
  },
  eslint: {
    ignoreDuringBuilds: true, // This is optional but helps with builds if you want to skip linting
  },
};
