import { describe, it, expect } from "vitest";
import fetch from "node-fetch";
import { getCdkOutput } from "./helpers/getCdkOutput";

const url = "https://www.google.com/";

describe("E2e test", () => {
  const cdkOutput = getCdkOutput();

  it("Encode & Decode", async () => {
    //encode
    const responsePost = await fetch(`${cdkOutput.ApiEndpoint}/encode`, {
      method: "POST",
      body: JSON.stringify({ url }),
    });
    const id = ((await responsePost.json()) as any).id;
    expect(id).toBeDefined();

    //decode
    const responseDecoded = await fetch(
      `${cdkOutput.ApiEndpoint}/decode/${id}`
    );
    const urlDecoded = ((await responseDecoded.json()) as any).url;
    expect(urlDecoded).toEqual(url);

    //redirect
    const responseRedirect = await fetch(`${cdkOutput.ApiEndpoint}/${id}`, {
      redirect: "manual",
    });

    expect(responseRedirect.status).toEqual(308);
    const urlRedirect = responseRedirect.headers.get("location");
    expect(urlRedirect).toEqual(url);
  });
});
