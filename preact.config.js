require('dotenv').config()
const config = require('./config')
// The webpack base config has minicssextractplugin already loaded
const path = require('path')
const glob = require('glob')
const PurgecssPlugin = require('purgecss-webpack-plugin')

export default (webpackConfig, env, helpers) => {
  if (env.ssr) {
    return
  }
  if (env.production) {
    // Remove comment to disable sourcemaps
    // webpackConfig.devtool = false
  }
  webpackConfig.plugins.push(new PurgecssPlugin({
    paths: glob.sync(path.join(__dirname, 'client/src/**/*'), { nodir: true })
  }))
  const { plugin } = helpers.getPluginsByName(webpackConfig, 'HtmlWebpackPlugin')[0]
  plugin.options.view = {
    assetsPrefix: env.production ? '/assets' : '',
    ctfName: config.ctfName
  }
}
