import { readCmdLine } from "./helperFunctions";

const [height, weight]: number[] = readCmdLine();

export const bmiCalculator = (height: number, weight: number): string => {
  const checkMeasures = (): boolean => {
    if (isNaN(height) || isNaN(weight)) {
      return false;
    }

    if (height > 220 || height < 140 || weight < 40 || weight > 250) {
      return false;
    }

    return true;
  };

  if (!checkMeasures()) {
    return "malformatted parameters";
  }

  const bmi = 100 * (weight / (2 * height));

  if (bmi >= 30) {
    return "Overweight III (Severely obese)";
  } else if (bmi >= 25) {
    return "Overweight II (Moderately obese)";
  } else if (bmi >= 23) {
    return "Overweight I (At risk)";
  } else if (bmi >= 18.5) {
    return "Normal range (Healthy)";
  } else {
    return "Underweight (Unhealthy)";
  }
};

console.log(bmiCalculator(height, weight));
