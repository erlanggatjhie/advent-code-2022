import { readFile } from "fs/promises";

export const readLinesFromFile = async (
  filename: string
): Promise<string[]> => {
  return (await readFile(filename)).toString().split("\n");
};
