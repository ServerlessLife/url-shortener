import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { nanoid } from "nanoid";

const ddbDocClient = DynamoDBDocumentClient.from(new DynamoDBClient({}));

/**
 * Encodes a URL to ID that, combined with the API path, gives you a shortened URL.
 * @param url URL to encode.
 * @returns ID to access original URL.
 */
export async function encodeUrl(url: string): Promise<string> {
  const id = nanoid();

  const putCommand = new PutCommand({
    TableName: process.env.tableName!,
    Item: {
      PK: id,
      url: url,
    },
  });

  await ddbDocClient.send(putCommand);

  return id;
}
