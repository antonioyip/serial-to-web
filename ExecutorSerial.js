/**
 * Serial executor
 *  - sends command to be processed on serial port
 */

const SerialPort = require('serialport')

/**
 * Object used to communicate with serial port
 */
var port

/**
 * Callback used to report errors
 * param1 = {Error} error object
 */
var errorCb

/**
 * 
 * @param {callback} errCb param1 = {Error} error object
 * @param {string} device serial device path
 * @param {number} baudRate serial device baud rate
 */
var init = (errCb, device, baudRate) => {
    errorCb = errCb

    port = new SerialPort(device, {
        baudRate: baudRate,
        parser: SerialPort.parsers.readline('\n')   // @todo - what is this?
    });

    port.on('open', () => {
        //console.log('Serial port is open: ' + port.isOpen());
    
        // send Ctrl-C (clear existing input to console)
        execute('\x03', () => {} );
    });

    port.on('error', (err) => {
        errorCb(err)
    });
}

/**
 * 
 * @param {string} input command to send to serial port
 * @param {callback} callback param1 = {string} execution result
 */
var execute = function(input, callback) {
    // write to serial port
    port.write(input + '\n', (err) => {
        if(err) {
            errorCb(err)
        }
    });

    // read data from serial port
    port.removeAllListeners('data')
    port.on('data', (data) => {
        //console.log('    ' + data);
        callback(data)
    })
}

module.exports = {
    init : init,
    execute : execute
}
