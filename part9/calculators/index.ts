import { calculateBmi } from './bmiCalculator';
//import { calculateExercises } from "./exerciseCalculator"
import express from 'express';
import { calculateExercises } from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.json({ error: "malformatted parameters" });
    return;
  }

  try {
    const bmiResult = calculateBmi(height, weight);
    res.json({
      weight: weight,
      height: height,
      bmi: bmiResult
    });
  } catch (error) {
    res.json({ error: "malformatted parameters"});
  }
});

app.post("/exercises", (req, res) => {
  const { daily_exercises, target } = req.body;
  
  //check that body exists
  if (!daily_exercises || !target) {
    res.json({ error: "parameters missing" });
    return;
  }

  //check that daily_exercises contains only numbers and target is a number
  if (typeof target !== "number" || !daily_exercises.every(Number.isFinite)) {
    res.json({ error: "malformatted parameters"});
    return;
  }

  try {
    const result = calculateExercises(daily_exercises, target);
    res.json(result);
  } catch (_error) {
    res.json({ error: "malformatted parameters"});
  }

});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});