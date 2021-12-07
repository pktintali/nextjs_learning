module.exports = {
  reactStrictMode: true,
  redirects: async () => {
    return [
      {
        source: '/old-paths',
        destination: '/new-paths',
        permanent: true,
      }
    ]
  }
}
