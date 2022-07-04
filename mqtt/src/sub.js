const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://localhost:3335');
const topic = 'LISTANGteste123'

client.on('connect', () => {
    client.subscribe(topic)
})

client.on('message', function (message) {
    console.log(message.toString())
    client.end()
})