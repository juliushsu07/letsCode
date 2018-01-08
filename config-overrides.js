module.exports = (config, env) => {
  config.plugins.push({
    new webpack.DefinePlugin({
      'process.env': {
         PORT: process.env.PORT
      }
    })
  });
  return config
}