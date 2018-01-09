module.exports = (config, env) => {
  config.module.rules.push({
    new webpack.DefinePlugin({
      process.env: {
         PORT: process.env.PORT
      }
    })
  });
  return config
}