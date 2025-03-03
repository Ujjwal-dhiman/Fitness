function startLoading() {
    document.getElementById('goal-form').classList.add('hidden');
    document.getElementById('loading').classList.remove('hidden');

    setTimeout(() => {
        generatePlan();
        document.getElementById('loading').classList.add('hidden');
        document.getElementById('result').classList.remove('hidden');
    }, 3000);
}

function calculateBMI(weight, height) {
    const bmi = (weight / ((height / 100) ** 2)).toFixed(1);
    let status = '';

    if (bmi < 18.5) {
        status = 'Underweight';
    } else if (bmi >= 18.5 && bmi < 24.9) {
        status = 'Normal weight';
    } else {
        status = 'Overweight';
    }

    return { bmi, status };
}

function calculateMacros(goal, weight) {
    let calories, protein, carbs, fats;

    if (goal === 'lose') {
        calories = weight * 22;
        protein = weight * 2;
        carbs = weight * 2;
        fats = weight * 0.8;
    } else if (goal === 'gain') {
        calories = weight * 30;
        protein = weight * 2.2;
        carbs = weight * 3;
        fats = weight * 1;
    } else {
        calories = weight * 25;
        protein = weight * 2;
        carbs = weight * 2.5;
        fats = weight * 0.9;
    }

    return { calories, protein, carbs, fats };
}

function getWorkoutSplit(goal) {
    const splits = {
        lose: {
            days: [
                { day: 'Day 1', plan: 'Full-Body Strength + HIIT', rest: 'Rest: 30-60 sec' },
                { day: 'Day 2', plan: 'Cardio (45 min)', rest: 'Rest: N/A' },
                { day: 'Day 3', plan: 'Active Rest', rest: 'Rest: N/A' },
                { day: 'Day 4', plan: 'Upper Body Strength', rest: 'Rest: 60 sec' },
                { day: 'Day 5', plan: 'Cardio (Intervals)', rest: 'Rest: N/A' },
            ],
        },
        gain: {
            days: [
                { day: 'Day 1', plan: 'Chest & Triceps', rest: 'Rest: 60-90 sec' },
                { day: 'Day 2', plan: 'Back & Biceps', rest: 'Rest: 60-90 sec' },
                { day: 'Day 3', plan: 'Legs & Abs', rest: 'Rest: 90 sec' },
                { day: 'Day 4', plan: 'Shoulders & Arms', rest: 'Rest: 60 sec' },
            ],
        },
        maintain: {
            days: [
                { day: 'Day 1', plan: 'Full-Body Strength', rest: 'Rest: 60 sec' },
                { day: 'Day 2', plan: 'Cardio (40 min)', rest: 'Rest: N/A' },
                { day: 'Day 3', plan: 'Upper Body Strength', rest: 'Rest: 60 sec' },
            ],
        }
    };

    return splits[goal];
}

function generatePlan() {
    const weight = document.getElementById('weight').value;
    const height = document.getElementById('height').value;
    const goal = document.getElementById('goal').value;

    const { bmi, status } = calculateBMI(weight, height);
    const macros = calculateMacros(goal, weight);
    const workouts = getWorkoutSplit(goal);

    document.getElementById('bmi-result').innerHTML = `<h3>Your BMI: ${bmi} (${status})</h3>`;
    document.getElementById('macro-result').innerHTML = `
        Calories: ${macros.calories} kcal | Protein: ${macros.protein}g | Carbs: ${macros.carbs}g | Fats: ${macros.fats}g
    `;
    document.getElementById('workout-plan').innerHTML = workouts.days.map(day =>
        `<p><strong>${day.day}</strong>: ${day.plan} (${day.rest})</p>`
    ).join('');
}

