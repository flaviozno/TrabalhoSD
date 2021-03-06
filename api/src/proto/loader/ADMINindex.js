const path = require('path');
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const { promisify } = require('util');

const protoConfig = require('../../config/proto');

module.exports = function load({
    serviceName,
    fileName,
    address,
    credentials = grpc.credentials.createInsecure(),
}) {
    const protoDef = protoLoader.loadSync(
        path.resolve(__dirname, '..', `${fileName}.proto`),
        protoConfig
    );

    const proto = grpc.loadPackageDefinition(protoDef);

    const admin = new proto[serviceName](address, credentials);

    Object.entries(admin.__proto__).map(([prop, value]) => {
        if (value.originalName !== undefined) {
            admin[prop] = promisify(value);
        }
    });

    return admin;
};
