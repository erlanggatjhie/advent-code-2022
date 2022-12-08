import {
  getAnswer,
  getFileStructureFromInput,
  getTotalSizeOfDirectory,
  getDirectoriesAndTotalSize,
} from "./07";

describe("getFileStructureFromInput", () => {
  it("returns root directory file structure", () => {
    expect(
      getFileStructureFromInput([
        "$ cd /",
        "$ ls",
        "dir a",
        "20 b.txt",
        "30 c",
        "dir d",
      ])
    ).toEqual({
      a: {},
      "b.txt": 20,
      c: 30,
      d: {},
    });
  });

  it("knows how to go to a dir", () => {
    expect(
      getFileStructureFromInput([
        "$ cd /",
        "$ ls",
        "dir a",
        "$ cd a",
        "$ ls",
        "10 a1.txt",
        "dir b",
        "$ cd b",
        "20 b1.txt",
      ])
    ).toEqual({
      a: {
        "a1.txt": 10,
        b: {
          "b1.txt": 20,
        },
      },
    });
  });

  it("knows how to go to a dir", () => {
    expect(
      getFileStructureFromInput([
        "$ cd /",
        "$ ls",
        "dir a",
        "$ cd a",
        "$ ls",
        "10 a1.txt",
        "dir b",
        "$ cd b",
        "20 b1.txt",
      ])
    ).toEqual({
      a: {
        "a1.txt": 10,
        b: {
          "b1.txt": 20,
        },
      },
    });
  });

  it("knows how to go to previous dir", () => {
    expect(
      getFileStructureFromInput([
        "$ cd /",
        "$ ls",
        "dir a",
        "dir b",
        "$ cd a",
        "$ ls",
        "10 a1.txt",
        "$ cd ..",
        "$ cd b",
        "20 b1.txt",
      ])
    ).toEqual({
      a: {
        "a1.txt": 10,
      },
      b: {
        "b1.txt": 20,
      },
    });
  });

  it("knows how to parse test input", () => {
    expect(
      getFileStructureFromInput([
        "$ cd /",
        "$ ls",
        "dir a",
        "14848514 b.txt",
        "8504156 c.dat",
        "dir d",
        "$ cd a",
        "$ ls",
        "dir e",
        "29116 f",
        "2557 g",
        "62596 h.lst",
        "$ cd e",
        "$ ls",
        "584 i",
        "$ cd ..",
        "$ cd ..",
        "$ cd d",
        "$ ls",
        "4060174 j",
        "8033020 d.log",
        "5626152 d.ext",
        "7214296 k",
      ])
    ).toEqual({
      a: {
        e: {
          i: 584,
        },
        f: 29116,
        g: 2557,
        "h.lst": 62596,
      },
      "b.txt": 14848514,
      "c.dat": 8504156,
      d: {
        j: 4060174,
        "d.log": 8033020,
        "d.ext": 5626152,
        k: 7214296,
      },
    });
  });
});

describe("getTotalSizeOfDirectory", () => {
  it("returns total size of directory", () => {
    expect(
      getTotalSizeOfDirectory({
        a: 10,
        b: 20,
        c: 30,
      })
    ).toEqual(60);
  });

  it("returns total size of directory with nested dir", () => {
    expect(
      getTotalSizeOfDirectory({
        a: {
          a1: 20,
          a2: 30,
        },
        b: 20,
        c: 30,
      })
    ).toEqual(100);
  });
});

describe("getDirectoriesAndTotalSize", () => {
  it("returns directories and total size", () => {
    expect(
      getDirectoriesAndTotalSize({
        a: {
          a1: 20,
          a2: 30,
        },
        b: 20,
        c: 30,
      })
    ).toEqual({
      a: 50,
    });
  });

  it("returns directories and total size with nested dir", () => {
    expect(
      getDirectoriesAndTotalSize({
        a: {
          a1: 20,
          a2: 30,
          a3: {
            a31: 20,
            a32: 50,
            a: {
              a3: 10,
            },
          },
        },
        b: {
          b1: 20,
        },
      })
    ).toEqual({
      a: 130,
      "a.a3": 80,
      "a.a3.a": 10,
      b: 20,
    });
  });
});

describe("getAnswer", () => {
  it("returns total size of directories", () => {
    expect(
      getAnswer(
        {
          a: 20,
          b: 120,
          c: 90,
          d: 50,
          e: 130,
        },
        100
      )
    ).toEqual(160);
  });
});
