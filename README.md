# gRPC Sample Server

## Starting

```sh
yarn start

# or in watch mode

yarn start:dev
```

## Testing

Using [gRPCurl][gRPCurl], the endpoint can be tested.

```sh
# Hello Service
grpcurl -d '{"name":"Gatsby"}' -plaintext -import-path src/protos -proto hello.proto 0.0.0.0:50051 hello.Greeter.SayHello

# Todo Service
grpcurl -d '{"id":"1"}' -plaintext -import-path src/protos -proto todo.proto 0.0.0.0:50051 todo.Todo.GetTodoById
```

Or get a list of available services from the `proto` definitions.

```sh
# Hello Service
grpcurl -import-path src/protos -proto hello.proto list

# Todo Service
grpcurl -import-path src/protos -proto todo.proto list
```

<!-- References -->

[gRPCurl]: https://github.com/fullstorydev/grpcurl
