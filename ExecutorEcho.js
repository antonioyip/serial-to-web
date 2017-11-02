/**
 * Echo executor
 *  - echoes commands received
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

/**
 * 
 * @param {string} input command to echo
 * @param {callback} cb param1 = {string} execution result
 */
var execute = function(input, cb) {
    cb(input)
}

module.exports = {
    init : init,
    execute : execute
}
