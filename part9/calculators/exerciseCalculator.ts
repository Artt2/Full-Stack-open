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

export const calculateExercises = (dailyArray: number[], target: number): ExerciseResult => {
  const periodLength: number = dailyArray.length;
  const trainingDays: number = dailyArray.filter(dailyHours => dailyHours > 0).length;
  const average: number = dailyArray.reduce((sum, current) => sum + current, 0) / periodLength;

  const compNumber: number = average / target;

  let rating: number;
  let ratingDescription: string;

  if (compNumber >= 1) {
    rating = 3;
    ratingDescription = "Good job, you got to your goal!";
  } else if (compNumber >= 0.5) {
    rating = 2;
    ratingDescription = "Halfway there at least!";
  } else {
    rating = 2;
    ratingDescription = "Try harder next time!";
  }

  return { 
    periodLength,
    trainingDays,
    target,
    average, 
    success: average >= target,
    rating,
    ratingDescription,
  };
};
