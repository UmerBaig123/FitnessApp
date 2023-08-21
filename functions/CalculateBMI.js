
const calculateBMI = (data) => {
    // Convert height from cm to m
    let activityLevel = [0, 1.3, 1.55, 1.65, 1.8, 2]
    let genderDif = 1
    if (data.Gender == "female") {
        genderDif = 0.9
    }
    let caloricDif = [null,-600,-300,0,300,600]
    let weightKg = data.weight
    if(data.weightUnit=="LBS"){
        weightKg = weightKg/2.2
    }
    let heightInMeters = data.heightFt*0.3048+data.heightIn*0.0254
    let bmi = weightKg / (heightInMeters * heightInMeters);
    let calorie = weightKg * genderDif * 24 * 0.925 * activityLevel[data.Activity]
    let calorieIn = calorie + caloricDif[data.Goal]
    let carbs = calorieIn*0.128
    let protien = calorieIn*0.045
    let fat = calorieIn *0.0305
    return [bmi.toFixed(2), calorieIn.toFixed(0),carbs.toFixed(0),protien.toFixed(0),fat.toFixed(0)];
}
export default calculateBMI;