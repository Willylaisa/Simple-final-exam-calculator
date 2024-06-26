document.getElementById('addAssessments').addEventListener('click', addAssessments);
document.getElementById('calculateButton').addEventListener('click', calculateFinalExam);

function addAssessments() {
    const assessmentCount = document.getElementById('assessmentCount').value;
    if (!assessmentCount || assessmentCount <= 0) {
        alert("Please enter a valid assessment count.");
        return;
    }
    const assessmentsContainer = document.getElementById('assessments');
    assessmentsContainer.innerHTML = '';

    for (let i = 0; i < assessmentCount; i++) {
        const assessmentDiv = document.createElement('div');
        assessmentDiv.className = 'input-group';
        assessmentDiv.innerHTML = `
            <h3>Assessment ${i + 1}</h3>
            <label for="score${i}">Raw Marks: </label>
            <input type="number" id="score${i}" />
            <label for="total${i}"> Out of: </label>
            <input type="number" id="total${i}" />
            <label for="weight${i}"> Weight(%): </label>
            <input type="number" id="weight${i}" />
        `;
        assessmentsContainer.appendChild(assessmentDiv);
    }
}

function calculateFinalExam() {
    const assessmentCount = document.getElementById('assessmentCount').value;
    if (!assessmentCount || assessmentCount <= 0) {
        alert("Please enter a valid assessment count.");
        return;
    }
    const desiredGrade = document.getElementById('desiredGrade').value;
    if (!desiredGrade || desiredGrade <= 0 || desiredGrade > 100) {
        alert("Please enter a valid desired grade (1-100).");
        return;
    }
    let finalExamWeight = 100;
    let totalGrades = 0;

    for (let i = 0; i < assessmentCount; i++) {
        const scoreInput = document.getElementById(`score${i}`);
        const totalInput = document.getElementById(`total${i}`);
        const weightInput = document.getElementById(`weight${i}`);

        if (!scoreInput.value || !totalInput.value || !weightInput.value) {
            alert(`Please enter all values for Assessment ${i + 1}.`);
            return;
        }

        const score = parseFloat(scoreInput.value);
        const total = parseFloat(totalInput.value);
        const weight = parseFloat(weightInput.value);

        if (isNaN(score) || isNaN(total) || isNaN(weight)) {
            alert(`Invalid input for Assessment ${i + 1}. Please enter numbers only.`);
            return;
        }

        if (score < 0 || total <= 0 || weight < 0) {
            alert(`Invalid input for Assessment ${i + 1}. Please enter positive numbers only.`);
            return;
        }

        totalGrades += (score / total) * weight;
        finalExamWeight -= weight;
    }

    if (finalExamWeight < 0) {
        alert("Total weight exceeds 100%. Please adjust the weights.");
        return;
    }

    const requiredGrade = ((desiredGrade - totalGrades) * 100) / finalExamWeight;
    const resultDiv = document.getElementById('result');

    if (requiredGrade > 100) {
        resultDiv.innerHTML = `:( Sorry mate! You need to get ${requiredGrade.toFixed(2)}% in the final exam to score ${desiredGrade}% in this unit. Try harder next time.`;
    } else {
        resultDiv.innerHTML = `:) WooHoo!!! You just need to get ${requiredGrade.toFixed(2)}% in the final exam to score ${desiredGrade}% in this unit. You got this!!!`;
    }
}