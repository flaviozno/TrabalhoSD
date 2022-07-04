var mosca = require('mosca')

var settings = {
    port: 3335
}
const server = new mosca.Server(settings)

server.on('clientConnected', (client) => {
    console.log('client connected', client.id);
})

server.on('published', (packet, client) => {
    console.log('Published', packet.payload);
})
