import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	crossOrigin: "anonymous",
	logging: {
		fetches: {
			fullUrl: true,
			hmrRefreshes: true,
		},
	},
	poweredByHeader: false,
	experimental: {
		optimizeServerReact: true,
		reactCompiler: true,
		serverMinification: true,
		taint: true,
	},
};

export default nextConfig;
