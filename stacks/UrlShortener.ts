import {
  Api,
  ReactStaticSite,
  StackContext,
  Table,
} from "@serverless-stack/resources";

export function UrlShortener({ stack }: StackContext) {
  // Create the table
  const table = new Table(stack, "UrlMap", {
    fields: {
      PK: "string",
    },
    primaryIndex: { partitionKey: "PK" },
  });

  // Create the HTTP API
  const api = new Api(stack, "Api", {
    defaults: {
      function: {
        // Pass in the table name to our API
        environment: {
          tableName: table.tableName,
        },
      },
    },
    routes: {
      "GET /{id}": "functions/redirect.handler",
      "POST /encode": "functions/encode.handler",
      "GET /decode/{id}": "functions/decode.handler",
    },
  });

  const functionRedirect = api.getFunction("GET /{id}")!;
  table.cdk.table.grantReadData(functionRedirect);
  const functionEncode = api.getFunction("POST /encode")!;
  table.cdk.table.grantWriteData(functionEncode);
  const functionDecode = api.getFunction("GET /decode/{id}")!;
  table.cdk.table.grantReadData(functionDecode);

  // Deploy our React app
  const site = new ReactStaticSite(stack, "ReactSite", {
    path: "frontend",
    environment: {
      REACT_APP_API_URL: api.url,
    },
  });

  // Show the API endpoint in the output
  stack.addOutputs({
    ApiEndpoint: api.url,
    SiteUrl: site.url,
    FunctionRedirect: functionRedirect.functionName,
    FunctionEncode: functionEncode.functionName,
    FunctionDecode: functionDecode.functionName,
  });
}
