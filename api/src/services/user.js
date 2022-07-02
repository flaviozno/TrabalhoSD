const load = require('../proto/loader');

const ServiceClient = load({
    serviceName: 'UserService',
    address: 'localhost:3334',
    fileName: 'user',
});

module.exports = ServiceClient;
