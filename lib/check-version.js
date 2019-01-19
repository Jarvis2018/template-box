const request = require('request')
const semver = require('semver')
const chalk = require('chalk')
const packageConfig = require('../package.json')

module.exports = done => {
  // check node version is supported
  if (!semver.satisfies(process.version, packageConfig.engines.node)) {
    return console.log(chalk.red(`  You must upgrade node to >= ${packageConfig.engines.node} .x to use template-box`))
  }

  //  check local template-box version and online version
  request({
    url: 'https://registry.npmjs.org/template-box',
    timeout: 1000
  }, (err, res, body) => {
    if (!err && res.statusCode === 200) {
      const latestVersion = JSON.parse(body)['dist-tags'].latest
      const localVersion = packageConfig.version
      if (semver.lt(localVersion, latestVersion)) {
        console.log(chalk.yellow('  A newer version of template-box is available.'))
        console.log()
        console.log('  latest:    ' + chalk.green(latestVersion))
        console.log('  installed: ' + chalk.red(localVersion))
        console.log()
      }
    }
    done()
  })
}
