module.exports = () => ({
  name: 'atlantation:vite',
  configResolved: (config) => {
    ;(config.resolve.alias || config.alias).push({
      find: /^vite-ssr$/,
      replacement: name + lib + file,
    })
  }
})
