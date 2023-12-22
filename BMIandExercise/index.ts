import express from "express";
import { bmiCalculator } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express(); //PORT 3000
const appBMI = express();
const appExercise = express();

appExercise.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

appBMI.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  const bmi = bmiCalculator(height, weight);
  if (bmi === "malformatted parameters") {
    res.status(400).json({
      error: bmi,
    });
  }
  res.json({
    weight: weight,
    height: height,
    bmi: bmi,
  });
});

appExercise.post("/exercise", (req, res) => {
  type ExerciseData = { daily_exercises: Array<number>; target: number };
  const { daily_exercises, target } = req.body as ExerciseData;

  const onlyNumbers = daily_exercises.filter(
    (value) => value === Number(value)
  );

  if (
    onlyNumbers.length !== daily_exercises.length ||
    target !== Number(target)
  ) {
    res.status(400).json({
      error: "malformatted parameters",
    });
  }
  if (daily_exercises.length < 1 || !target) {
    res.status(400).json({
      error: "parameters missing",
    });
  }

  const results = calculateExercises(daily_exercises, target);
  console.log(results);
  res.status(200).json(results);
});

// const PORT = 3000;

// app.listen(PORT);
// appBMI.listen(3003);
appExercise.listen(3002);
