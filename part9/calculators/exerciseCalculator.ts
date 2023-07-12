interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
}

export const isNotNumber = (argument: any): boolean => isNaN(Number(argument));

const calculateExercises = (dailyArray: number[], target: number): ExerciseResult => {
  const periodLength: number = dailyArray.length
  const trainingDays: number = dailyArray.filter(dailyHours => dailyHours > 0).length
  const average: number = dailyArray.reduce((sum, current) => sum + current, 0) / periodLength;

  const compNumber: number = average / target;

  let rating: number;
  let ratingDescription;

  if (compNumber >= 1) {
    rating = 3;
    ratingDescription = "Good job, you got to your goal!"
  } else if (compNumber >= 0.5) {
    rating = 2;
    ratingDescription = "Halfway there at least!"
  } else if (compNumber >= 0) {
    rating = 2;
    ratingDescription = "Try harder next time!"
  }

  return { 
    periodLength,
    trainingDays,
    target,
    average, 
    success: average >= target,
    rating,
    ratingDescription,
  }
}

try {
  let paramArray: number[] = [];
  let i: number = 2;
  let target: number;

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
      paramArray.push(Number(current))
    }

    i++;
  }

  console.log(calculateExercises(paramArray, target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}