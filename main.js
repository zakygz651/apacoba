let currentStep = 1;
const totalSteps = 10; // Update to 10 steps
const answers = {};

function showStep(step) {
    // Hide all steps
    for (let i = 1; i <= totalSteps; i++) {
        document.getElementById(`step-${i}`).style.display = 'none';
        document.getElementById(`step-${i}-answer`).style.display = 'none';
    }
    // Show current step
    document.getElementById(`step-${step}`).style.display = 'block';
    document.getElementById(`step-${step}-answer`).style.display = 'block';

    // Show/Hide buttons
    document.getElementById('prevBtn').style.display = step > 1 ? 'inline' : 'none';
    document.getElementById('nextBtn').style.display = step < totalSteps ? 'inline' : 'none';
    document.getElementById('submitBtn').style.display = step === totalSteps ? 'inline' : 'none';
}

function changeStep(stepDiff) {
    const currentAnswers = document.querySelectorAll(`#step-${currentStep}-answer button`);
    let answered = false;
    currentAnswers.forEach(button => {
        if (button.classList.contains('selected')) {
            answered = true;
        }
    });
    if (!answered) {
        alert('Silakan pilih jawaban sebelum melanjutkan.');
        return;
    }

    currentStep += stepDiff;
    if (currentStep < 1) currentStep = 1;
    if (currentStep > totalSteps) {
        calculateScore();
        return;
    }
    showStep(currentStep);
}

function selectAnswer(step, value) {
    answers[step] = value;

    const buttons = document.querySelectorAll(`#step-${step}-answer button`);
    buttons.forEach(button => {
        button.classList.remove('selected');
    });

    const selectedButton = event.target;
    selectedButton.classList.add('selected');
}

function calculateScore() {
    let score = 0;
    for (let i = 1; i <= totalSteps; i++) {
        if (answers[i] !== undefined) {
            score += answers[i];
        }
    }
    // Hide all questions and answers
    for (let i = 1; i <= totalSteps; i++) {
        document.getElementById(`step-${i}`).style.display = 'none';
        document.getElementById(`step-${i}-answer`).style.display = 'none';
    }
    // Show result
    document.getElementById('totalScore').innerText = score;

    // Determine message and image based on score
    let message = '';
    let imagePath = '';
    if (score >= 100) {
        message = 'Wow Anda Psatier Handal🤓☝️';
        imagePath = 'foto1.jpg'; // 180-200
    } else if (score >= 80) {
        message = 'Lumayan Lahk Luwh Jdi Pesamtir😂☝️.';
        imagePath = 'foto2.jpg'; // 140-180
    } else if (score >= 60) {
        message = 'Lush Pesamtir Amatier,Belajar Lagi Sana👿☝️🖕🖕';
        imagePath = 'foto3.jpg'; // 100-140
    } else if (score >= 40) {
        message = 'Aoa Coba Dek😂🤣🖕☝️☝️';
        imagePath = 'foto4.jpg'; // 60-100
    } else {
        message = 'Luwh Suki Kan Njink🤣☝️';
        imagePath = 'foto5.jpg'; // 0-60
    }
    document.getElementById('resultMessage').innerText = message;
    document.getElementById('result-img').src = imagePath;
    document.getElementById('result-img').style.display = 'block';
    document.getElementById('result').style.display = 'block';

    // Hide navigation buttons
    document.getElementById('prevBtn').style.display = 'none';
    document.getElementById('nextBtn').style.display = 'none';
    document.getElementById('submitBtn').style.display = 'none';
}

// Initialize first step
showStep(currentStep);
