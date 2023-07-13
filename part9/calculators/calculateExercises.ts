import { calculateExercises, isNotNumber } from "./exerciseCalculator";

try {
  const paramArray: number[] = [];
  let i: number = 2;
  let target: number = 1;

  while (true) {
    const current = process.argv[i];

    if (current === undefined) {  //if a argument is undefined, we've reached the end of arguments
      if (paramArray.length < 1) {  //if not enough arguments were given
        throw new Error("Invalid amount of arguments");
      }
      break;  //break out and call calculateExercises
    }

    if (isNotNumber(current)) { //if argument is not a number, throw error
      throw new Error("A argument wasn't a number");
    }

    if (i == 2) { //first argument is the target
      target = Number(process.argv[2]);
    } else {
      paramArray.push(Number(current));
    }

    i++;
  }

  console.log(calculateExercises(paramArray, target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}