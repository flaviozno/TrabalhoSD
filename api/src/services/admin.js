const load = require('../proto/loader/ADMINindex');

const ServiceAdmin = load({
    serviceName: 'AdminService',
    address: 'localhost:3334',
    fileName: 'admin',
});

module.exports = ServiceAdmin;
