/** @type {import('next').NextConfig} */
module.exports = {
  async rewrites() {
    return process.env.NODE_ENV === "development"
      ? [
          {
            source: "/api/:slug*",
            destination: "http://localhost:5000/api/:slug*",
          },
        ]
      : [];
  },
  images: {
    domains: ['next-project-udemy.s3.amazonaws.com', 'next-project-udemy.s3.eu-west-3.amazonaws.com'],
  }
};
