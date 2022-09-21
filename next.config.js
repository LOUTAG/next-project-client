/** @type {import('next').NextConfig} */
module.exports = {
  async rewrites() {
    console.log(process.env.NODE_ENV);
    return process.env.NODE_ENV === "development"
      ? [
          {
            source: "/api/:slug*",
            destination: "http://localhost:5000/api/:slug*",
          },
        ]
      : [];
  },
};
