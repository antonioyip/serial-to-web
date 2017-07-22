var SerialPort = require('serialport')

////////////////////////////////////////////////////////////
//
//  Configuration
//
////////////////////////////////////////////////////////////

var serialDevice = process.env.SERIAL_PORT || '/dev/ttyS0'
var serialBaudRate = parseInt(process.env.SERIAL_BAUD_RATE) || 115200

console.log('Opening serial port at: ' + serialDevice)
console.log('Using baud rate: ' + serialBaudRate)

////////////////////////////////////////////////////////////
//
//  Functions
//
////////////////////////////////////////////////////////////

var port = new SerialPort(serialDevice, {
    baudRate: serialBaudRate,
    parser: SerialPort.parsers.readline('\n')
});

port.on('open', () => {
    console.log('Serial port is open: ' + port.isOpen());

    // send Ctrl-C (clear existing input to console)
    writeToSerial('\x03', () => {} );
});

port.on('error', (err) => {
    console.log('Serial port error: ', err.message);
});

// input - string to write to the serial port
// callback - function to call when receiving serial data
var writeToSerial = function(input, callback) {
    console.log('writeToSerial: ' +  input)

    // write to serial port
    port.write(input + '\n', (err) => {
        if(err) {
            console.log('Serial port error writing:', err.message);
        }
    });

    // read data from serial port
    var output = ''
    port.removeAllListeners('data')
    port.on('data', (data) => {
        console.log('    ' + data);
        callback(data)
    })
}

module.exports = {
    writeToSerial: writeToSerial
}
