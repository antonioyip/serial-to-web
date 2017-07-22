var yaml = require('js-yaml')
var fs = require('fs')

var parseCommands = function() {
    var data = fs.readFileSync('commands.yml', 'utf8')

    var commandsMap = {}
    yaml.safeLoadAll(data, function (doc) {
        // Object.keys(doc).forEach((key) => {
        //     console.log( key + ' -> ' + doc[key])
        // })
        commandsMap = doc
    })
    return commandsMap
}

module.exports = {
    parseCommands: parseCommands
}