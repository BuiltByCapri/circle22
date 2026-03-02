// COMPASS SCRIPT - Email first, Age/Gender last

// Store user data
let userData = {
    firstName: '',
    email: '',
    age: '',
    gender: '',
    answers: {}
};

let currentQuestion = 0;

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    initCompass();
});

function initCompass() {
    // Initial form submission (Name + Email)
    const initialForm = document.getElementById('initial-form');
    if (initialForm) {
        initialForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Store name and email
            userData.firstName = document.getElementById('first-name').value;
            userData.email = document.getElementById('email').value;
            
            console.log('User data collected:', userData); // Debug
            
            // Show question page
            document.getElementById('landing-page').classList.remove('active');
            document.getElementById('question-page').classList.add('active');
            
            // Load first question
            loadQuestion(0);
        });
    }

    // Previous button
    const prevBtn = document.getElementById('prev-btn');
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            if (currentQuestion > 0) {
                loadQuestion(currentQuestion - 1);
            }
        });
    }

    // Next button
    const nextBtn = document.getElementById('next-btn');
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            // Check if answer is selected
            if (!userData.answers[`q${currentQuestion + 1}`]) {
                alert('Please select an answer before continuing.');
                return;
            }
            
            if (currentQuestion < questions.length - 1) {
                loadQuestion(currentQuestion + 1);
            } else {
                // After Q22, show demographics page
                showDemographicsPage();
            }
        });
    }

    // Demographics form
    const demographicsForm = document.getElementById('demographics-form');
    if (demographicsForm) {
        demographicsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Store age and gender
            userData.age = document.getElementById('age').value;
            userData.gender = document.getElementById('gender').value;
            
            // Calculate and show results
            calculateResults();
        });
    }
}

function loadQuestion(index) {
    currentQuestion = index;
    const question = questions[index];
    
    // Update progress (questions 1-22 = 10% to 90%)
    const progress = 10 + ((index + 1) / questions.length) * 80;
    document.getElementById('progress-fill').style.width = progress + '%';
    
    // Update question display
    document.getElementById('question-number').textContent = `Question ${index + 1} of ${questions.length}`;
    document.getElementById('question-text').textContent = question.text;
    document.getElementById('element-label').textContent = question.element;
    
    // Render answers
    const answersContainer = document.getElementById('answers-container');
    answersContainer.innerHTML = '';
    
    question.answers.forEach((answer, i) => {
        const div = document.createElement('div');
        div.className = 'answer-option';
        div.textContent = answer;
        div.dataset.value = i + 1;
        
        // Check if already answered
        if (userData.answers[`q${index + 1}`] === i + 1) {
            div.classList.add('selected');
        }
        
        div.addEventListener('click', function() {
            // Remove previous selection
            answersContainer.querySelectorAll('.answer-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            
            // Select this answer
            div.classList.add('selected');
            userData.answers[`q${index + 1}`] = parseInt(div.dataset.value);
        });
        
        answersContainer.appendChild(div);
    });
    
    // Update navigation buttons
    document.getElementById('prev-btn').disabled = index === 0;
}

function showDemographicsPage() {
    document.getElementById('question-page').classList.remove('active');
    document.getElementById('demographics-page').classList.add('active');
}

function calculateResults() {
    // Calculate scores for each element
    const scores = {
        needle: 0,
        rose: 0,
        bearing: 0,
        anchor: 0
    };
    
    questions.forEach((q, index) => {
        const answer = userData.answers[`q${index + 1}`];
        scores[q.category] += answer;
    });
    
    // Normalize to 100
    const counts = { needle: 0, rose: 0, bearing: 0, anchor: 0 };
    questions.forEach(q => counts[q.category]++);
    
    const normalizedScores = {
        needle: Math.round((scores.needle / (counts.needle * 5)) * 100),
        rose: Math.round((scores.rose / (counts.rose * 5)) * 100),
        bearing: Math.round((scores.bearing / (counts.bearing * 5)) * 100),
        anchor: Math.round((scores.anchor / (counts.anchor * 5)) * 100)
    };
    
    // Store scores
    userData.needle = normalizedScores.needle;
    userData.rose = normalizedScores.rose;
    userData.bearing = normalizedScores.bearing;
    userData.anchor = normalizedScores.anchor;
    
    // Submit to Google Sheets
    submitToGoogleSheets();
    
    // Show results
    displayResults(normalizedScores);
}

async function submitToGoogleSheets() {
    // Prepare data for submission
    const submissionData = {
        firstName: userData.firstName,
        email: userData.email,
        age: userData.age,
        gender: userData.gender,
        ...userData.answers,
        needle: userData.needle,
        rose: userData.rose,
        bearing: userData.bearing,
        anchor: userData.anchor
    };
    
    // Your Google Apps Script URL
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxBRyLd0K97SDBZlWdrDo5IFWc3uofwiOLeW5yCHcgyyg-rXWsbO4LodgbAKuFtpHzfTg/exec';
    
    try {
        await fetch(scriptURL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(submissionData)
        });
    } catch (error) {
        console.error('Error submitting to Google Sheets:', error);
    }
}

