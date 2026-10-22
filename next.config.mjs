/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS === 'true' || process.env.GITHUB_ACTIONS === true;
let basePath = '';
let assetPrefix = '';

if (isGithubActions) {
  const repo = process.env.GITHUB_REPOSITORY?.replace(/.*?\//, '') || 'chess_bi';
  basePath = `/${repo}`;
  assetPrefix = `/${repo}/`;
}

const nextConfig = {
  output: 'export',
  basePath,
  assetPrefix,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
