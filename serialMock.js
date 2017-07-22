console.log('Using mock serial')

////////////////////////////////////////////////////////////
//
//  Functions
//
////////////////////////////////////////////////////////////

// input - string to echo
// callback - function to echo data
var writeToSerial = function(input, callback) {
    console.log('writeToSerial: ' +  input)
    callback(input)
}

module.exports = {
    writeToSerial: writeToSerial
}