function displayResults(scores) {
    // Hide demographics page
    document.getElementById('demographics-page').classList.remove('active');
    
    // Show results page
    document.getElementById('results-page').classList.add('active');
    
    // Update bars
    setTimeout(() => {
        document.getElementById('needle-bar').style.width = scores.needle + '%';
        document.getElementById('rose-bar').style.width = scores.rose + '%';
        document.getElementById('bearing-bar').style.width = scores.bearing + '%';
        document.getElementById('anchor-bar').style.width = scores.anchor + '%';
    }, 300);
    
    // Update scores
    document.getElementById('needle-score').textContent = scores.needle + '/100';
    document.getElementById('rose-score').textContent = scores.rose + '/100';
    document.getElementById('bearing-score').textContent = scores.bearing + '/100';
    document.getElementById('anchor-score').textContent = scores.anchor + '/100';
    
    // Generate insights
    const insights = generateInsights(scores);
    document.getElementById('insights-text').textContent = insights;
    
    // Draw compass rose
    drawCompassRose(scores);
}

function generateInsights(scores) {
    const dominant = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
    
    const insights = {
        needle: "You show up with clarity and direction. Your communication style is decisive, and you're comfortable taking the lead in connection.",
        rose: "Your energy drives connection. You bring dynamism and momentum to relationships, keeping things engaging and alive.",
        bearing: "You're drawn to depth and authenticity. What captures your attention in others reveals what matters most to you.",
        anchor: "You hold connection with steadiness. Your relationships are built on trust, consistency, and the ability to weather change together."
    };
    
    return insights[dominant];
}

function drawCompassRose(scores) {
    const canvas = document.getElementById('compass-canvas');
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const maxRadius = 120;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw compass rose
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - (scores.needle / 100) * maxRadius);
    ctx.lineTo(centerX + (scores.rose / 100) * maxRadius, centerY);
    ctx.lineTo(centerX, centerY + (scores.bearing / 100) * maxRadius);
    ctx.lineTo(centerX - (scores.anchor / 100) * maxRadius, centerY);
    ctx.closePath();
    
    ctx.fillStyle = 'rgba(139, 46, 46, 0.3)';
    ctx.fill();
    ctx.strokeStyle = '#8B2E2E';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 5, 0, 2 * Math.PI);
    ctx.fillStyle = '#8B2E2E';
    ctx.fill();
    
    // Draw direction lines
    ctx.strokeStyle = '#d4cfc4';
    ctx.lineWidth = 1;
    
    // North
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX, centerY - maxRadius);
    ctx.stroke();
    
    // East
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + maxRadius, centerY);
    ctx.stroke();
    
    // South
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX, centerY + maxRadius);
    ctx.stroke();
    
    // West
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX - maxRadius, centerY);
    ctx.stroke();
    
    // Labels
    ctx.fillStyle = '#8B2E2E';
    ctx.font = '14px Georgia';
    ctx.textAlign = 'center';
    ctx.fillText('N', centerX, centerY - maxRadius - 10);
    ctx.fillText('E', centerX + maxRadius + 15, centerY + 5);
    ctx.fillText('S', centerX, centerY + maxRadius + 20);
    ctx.fillText('W', centerX - maxRadius - 15, centerY + 5);
}
