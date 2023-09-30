/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push({
      "utf-8-validate": "commonjs utf-8-validate",
      bufferutil: "commonjs bufferutil"
    });

    return config;
  },
  images: {
    domains: [
      "uploadthing.com",
      "utfs.io"
    ]
  }
}

module.exports = nextConfig

// module.exports = {
//   ...nextConfig,
//   webpack: (config, { isServer }) => {
//     if (!isServer) {
//       config.externals.push({
//         bufferutil: "bufferutil",
//         "utf-8-validate": "utf-8-validate",
//         "supports-color": "supports-color",
//       });
//     }

//     return config;
//   },
// };