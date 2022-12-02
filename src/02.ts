import { readFile } from "fs/promises";

type Hand = "Rock" | "Paper" | "Scissors";
type Result = "Win" | "Draw" | "Lose";

const OPPONENT_HAND_DECRYPTION: Record<string, Hand> = {
  A: "Rock",
  B: "Paper",
  C: "Scissors",
};

const OUR_STRATEGY_DECRYPTION: Record<string, Result> = {
  X: "Lose",
  Y: "Draw",
  Z: "Win",
};

const OUR_HAND_SCORE: Record<Hand, number> = {
  Rock: 1,
  Paper: 2,
  Scissors: 3,
};

const SCORE_RULE: Record<Result, number> = {
  Win: 6,
  Draw: 3,
  Lose: 0,
};

const OUR_HAND_AGAINST_OPPONENT: Record<Hand, Record<Result, Hand>> = {
  Rock: {
    Draw: "Rock",
    Win: "Paper",
    Lose: "Scissors",
  },
  Paper: {
    Draw: "Paper",
    Win: "Scissors",
    Lose: "Rock",
  },
  Scissors: {
    Draw: "Scissors",
    Win: "Rock",
    Lose: "Paper",
  },
};

const main = async () => {
  const data = (await readFile("./input/02.txt")).toString();
  const encryptedGuide = data.split("\n").reduce((result, guide) => {
    const [opponentEncryptedHand, ourEncryptedStrategy] = guide.split(" ");

    const ourStrategy = OUR_STRATEGY_DECRYPTION[ourEncryptedStrategy];

    return (
      result +
      SCORE_RULE[ourStrategy] +
      OUR_HAND_SCORE[
        OUR_HAND_AGAINST_OPPONENT[
          OPPONENT_HAND_DECRYPTION[opponentEncryptedHand]
        ][ourStrategy]
      ]
    );
  }, 0);

  console.log("result", encryptedGuide);
};

main();
