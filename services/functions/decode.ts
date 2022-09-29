import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { decodeUrl } from "../core/decodeUrl";

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const id = (event.pathParameters as any).id;

  const url = await decodeUrl(id);

  if (!url) {
    return {
      statusCode: 404,
      headers: { "Content-Type": "application/json" },
      body: "Not found",
    };
  }

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      url,
    }),
  };
};
