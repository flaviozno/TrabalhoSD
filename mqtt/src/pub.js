const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://localhost:3335');
const topic = 'LISTANGteste123'
const message = 'Testando'

client.on('connect', (topic, message) => {
    setInterval(() =>{
        client.publish(topic, message);
        console.log('Message was been sent!', message);
    }, 500)
})