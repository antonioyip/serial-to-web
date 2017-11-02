/**
 * Commands file translator
 *  - allows commands listed in commands file
 *  - translate commands according to commands file (to be used by executor)
 * 
 * The command file should be a YAML file consisting of command:translation key value pairs
 */

const yaml = require('js-yaml')
const fs = require('fs')

/**
 * 
 * Object with command:translation key value pairs
 */
var commandsMap = {}

/**
 * Callback used to report errors
 * param1 = {Error} error object
 */
var errorCb

/**
 * 
 * Populates commandsMap
 * @param {callback} errCb param1 = {Error} error object
 * @param {string} filePath path to command file
 */  
var init = function(errCb, filePath) {
    errorCb = errCb

    var data = fs.readFileSync(filePath, 'utf8')
    yaml.safeLoadAll(data, function (doc) {
        commandsMap = doc
    })
}

/**
 * 
 * @param {string} com command to match against keys in commandsMap
 */
var isValid = function(com) {
    return commandsMap[com] != undefined
}

/**
 * 
 * @param {string} com command to retrieve translation for
 */
var translate = function(com) {
    return commandsMap[com] ? commandsMap[com] : ''
}

var usage = () => {
    return JSON.stringify(commandsMap, null, '\t')
}

module.exports = {
    init : init,
    isValid : isValid,
    translate : translate,
    usage : usage
}