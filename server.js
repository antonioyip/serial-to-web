var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var serial = (process.env.SERIAL_PORT_ENABLED == 'true') ? require('./serial') : require('./serialMock')
var commands = (process.env.SERIAL_FILTER_COMMANDS == 'true') ? require('./commands') : require('./commandsMock')

////////////////////////////////////////////////////////////
//
//  Configuration
//
////////////////////////////////////////////////////////////

var serverPort = parseInt(process.env.SERVER_PORT) || 3000

////////////////////////////////////////////////////////////
//
//  Functions
//
////////////////////////////////////////////////////////////

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

commands.init('commands.yml')
io.on('connection', (socket) => {
    // report available commands
    io.emit('serial message', 'Valid commands: ' + commands.toString())
    socket.on('serial message', (msg) => {
        if (commands.isValid(msg)) {
            // only handle configured commands
            serial.writeToSerial(commands.translate(msg), (data) => {
                io.emit('serial message', data)
            })
        }
        else {
            // reject other messages
            var err = 'Error: invalid command'
            io.emit('serial message', err)
            console.log(err)
        }
    })
})

http.listen(serverPort, () => {
    console.log('Listening on port ' + serverPort)
})
