"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var schema = (0, graphql_1.buildSchema)("\n  type Query {\n    hello: String\n  }\n");
// The rootValue provides a resolver function for each API endpoint
var rootValue = {
    hello: function () {
        return "Hello world!";
    },
};
// Run the GraphQL query '{ hello }' and print out the response
(0, graphql_1.graphql)({
    schema: schema,
    source: "{ hello }",
    rootValue: rootValue,
}).then(function (response) {
    console.log(response);
});
