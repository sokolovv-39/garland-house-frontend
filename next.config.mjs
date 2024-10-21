/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(ttf|otf|eot|woff|woff2)$/,
      use: {
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "static/fonts",
          publicPath: "/_next/static/fonts",
        },
      },
    });
    config.module.rules.push({
      test: /\.pdf$/,
      type: "asset/resource",
    });
    return config;
  },
};

export default nextConfig;
