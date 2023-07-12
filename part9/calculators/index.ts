import { calculateBmi } from './bmiCalculator';
import express from 'express';
const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  let height = Number(req.query.height);
  let weight = Number(req.query.weight);

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
    })
  } catch (error) {
    res.json({ error: "malformatted parameters"})
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});