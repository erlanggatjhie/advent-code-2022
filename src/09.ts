import { readLinesFromFile } from "./utils";

export type Coordinate = [number, number];

export type Direction = "U" | "L" | "D" | "R" | "UR" | "DR" | "DL" | "UL";

export const move = ([x, y]: Coordinate, command: Direction): Coordinate => {
  switch (command) {
    case "U":
      return [x, y + 1];
    case "D":
      return [x, y - 1];
    case "R":
      return [x + 1, y];
    case "L":
      return [x - 1, y];
    default:
      return command
        .split("")
        .reduce((result, c) => move(result, c as Direction), [
          x,
          y,
        ] as Coordinate);
  }
};

export const moveTail = (head: Coordinate, tail: Coordinate): Coordinate => {
  if (isAdjacent(head, tail)) {
    return tail;
  }

  if (head[0] === tail[0]) {
    return move(tail, head[1] > tail[1] ? "U" : "D");
  } else if (head[1] === tail[1]) {
    return move(tail, head[0] > tail[0] ? "R" : "L");
  } else if (isAdjacent(head, move(tail, "UR"))) {
    return move(tail, "UR");
  } else if (isAdjacent(head, move(tail, "UL"))) {
    return move(tail, "UL");
  } else if (isAdjacent(head, move(tail, "DR"))) {
    return move(tail, "DR");
  } else if (isAdjacent(head, move(tail, "DL"))) {
    return move(tail, "DL");
  }

  return tail;
};

export const parseDirectionsFromInput = (input: string[]): Direction[] =>
  input.flatMap((data) => {
    const [command, numberOfTimes] = data.split(" ");
    return Array(parseInt(numberOfTimes))
      .fill(null)
      .map(() => command as Direction);
  });

export const isAdjacent = (
  [x1, y1]: Coordinate,
  [x2, y2]: Coordinate
): boolean => x1 - 1 <= x2 && x2 <= x1 + 1 && y1 - 1 <= y2 && y2 <= y1 + 1;

export const getNumberOfTailsVisited = (
  directions: Direction[],
  numberOfKnots: number
): number => {
  const result: Record<string, number> = {};

  let ropes: Coordinate[] = Array(numberOfKnots)
    .fill(0)
    .map(() => [0, 0]);

  const addToResult = (coordinates: Coordinate[]) => {
    const key = JSON.stringify(coordinates.slice(-1));

    if (result[key]) {
      result[key] += 1;
    } else {
      result[key] = 1;
    }
    result[key] ? result[key]++ : result[key];
  };

  addToResult(ropes);

  directions.forEach((direction) => {
    ropes = ropes.reduce((knots, tail, index) => {
      if (index === 0) {
        return [move(tail, direction)];
      }

      const head = knots.slice(-1)[0];

      return [...knots, moveTail(head, tail)];
    }, [] as Coordinate[]);

    addToResult(ropes);
  });

  return Object.keys(result).length;
};

const main = async () => {
  const input = await readLinesFromFile("./input/09.txt");
  console.log(
    "part1",
    getNumberOfTailsVisited(parseDirectionsFromInput(input), 2)
  );

  console.log(
    "part2",
    getNumberOfTailsVisited(parseDirectionsFromInput(input), 10)
  );
};

main();
