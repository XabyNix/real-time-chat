const withBundleAnalyzer = require("@next/bundle-analyzer")({
	enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{ hostname: "avatars.githubusercontent.com" },
			{ hostname: "lh3.googleusercontent.com" },
		],
	},
};
module.exports = nextConfig;

module.exports = withBundleAnalyzer(nextConfig);
