import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { encodeUrl } from "../core/encodeUrl";

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  let valid = true;
  if (!event.body) {
    valid = false;
  }

  let url: string | undefined;

  try {
    const input = JSON.parse(event.body!);
    url = input.url;
  } catch (err) {
    console.error(err);
    valid = false;
  }

  if (!valid || !url) {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: "Invalid input",
    };
  }

  const id = await encodeUrl(url);

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id,
    }),
  };
};
