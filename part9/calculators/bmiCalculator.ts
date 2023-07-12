const calculateBmi = (height: number, weight: number): string => {
  const heightInMeters: number = height / 100;
  const bmi: number =  weight / (heightInMeters * heightInMeters);

  let bmiCategory: string;

  switch(true) {
    case bmi < 18.5:
      bmiCategory = "Underweight";
      break;
    case bmi < 25:
      bmiCategory = "Normal (healthy weight)";
      break;
    case bmi < 30:
      bmiCategory = "Over Weight";
      break;
    case bmi < 40:
      bmiCategory = "Obesity";
      break;
    case bmi >= 40:
      bmiCategory = "Morbid Obesity";
      break;
    default:
      throw new Error("Invalid arguments.")
  }

  return bmiCategory
}

console.log(calculateBmi(Number(process.argv[2]), Number(process.argv[3])))