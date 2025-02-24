import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  	/* config options here */
	images: {
		remotePatterns: [
		{
			protocol: 'https',
			hostname: 'ev-database.org',
			port: '',
			pathname: '/img/auto/**',
			search: '',
		},
		],
	},
};

export default nextConfig;
