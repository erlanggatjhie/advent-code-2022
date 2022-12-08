import {
  getGridFromInput,
  getNumberOfVisibleTrees,
  getTotalVisibleTrees,
  findHighestScenic,
} from "./08";

describe("getGridFromInput", () => {
  it("returns grid from input ", () => {
    expect(getGridFromInput(["12", "34"])).toEqual([
      [1, 2],
      [3, 4],
    ]);
  });

  it("able to parse test data", () => {
    expect(
      getGridFromInput(["30373", "25512", "65332", "33549", "35390"])
    ).toEqual([
      [3, 0, 3, 7, 3],
      [2, 5, 5, 1, 2],
      [6, 5, 3, 3, 2],
      [3, 3, 5, 4, 9],
      [3, 5, 3, 9, 0],
    ]);
  });
});

describe("getTotalVisibleTrees", () => {
  it("returns 8 because only the edge that is visible", () => {
    expect(
      getTotalVisibleTrees([
        [2, 2, 2],
        [2, 1, 2],
        [2, 2, 2],
      ])
    ).toEqual(8);
  });

  it("checks that visibility of trees surronding it", () => {
    expect(
      getTotalVisibleTrees([
        [3, 3, 3, 3],
        [3, 4, 2, 3],
        [3, 3, 3, 3],
      ])
    ).toEqual(11);
  });

  it("parses test data", () => {
    expect(
      getTotalVisibleTrees([
        [3, 0, 3, 7, 3],
        [2, 5, 5, 1, 2],
        [6, 5, 3, 3, 2],
        [3, 3, 5, 4, 9],
        [3, 5, 3, 9, 0],
      ])
    ).toEqual(21);
  });
});

describe("getNumberOfVisibleTrees", () => {
  it("returns total number of visible trees", () => {
    expect(getNumberOfVisibleTrees(3, [1, 2, 3, 4, 3])).toEqual(3);
  });

  it("returns total number of visible trees part 2", () => {
    expect(getNumberOfVisibleTrees(5, [3, 5, 3])).toEqual(2);
  });

  it("returns total number of visible trees part 3", () => {
    expect(getNumberOfVisibleTrees(5, [3, 6, 3])).toEqual(2);
  });
});

describe("findHighestScenic", () => {
  it("returns highest scenic", () => {
    expect(
      findHighestScenic([
        [3, 0, 3, 7, 3],
        [2, 5, 5, 1, 2],
        [6, 5, 3, 3, 2],
        [3, 3, 5, 4, 9],
        [3, 5, 3, 9, 0],
      ])
    ).toEqual(8);
  });
});
