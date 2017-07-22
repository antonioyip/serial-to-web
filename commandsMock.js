console.log('Allow all commands')

var init = function() {
    // do nothing
}

var isValid = function(com) {
    return true
}

var translate = function(com) {
    return com
}

var toString = function() {
    return '<anything>'
}

module.exports = {
    init: init,
    isValid: isValid,
    toString: toString,
    translate: translate
}