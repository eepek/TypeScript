import { readCmdLine } from "./helperFunctions";

const input: number[] = readCmdLine();

interface ExerciseFormat {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  hours: Array<number>,
  targetHours: number
) => {
  const periodLength = hours.length;
  const trainingDays = hours.filter((day) => day > 0);
  const averageTrainingTime =
    trainingDays.reduce(
      (total: number, current: number): number => total + current,
      0
    ) / periodLength;
  const success = averageTrainingTime >= targetHours ? true : false;
  let ratingDescription = "";
  let rating = 1;
  if (success) {
    ratingDescription = "Great job, you achieved your goal!";
    rating = 3;
  } else if (!success && averageTrainingTime / targetHours > 0.6) {
    ratingDescription = "Almost there, next week you are gonna hit your goal!";
    rating = 2;
  } else {
    ratingDescription = "Well rested for the next week, let's go get that 3";
    rating = 1;
  }

  //for command line
  if (hours.includes(NaN) || isNaN(targetHours)) {
    return "malformatted parameters";
  } else if (hours.length < 1 || !targetHours) {
    return "parameters missing";
  }

  const result: ExerciseFormat = {
    periodLength: periodLength,
    trainingDays: trainingDays.length,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: targetHours,
    average: averageTrainingTime,
  };

  return result;
};

if (input.includes(NaN) || input.length < 2) {
  console.log("Please check your input!");
} else {
  const [target, ...training] = input;
  console.log(calculateExercises(training, target));
}
