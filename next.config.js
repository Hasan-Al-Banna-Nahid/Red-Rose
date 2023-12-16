/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["i.ibb.co"],
  },
};

module.exports = {
  // Other configurations...
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
  // Other configurations...
};
module.exports = nextConfig;
