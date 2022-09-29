import {
  LambdaClient,
  InvokeCommand,
  InvokeCommandInput,
} from "@aws-sdk/client-lambda";

export async function invokeLambda(functionName: string, payload?: any) {
  const lambdaClient = new LambdaClient({});
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const commandInput: InvokeCommandInput = {
    FunctionName: functionName,
    InvocationType: "RequestResponse",
    LogType: "Tail",
  };
  if (payload) {
    commandInput.Payload = encoder.encode(JSON.stringify(payload));
  }

  const command = new InvokeCommand(commandInput);
  const lambdaResponseEncode = await lambdaClient.send(command);

  return JSON.parse(decoder.decode(lambdaResponseEncode.Payload));
}
