/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: false, // for react spring bottom sheet
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'mdx'],
  compiler: {
    styledComponents: true,
  },
  // async redirects() {
  //   return [
  //     {
  //       source: '/@:path', // 공유할땐 /@haneum으로 할 수 있도록 세팅함
  //       destination: '/?user=:path',
  //       permanent: true,
  //     },
  //   ];
  // },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

module.exports = nextConfig;
