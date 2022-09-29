import * as fs from "fs";
import * as path from "path";

export function getCdkOutput() {
  const rawdata = fs.readFileSync(
    path.join(__dirname, "../../cdk-outputs.json")
  );
  const config = JSON.parse(rawdata.toString());
  const cdkOutput = config && config[Object.keys(config)[0]];
  return cdkOutput;
}
