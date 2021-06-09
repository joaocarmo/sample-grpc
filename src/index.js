const path = require('path')
const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')

const HOST = '0.0.0.0'
const PORT = '50051'
const PROTO_PATH = path.join(__dirname, 'protos', 'hello.proto')

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
})
const helloProto = grpc.loadPackageDefinition(packageDefinition).helloworld

/**
 * Implements the SayHello RPC method.
 */
const sayHello = (call, callback) => {
  console.log('Request params:', JSON.stringify(call.request))
  callback(null, { message: `Hello ${call.request.name}` })
}

/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
const main = () => {
  const server = new grpc.Server()
  server.addService(helloProto.Greeter.service, { sayHello })
  server.bindAsync(`${HOST}:${PORT}`, grpc.ServerCredentials.createInsecure(),
    (error, port) => {
      if (!error) {
        server.start()
        console.log(`Listening on ${HOST}:${port}...`)
      } else {
        console.error(error)
      }
    },
  )
}

main()
