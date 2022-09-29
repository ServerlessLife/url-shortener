import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

const ddbDocClient = DynamoDBDocumentClient.from(new DynamoDBClient({}));

/**
 * Decodes a shortened URL to its original URL.
 * @param id ID to access the original URL.
 * @returns Original URL.
 */
export async function decodeUrl(id: string): Promise<string | undefined> {
  const getCommand = new GetCommand({
    TableName: process.env.tableName!,
    Key: {
      PK: id,
    },
  });

  const { Item: item } = await ddbDocClient.send(getCommand);

  return item?.url;
}
