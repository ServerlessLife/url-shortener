import { describe, it, expect } from "vitest";
import fetch from "node-fetch";
import { getCdkOutput } from "./helpers/getCdkOutput";
import { invokeLambda } from "./helpers/invokeLambda";

const url = "https://www.google.com/";

describe("Integration test", () => {
  const cdkOutput = getCdkOutput();

  it("Encode & Decode", async () => {
    //encode
    const responseEncode = await invokeLambda(cdkOutput.FunctionEncode, {
      body: JSON.stringify({
        url,
      }),
    });

    const id = JSON.parse(responseEncode.body).id;
    expect(id).toBeDefined();

    //decode
    const responseDecoded = await invokeLambda(cdkOutput.FunctionDecode, {
      pathParameters: { id },
    });
    const urlDecoded = JSON.parse(responseDecoded.body).url;
    expect(urlDecoded).toEqual(url);

    //redirect
    const responseRedirect = await invokeLambda(cdkOutput.FunctionRedirect, {
      pathParameters: { id },
    });

    expect(responseRedirect.statusCode).toEqual(308);
    const urlRedirect = responseRedirect.headers.Location;
    expect(urlRedirect).toEqual(url);
  });
});
