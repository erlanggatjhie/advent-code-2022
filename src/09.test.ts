import {
  isAdjacent,
  move,
  moveTail,
  parseDirectionsFromInput,
  getNumberOfTailsVisited,
  Coordinate,
  Direction,
} from "./09";

describe("isAdjacent", () => {
  it.each<{ location1: Coordinate; location2: Coordinate; expected: boolean }>([
    { location1: [0, 0], location2: [0, 1], expected: true },
    { location1: [0, 0], location2: [1, 1], expected: true },
    { location1: [0, 0], location2: [1, 0], expected: true },
    { location1: [0, 0], location2: [1, -1], expected: true },
    { location1: [0, 0], location2: [0, -1], expected: true },
    { location1: [0, 0], location2: [-1, -1], expected: true },
    { location1: [0, 0], location2: [-1, 0], expected: true },
    { location1: [0, 0], location2: [-1, 1], expected: true },
    { location1: [0, 0], location2: [0, 2], expected: false },
    { location1: [0, 0], location2: [1, 2], expected: false },
    { location1: [0, 0], location2: [2, 0], expected: false },
    { location1: [0, 0], location2: [2, -2], expected: false },
    { location1: [0, 0], location2: [0, -2], expected: false },
    { location1: [0, 0], location2: [-2, -2], expected: false },
    { location1: [0, 0], location2: [-2, 0], expected: false },
    { location1: [0, 0], location2: [-2, 2], expected: false },
  ])(
    "returns $expected if location1: $location1 and location2: $location2",
    ({ location1, location2, expected }) => {
      expect(isAdjacent(location1, location2)).toBe(expected);
    }
  );
});

describe("move", () => {
  it.each<{
    current: Coordinate;
    direction: Direction;
    expected: Coordinate;
  }>([
    { current: [0, 0], direction: "L", expected: [-1, 0] },
    { current: [0, 0], direction: "R", expected: [1, 0] },
    { current: [0, 0], direction: "U", expected: [0, 1] },
    { current: [0, 0], direction: "D", expected: [0, -1] },
    { current: [0, 0], direction: "UR", expected: [1, 1] },
    { current: [0, 0], direction: "DR", expected: [1, -1] },
    { current: [0, 0], direction: "DL", expected: [-1, -1] },
    { current: [0, 0], direction: "UL", expected: [-1, 1] },
  ])(
    "returns $expected if current: $current and direction: $direction",
    ({ current, direction, expected }) => {
      expect(move(current, direction)).toEqual(expected);
    }
  );
});

describe("moveTail", () => {
  it.each<{
    headLocation: Coordinate;
    tailCurrentLocation: Coordinate;
    expected: Coordinate;
  }>([
    { headLocation: [0, 0], tailCurrentLocation: [0, 0], expected: [0, 0] },
    { headLocation: [1, 0], tailCurrentLocation: [0, 0], expected: [0, 0] },
    { headLocation: [2, 0], tailCurrentLocation: [0, 0], expected: [1, 0] },
    { headLocation: [-1, 0], tailCurrentLocation: [0, 0], expected: [0, 0] },
    { headLocation: [-2, 0], tailCurrentLocation: [0, 0], expected: [-1, 0] },
    { headLocation: [0, 1], tailCurrentLocation: [0, 0], expected: [0, 0] },
    { headLocation: [0, 2], tailCurrentLocation: [0, 0], expected: [0, 1] },
    { headLocation: [0, -1], tailCurrentLocation: [0, 0], expected: [0, 0] },
    { headLocation: [0, -2], tailCurrentLocation: [0, 0], expected: [0, -1] },
    { headLocation: [1, 1], tailCurrentLocation: [0, 0], expected: [0, 0] },
    { headLocation: [1, 2], tailCurrentLocation: [0, 0], expected: [1, 1] },
    { headLocation: [-1, 1], tailCurrentLocation: [0, 0], expected: [0, 0] },
    { headLocation: [-1, 2], tailCurrentLocation: [0, 0], expected: [-1, 1] },
    { headLocation: [-1, -1], tailCurrentLocation: [0, 0], expected: [0, 0] },
    { headLocation: [-1, -2], tailCurrentLocation: [0, 0], expected: [-1, -1] },
    { headLocation: [1, -1], tailCurrentLocation: [0, 0], expected: [0, 0] },
    { headLocation: [1, -2], tailCurrentLocation: [0, 0], expected: [1, -1] },
    { headLocation: [-1, 1], tailCurrentLocation: [1, 0], expected: [0, 1] },
    { headLocation: [-1, -1], tailCurrentLocation: [1, 0], expected: [0, -1] },
    { headLocation: [2, 2], tailCurrentLocation: [0, 0], expected: [1, 1] },
    { headLocation: [-2, -2], tailCurrentLocation: [0, 0], expected: [-1, -1] },
    { headLocation: [-2, 2], tailCurrentLocation: [0, 0], expected: [-1, 1] },
    { headLocation: [2, -2], tailCurrentLocation: [0, 0], expected: [1, -1] },
  ])(
    "returns $expected if headLocation: $headLocation and tailCurrentLocation: $tailCurrentLocation",
    ({ headLocation, tailCurrentLocation, expected }) => {
      expect(moveTail(headLocation, tailCurrentLocation)).toEqual(expected);
    }
  );
});

describe("parseDirectionsFromInput", () => {
  it("parses directions", () => {
    expect(parseDirectionsFromInput(["R 4", "U 2", "D 1", "L 3"])).toEqual([
      "R",
      "R",
      "R",
      "R",
      "U",
      "U",
      "D",
      "L",
      "L",
      "L",
    ]);
  });
});

describe("getNumberOfTailsVisited", () => {
  it.each<{ directions: Direction[]; numberOfKnots: number; expected: number }>(
    [
      {
        directions: ["R", "R", "U", "U"],
        numberOfKnots: 2,
        expected: 3,
      },
      {
        directions: ["R", "R", "L", "L"],
        numberOfKnots: 2,
        expected: 2,
      },
      {
        directions: ["U", "D"],
        numberOfKnots: 2,
        expected: 1,
      },
      {
        directions: [
          "R",
          "R",
          "R",
          "R",
          "U",
          "U",
          "U",
          "U",
          "L",
          "L",
          "L",
          "D",
          "R",
          "R",
          "R",
          "R",
          "D",
          "L",
          "L",
          "L",
          "L",
          "L",
          "R",
          "R",
        ],
        numberOfKnots: 2,
        expected: 13,
      },
      {
        directions: [
          "R",
          "R",
          "R",
          "R",
          "U",
          "U",
          "U",
          "U",
          "L",
          "L",
          "L",
          "D",
          "R",
          "R",
          "R",
          "R",
          "D",
          "L",
          "L",
          "L",
          "L",
          "L",
          "R",
          "R",
        ],
        numberOfKnots: 10,
        expected: 1,
      },
      {
        directions: parseDirectionsFromInput([
          "R 5",
          "U 8",
          "L 8",
          "D 3",
          "R 17",
          "D 10",
          "L 25",
          "U 20",
        ]),
        numberOfKnots: 10,
        expected: 36,
      },
    ]
  )(
    "returns $expected if directions: $directions & numberOfKnots: $numberOfKnots",
    ({ directions, numberOfKnots, expected }) => {
      expect(getNumberOfTailsVisited(directions, numberOfKnots)).toBe(expected);
    }
  );
});
