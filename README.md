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
grpcurl -d '{"name":"Gatsby"}' -plaintext -import-path src/protos -proto hello.proto 0.0.0.0:50051 helloworld.Greeter.SayHello
```

<!-- References -->

[gRPCurl]: https://github.com/fullstorydev/grpcurl
