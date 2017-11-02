/**
 * Pass-through translator
 *  - allows all commands
 *  - translate returns original command
 */

/**
 * Callback used to report errors
 * param1 = {Error} error object
 */
var errorCb

/**
 * 
 * @param {callback} errCb param1 = {Error} error object
 */
var init = (errCb) => {
    errorCb = errCb
}

var isValid = (com) => {
    return true
}

var translate = (com) => {
    return com
}

var usage = () => {
    return "{\n\t<anything>\n}"
}

module.exports = {
    init : init,
    isValid : isValid,
    translate : translate,
    usage : usage
}