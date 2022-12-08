import { readLinesFromFile } from "./utils";

type Grid = number[][];

const getSurroundingTrees = (grid: Grid, x: number, y: number) => {
  const gridWidth = grid[0].length;
  const gridHeight = grid.length;

  const topTrees = Array(y)
    .fill(0)
    .map((_, index) => grid[y - index - 1][x]);

  const bottomTrees = Array(gridHeight - y - 1)
    .fill(0)
    .map((_, index) => grid[y + index + 1][x]);

  const leftTrees = Array(x)
    .fill(0)
    .map((_, index) => grid[y][x - index - 1]);

  const rightTrees = Array(gridWidth - x - 1)
    .fill(0)
    .map((_, index) => grid[y][x + index + 1]);

  return { topTrees, bottomTrees, leftTrees, rightTrees };
};

export const getNumberOfVisibleTrees = (
  currentTree: number,
  trees: number[]
): number => {
  let numberOfVisibleTrees = 0;

  for (let i = 0; i < trees.length; i++) {
    if (trees[i] < currentTree) {
      numberOfVisibleTrees++;
    } else {
      numberOfVisibleTrees++;
      break;
    }
  }

  return numberOfVisibleTrees;
};

export const findHighestScenic = (input: Grid): number => {
  return input
    .map((treeRow, y) =>
      treeRow
        .map((tree, x) => {
          const surroundingTrees = Object.values(
            getSurroundingTrees(input, x, y)
          );

          return surroundingTrees
            .map((trees) => getNumberOfVisibleTrees(tree, trees))
            .reduce((result, value) => result * value, 1);
        })
        .reduce((highest, value) => (highest < value ? value : highest), 0)
    )
    .reduce((highest, value) => (highest < value ? value : highest), 0);
};

export const getTotalVisibleTrees = (input: Grid): number => {
  const gridWidth = input[0].length;
  const gridHeight = input.length;

  const isTreeOnTheEdge = (x: number, y: number) =>
    x === 0 || y === 0 || x === gridWidth - 1 || y === gridHeight - 1;

  const isTreeVisibleFromOutside = (tree: number, x: number, y: number) => {
    const isSmallerTree = (otherTree: number) => tree > otherTree;

    return Object.values(getSurroundingTrees(input, x, y)).some((trees) =>
      trees.every(isSmallerTree)
    );
  };

  return input
    .map((treeRow, y) =>
      treeRow
        .map(
          (tree, x) =>
            isTreeOnTheEdge(x, y) || isTreeVisibleFromOutside(tree, x, y)
        )
        .reduce(
          (totalVisibleTrees, visible) =>
            visible ? totalVisibleTrees + 1 : totalVisibleTrees,
          0
        )
    )
    .reduce((result, value) => result + value, 0);
};

export const getGridFromInput = (input: string[]): Grid => {
  return input.map((row) => row.split("").map((data) => parseInt(data)));
};

const main = async () => {
  const data = await readLinesFromFile("./input/08.txt");

  console.log("part1", getTotalVisibleTrees(getGridFromInput(data)));
  console.log("part2", findHighestScenic(getGridFromInput(data)));
};

main();
