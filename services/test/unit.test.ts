import { describe, it, expect } from "vitest";
import { encodeUrl } from "../core/encodeUrl";
import { decodeUrl } from "../core/decodeUrl";
import { mockClient, AwsStub } from "aws-sdk-client-mock";
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
} from "@aws-sdk/lib-dynamodb";
import {
  ServiceInputTypes,
  ServiceOutputTypes,
} from "@aws-sdk/client-dynamodb";
import { beforeAll, afterAll, vi } from "vitest";

const url = "https://www.google.com/";
const id = "abcd";
let ddbMock: AwsStub<ServiceInputTypes, ServiceOutputTypes>;

beforeAll(() => {
  vi.mock("nanoid", () => {
    return { nanoid: () => id };
  });
  ddbMock = mockClient(DynamoDBDocumentClient);
});

afterAll(() => {
  ddbMock.reset();
  vi.resetAllMocks();
});

describe("Unit test", () => {
  it("Encode", async () => {
    ddbMock.on(PutCommand).resolves({});

    const idReturned = await encodeUrl(url);

    expect(idReturned).toEqual(id);
  });

  it("Decode", async () => {
    ddbMock.on(GetCommand).resolves({
      Item: { PK: id, url },
    });

    const urlDecoded = await decodeUrl(id);

    expect(urlDecoded).toEqual(url);
  });
});
