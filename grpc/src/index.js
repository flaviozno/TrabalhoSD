const path = require('path');
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader')

const implementation = require('./USERimplementation')
const Admimplementation = require('./ADMINimplementation')

require('./database')

const packageDefinition = protoLoader.loadSync(
    path.resolve(__dirname, 'proto', 'user.proto'),
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
    }
);
const packageDefinition2 = protoLoader.loadSync(
    path.resolve(__dirname, 'proto', 'admin.proto'),
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
    }
)
const proto = grpc.loadPackageDefinition(packageDefinition);
const proto2 = grpc.loadPackageDefinition(packageDefinition2);

const server = new grpc.Server();

server.addService(proto.UserService.service, implementation);
server.addService(proto2.AdminService.service, Admimplementation)
server.bind('0.0.0.0:3334', grpc.ServerCredentials.createInsecure());
server.start();