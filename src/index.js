const path = require('path')
const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')

const HOST = '0.0.0.0'
const PORT = '50051'
const PROTO_PATH_HELLO = path.join(__dirname, 'protos', 'hello.proto')
const PROTO_PATH_TODO = path.join(__dirname, 'protos', 'todo.proto')

const todoDB = [
  { content: 'Buy more chocolate', finished: false },
  { content: 'Finish poem', finished: true },
  { content: 'Eat dessert', finished: false },
]
const nullTodo = { content: '', finished: false }

const helloPackageDefinition = protoLoader.loadSync(PROTO_PATH_HELLO, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
})

const todoPackageDefinition = protoLoader.loadSync(PROTO_PATH_TODO, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
})

const helloProto = grpc.loadPackageDefinition(helloPackageDefinition).hello

const todoProto = grpc.loadPackageDefinition(todoPackageDefinition).todo

const sayHello = (call, callback) => {
  console.log('Hello Request params:', JSON.stringify(call.request))
  callback(null, { message: `Hello ${call.request.name}` })
}

const getTodoById = (call, callback) => {
  console.log('Todo Request params:', JSON.stringify(call.request))
  const todoId = +call.request.id
  const todoObj = todoId < todoDB.length ? todoDB[todoId] : nullTodo
  callback(null, todoObj)
}

const main = () => {
  const server = new grpc.Server()
  server.addService(helloProto.Greeter.service, { sayHello })
  server.addService(todoProto.Todo.service, { getTodoById })
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
