'use strict'

var sass = require('sass')
var extend = require('util')._extend

module.exports = (ext) => function (data) {
    // support global and theme-specific config
  var userConfig = extend(
        this.theme.config.sass || {},
        this.config.sass || {}
    )

  var config = extend({
    data: data.text,
    file: data.path,
    outputStyle: 'nested',
    sourceComments: false,
    indentedSyntax: (ext === 'sass')
  }, userConfig)

  try {
    var result = sass.compile(data.path, config)
    return result.css
  } catch (error) {
    console.error(error.toString())
    throw error
  }
}
