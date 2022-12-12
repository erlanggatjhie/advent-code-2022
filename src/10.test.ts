import { calculateSignalStrength } from "./10";
import { readLinesFromFile } from "./utils";

describe("getRegisterValuesLogs", () => {
  it("should parse a bigger set test data", async () => {
    const commands = await readLinesFromFile("./input/10-test.txt");
    expect(calculateSignalStrength(commands)).toEqual(13140);
  });
});
