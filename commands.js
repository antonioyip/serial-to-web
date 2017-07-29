var yaml = require('js-yaml')
var fs = require('fs')

console.log('Filtering by commands')

var commandsMap = {}

var init = function(filename) {
    var data = fs.readFileSync(filename, 'utf8')

    yaml.safeLoadAll(data, function (doc) {
        // Object.keys(doc).forEach((key) => {
        //     console.log( key + ' -> ' + doc[key])
        // })
        commandsMap = doc
    })
}

var toString = function() {
    return JSON.stringify(commandsMap)
}

var isValid = function(com) {
    return commandsMap[com] != undefined
}

var translate = function(com) {
    return commandsMap[com] ? commandsMap[com] : ''
}

module.exports = {
    init: init,
    isValid: isValid,
    toString: toString,
    translate: translate
}