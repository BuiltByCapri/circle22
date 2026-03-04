// COMPASS SCRIPT - Fixed to work with your questions.js format

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
            // Check if answer is selected (skip for text questions)
            const question = questions[currentQuestion];
            if (question.type !== 'text' && !userData.answers[`q${currentQuestion + 1}`]) {
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
    document.getElementById('element-label').textContent = `${question.element} - ${question.elementLabel}`;
    
    // Render answers
    const answersContainer = document.getElementById('answers-container');
    answersContainer.innerHTML = '';
    
    // Handle text input questions
    if (question.type === 'text') {
        const textarea = document.createElement('textarea');
        textarea.id = `text-answer-${index}`;
        textarea.placeholder = question.placeholder || '';
        textarea.style.cssText = 'width: 100%; min-height: 120px; padding: 15px; font-size: 16px; font-family: Georgia, serif; border: 2px solid #d4cfc4; margin-bottom: 20px;';
        
        // Load saved answer if exists
        if (userData.answers[`q${index + 1}`]) {
            textarea.value = userData.answers[`q${index + 1}`];
        }
        
        // Save on change
        textarea.addEventListener('input', function() {
            userData.answers[`q${index + 1}`] = textarea.value;
        });
        
        answersContainer.appendChild(textarea);
        
        if (question.helperText) {
            const helper = document.createElement('p');
            helper.style.cssText = 'font-size: 14px; color: #6d6d6d; font-style: italic;';
            helper.textContent = question.helperText;
            answersContainer.appendChild(helper);
        }
    } 
    // Handle single/multiple choice
    else {
        question.options.forEach((option, i) => {
            const div = document.createElement('div');
            div.className = 'answer-option';
            div.textContent = option.text;
            div.dataset.value = option.value;
            
            // Check if already answered
            const savedAnswer = userData.answers[`q${index + 1}`];
            if (question.type === 'multiple') {
                // Multiple choice
                if (savedAnswer && savedAnswer.includes(option.value)) {
                    div.classList.add('selected');
                }
            } else {
                // Single choice
                if (savedAnswer === option.value) {
                    div.classList.add('selected');
                }
            }
            
            div.addEventListener('click', function() {
                if (question.type === 'multiple') {
                    // Multiple choice logic
                    const maxSelections = question.maxSelections || 2;
                    const currentSelections = answersContainer.querySelectorAll('.answer-option.selected');
                    
                    if (div.classList.contains('selected')) {
                        // Deselect
                        div.classList.remove('selected');
                        const current = userData.answers[`q${index + 1}`] || [];
                        userData.answers[`q${index + 1}`] = current.filter(v => v !== option.value);
                    } else if (currentSelections.length < maxSelections) {
                        // Select
                        div.classList.add('selected');
                        const current = userData.answers[`q${index + 1}`] || [];
                        current.push(option.value);
                        userData.answers[`q${index + 1}`] = current;
                    }
                } else {
                    // Single choice - remove previous selection
                    answersContainer.querySelectorAll('.answer-option').forEach(opt => {
                        opt.classList.remove('selected');
                    });
                    
                    // Select this answer
                    div.classList.add('selected');
                    userData.answers[`q${index + 1}`] = option.value;
                }
            });
            
            answersContainer.appendChild(div);
        });
    }
    
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
    
    const counts = {
        needle: 0,
        rose: 0,
        bearing: 0,
        anchor: 0
    };
    
    // Score mapping: A=5, B=4, C=3, D=2
    const scoreMap = { 'A': 5, 'B': 4, 'C': 3, 'D': 2 };
    
    questions.forEach((q, index) => {
        const answer = userData.answers[`q${index + 1}`];
        const element = q.element.toLowerCase().replace('the ', '');
        
        // Skip open text and invalid elements
        if (!['needle', 'rose', 'bearing', 'anchor'].includes(element)) {
            return;
        }
        
        if (q.type === 'multiple' && Array.isArray(answer)) {
            // Multiple choice - average the scores
            answer.forEach(val => {
                scores[element] += scoreMap[val] || 0;
            });
            counts[element] += answer.length;
        } else if (answer) {
            // Single choice
            scores[element] += scoreMap[answer] || 0;
            counts[element] += 1;
        }
    });
    
    // Normalize to 100
    const normalizedScores = {
        needle: counts.needle > 0 ? Math.round((scores.needle / (counts.needle * 5)) * 100) : 0,
        rose: counts.rose > 0 ? Math.round((scores.rose / (counts.rose * 5)) * 100) : 0,
        bearing: counts.bearing > 0 ? Math.round((scores.bearing / (counts.bearing * 5)) * 100) : 0,
        anchor: counts.anchor > 0 ? Math.round((scores.anchor / (counts.anchor * 5)) * 100) : 0
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
    const scriptURL = 'https://script.google.com/macros/s/AKfycbylIay4e1oJCEwhi4wp3XjWLb25SXFWdr6Kr9YP4lAG9OvEuyA-wJFJWHUZ7ng21JlBvg/exec';
    
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
    
    // Setup download button
    setupDownload(scores);
}

function generateInsights(scores) {
    // Find dominant and secondary elements
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const dominant = sorted[0][0];
    const secondary = sorted[1][0];
    const dominantScore = sorted[0][1];
    const secondaryScore = sorted[1][1];
    
    // Determine if there's a clear dominant or if it's balanced
    const isBalanced = dominantScore - secondaryScore < 15;
    
    // Element descriptions
    const profiles = {
        needle: {
            high: "You lead with clarity and directness in connection. Your communication style is straightforward—people know where they stand with you.",
            low: "You take a measured approach to showing up. You reveal yourself gradually, letting connection unfold at its own pace."
        },
        rose: {
            high: "Your energy is dynamic and engaging. You bring momentum to connection, keeping things alive and moving forward.",
            low: "You move at a steady, intentional pace. You value depth over intensity and prefer connections that build gradually."
        },
        bearing: {
            high: "You're drawn to substance and depth. What captures your attention reveals what matters most to you—authenticity, curiosity, presence.",
            low: "You're open to different types of connection. You notice various qualities in others and don't lead with specific criteria."
        },
        anchor: {
            high: "You hold connection with intention and consistency. Once you're invested, you show up reliably and build trust over time.",
            low: "You stay flexible in how connection develops. You adapt to what the moment requires rather than following a set pattern."
        }
    };
    
    // Build personalized insight
    let insight = '';
    
    if (isBalanced) {
        // Balanced profile - describe the interplay
        insight = `${profiles[dominant].high} ${profiles[secondary].high.charAt(0).toLowerCase() + profiles[secondary].high.slice(1)} Your approach balances both qualities naturally.`;
    } else {
        // Clear dominant element
        insight = profiles[dominant].high;
        
        // Add context about their lower scores
        const lowest = sorted[3][0];
        const lowestScore = sorted[3][1];
        
        if (lowestScore < 40) {
            insight += ` ${profiles[lowest].low}`;
        } else {
            insight += ` You also ${profiles[secondary].high.charAt(0).toLowerCase() + profiles[secondary].high.slice(1)}`;
        }
    }
    
    return insight;
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

function setupDownload(scores) {
    const downloadBtn = document.getElementById('download-btn');
    const shareBtn = document.getElementById('share-btn');
    
    // Create canvas function (used by both download and share)
    const createResultsCanvas = () => {
        const cardCanvas = document.createElement('canvas');
        cardCanvas.width = 800;
        cardCanvas.height = 1000;
        const ctx = cardCanvas.getContext('2d');
        
        // Background
        ctx.fillStyle = '#F5F1E8';
        ctx.fillRect(0, 0, 800, 1000);
        
        // Title
        ctx.fillStyle = '#8B2E2E';
        ctx.font = 'bold 48px Georgia';
        ctx.textAlign = 'center';
        ctx.fillText('Your Compass Results', 400, 80);
        
        // Name
        ctx.fillStyle = '#05081C';
        ctx.font = '24px Georgia';
        ctx.fillText(userData.firstName, 400, 130);
        
        // Draw compass rose (larger)
        const centerX = 400;
        const centerY = 320;
        const maxRadius = 150;
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY - (scores.needle / 100) * maxRadius);
        ctx.lineTo(centerX + (scores.rose / 100) * maxRadius, centerY);
        ctx.lineTo(centerX, centerY + (scores.bearing / 100) * maxRadius);
        ctx.lineTo(centerX - (scores.anchor / 100) * maxRadius, centerY);
        ctx.closePath();
        
        ctx.fillStyle = 'rgba(139, 46, 46, 0.3)';
        ctx.fill();
        ctx.strokeStyle = '#8B2E2E';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        // Center circle
        ctx.beginPath();
        ctx.arc(centerX, centerY, 6, 0, 2 * Math.PI);
        ctx.fillStyle = '#8B2E2E';
        ctx.fill();
        
        // Direction lines
        ctx.strokeStyle = '#d4cfc4';
        ctx.lineWidth = 2;
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX, centerY - maxRadius);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + maxRadius, centerY);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX, centerY + maxRadius);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX - maxRadius, centerY);
        ctx.stroke();
        
        // Labels
        ctx.fillStyle = '#8B2E2E';
        ctx.font = '20px Georgia';
        ctx.textAlign = 'center';
        ctx.fillText('N', centerX, centerY - maxRadius - 15);
        ctx.fillText('E', centerX + maxRadius + 20, centerY + 7);
        ctx.fillText('S', centerX, centerY + maxRadius + 30);
        ctx.fillText('W', centerX - maxRadius - 20, centerY + 7);
        
        // Scores
        const scoreY = 520;
        const lineHeight = 70;
        
        ctx.textAlign = 'left';
        ctx.fillStyle = '#8B2E2E';
        ctx.font = 'bold 24px Georgia';
        
        ctx.fillText('The Needle (How You Show Up):', 100, scoreY);
        ctx.fillText('The Rose (Energy & Tempo):', 100, scoreY + lineHeight);
        ctx.fillText('The Bearing (What Draws You In):', 100, scoreY + lineHeight * 2);
        ctx.fillText('The Anchor (How You Hold Connection):', 100, scoreY + lineHeight * 3);
        
        ctx.textAlign = 'right';
        ctx.fillStyle = '#05081C';
        ctx.font = '32px Georgia';
        
        ctx.fillText(scores.needle + '/100', 700, scoreY);
        ctx.fillText(scores.rose + '/100', 700, scoreY + lineHeight);
        ctx.fillText(scores.bearing + '/100', 700, scoreY + lineHeight * 2);
        ctx.fillText(scores.anchor + '/100', 700, scoreY + lineHeight * 3);
        
        // Footer
        ctx.fillStyle = '#8B2E2E';
        ctx.font = '18px Georgia';
        ctx.textAlign = 'center';
        ctx.fillText('circle22houston.com', 400, 950);
        
        return cardCanvas;
    };
    
    // Download button (desktop)
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            const canvas = createResultsCanvas();
            const link = document.createElement('a');
            link.download = 'compass-results-' + userData.firstName + '.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        });
    }
    
    // Share button (mobile-friendly)
    if (shareBtn) {
        shareBtn.addEventListener('click', async function() {
            const canvas = createResultsCanvas();
            
            // Convert canvas to blob
            canvas.toBlob(async (blob) => {
                const file = new File([blob], 'compass-results.png', { type: 'image/png' });
                
                // Try Web Share API first (works on most mobile browsers)
                if (navigator.share) {
                    try {
                        await navigator.share({
                            files: [file],
                            title: 'My Compass Results',
                            text: 'Check out my Circle 22 Compass results!'
                        });
                        return;
                    } catch (error) {
                        if (error.name === 'AbortError') {
                            // User cancelled, that's fine
                            return;
                        }
                        // If share fails, fall through to download
                        console.log('Share failed, trying download:', error);
                    }
                }
                
                // Fallback: Trigger download
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'compass-results-' + userData.firstName + '.png';
                link.style.display = 'none';
                document.body.appendChild(link);
                link.click();
                
                // Cleanup
                setTimeout(() => {
                    document.body.removeChild(link);
                    URL.revokeObjectURL(url);
                }, 100);
                
            }, 'image/png');
        });
    }
}
