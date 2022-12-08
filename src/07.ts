import { readLinesFromFile } from "./utils";

interface FileStructure {
  [index: string]: number | FileStructure;
}

export const getAnswer = (
  directories: Record<string, number>,
  maxSize: number
) => {
  const directoriesWithLessThanTheSize = Object.keys(directories).filter(
    (directory) => directories[directory] <= maxSize
  );

  return directoriesWithLessThanTheSize.reduce(
    (result, directory) => result + directories[directory],
    0
  );
};

export const getDirectoriesAndTotalSize = (
  fileStructure: FileStructure,
  rootPath?: string
): Record<string, number> => {
  return Object.keys(fileStructure).reduce((result, value) => {
    const currentPathDirectory = `${rootPath ? `${rootPath}.` : ""}${value}`;
    const data = fileStructure[value];
    if (typeof data === "object") {
      return {
        ...result,
        ...getDirectoriesAndTotalSize(data, currentPathDirectory),
        [currentPathDirectory]: getTotalSizeOfDirectory(data),
      };
    }

    return result;
  }, {});
};

export const getTotalSizeOfDirectory = (
  fileStructure: FileStructure
): number => {
  return Object.values(fileStructure).reduce<number>((result, value) => {
    if (typeof value === "number") {
      return result + value;
    }

    return getTotalSizeOfDirectory(value) + result;
  }, 0);
};

export const getFileStructureFromInput = (inputs: string[]): FileStructure => {
  const result: FileStructure = {};
  let currentDirectory: string = "";

  inputs.forEach((userInput) => {
    if (userInput.startsWith("$ cd")) {
      const userInputCd = userInput.split(" ").slice(-1)[0];

      if (userInputCd === "..") {
        currentDirectory = currentDirectory.split("/").slice(0, -1).join("/");
      } else if (userInputCd !== "/") {
        currentDirectory = `${currentDirectory}/${userInputCd}`;
      }
    } else if (!userInput.startsWith("$ ls")) {
      const [output1, output2] = userInput.split(" ");
      const currentFileStructureRef = currentDirectory
        .split("/")
        .reduce(
          (fileStructure, dirName) =>
            dirName !== ""
              ? (fileStructure[dirName] as FileStructure)
              : fileStructure,
          result
        );

      currentFileStructureRef[output2] =
        output1 === "dir" ? {} : parseInt(output1);
    }
  });

  return result;
};

export const main = async () => {
  const data = await readLinesFromFile("./input/07.txt");
  const fileStructure = getFileStructureFromInput(data);
  const directories = getDirectoriesAndTotalSize(fileStructure);

  console.log("part1", getAnswer(directories, 100000));

  const totalSize = Object.keys(fileStructure).reduce((result, directory) => {
    const value = fileStructure[directory];

    return typeof value === "number"
      ? result + value
      : result + getTotalSizeOfDirectory(value);
  }, 0);

  const spaceNeeded = 30000000 - (70000000 - totalSize);

  console.log(
    "part2",
    Object.values(directories).reduce(
      (result, totalSize) =>
        totalSize <= result && totalSize >= spaceNeeded ? totalSize : result,
      Number.MAX_VALUE
    )
  );
};

main();
