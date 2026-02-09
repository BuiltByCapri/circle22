// Circle 22 - Interactive Narrative Experience
(function() {
    'use strict';

    // State
    let isAudioEnabled = false;
    let buttonPressed = false;
    let currentScene = 1;

    // Elements
    const audioToggle = document.getElementById('audioToggle');
    const audioStatus = document.getElementById('audioStatus');
    const ambientSound = document.getElementById('ambientSound');
    const circle22Button = document.getElementById('circle22Button');
    const scene1 = document.getElementById('scene1');
    const scene2 = document.getElementById('scene2');
    const scene3 = document.getElementById('scene3');
    const scenes = document.querySelectorAll('.scene');

    // Initialize
    function init() {
        setupAudioToggle();
        setupElevatorButton();
        setupScrollObserver();
        setupKeyboardNavigation();
    }

    // Audio Toggle
    function setupAudioToggle() {
        if (audioToggle) {
            audioToggle.addEventListener('click', toggleAudio);
        }
    }

    function toggleAudio() {
        isAudioEnabled = !isAudioEnabled;
        audioToggle.classList.toggle('active', isAudioEnabled);
        audioStatus.textContent = isAudioEnabled ? 'On' : 'Off';
        audioToggle.setAttribute('aria-pressed', String(isAudioEnabled));

        if (isAudioEnabled) {
            playAmbientSound();
        } else {
            pauseAmbientSound();
        }

        localStorage.setItem('circle22_audio', isAudioEnabled);
    }

    function playAmbientSound() {
        if (ambientSound && isAudioEnabled) {
            ambientSound.volume = 0.25;
            const playPromise = ambientSound.play();
            
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log('Audio playback prevented:', error);
                    isAudioEnabled = false;
                    audioToggle.classList.remove('active');
                    audioStatus.textContent = 'Off';
                });
            }
        }
    }

    function pauseAmbientSound() {
        if (ambientSound) {
            ambientSound.pause();
            ambientSound.currentTime = 0;
        }
    }

    // Elevator Button - SIMPLIFIED
    function setupElevatorButton() {
        if (circle22Button) {
            circle22Button.addEventListener('click', pressButton);
        }
    }

   function pressButton() {
    if (buttonPressed) return;

    buttonPressed = true;
    circle22Button.classList.add('pressed');

    if (navigator.vibrate) {
        navigator.vibrate(50);
    }

    // STEP 1: scroll immediately to doors
    scene2.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // STEP 2: open doors once we arrive
    setTimeout(() => {
        scene2.classList.add('open');

        // STEP 3: after doors open, move to invitation
        setTimeout(() => {
            scene3.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 1200); // matches door animation timing
    }, 700);
}

    // Scroll Management
    function scrollToScene(sceneNumber) {
        const targetScene = document.getElementById(`scene${sceneNumber}`);
        if (targetScene) {
            targetScene.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    // Intersection Observer
    function setupScrollObserver() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    handleSceneEntry(entry.target);
                }
            });
        }, observerOptions);

        scenes.forEach(scene => observer.observe(scene));
    }

    function handleSceneEntry(scene) {
        const sceneId = scene.id;
        
        switch(sceneId) {
            case 'scene1':
                currentScene = 1;
                break;
            case 'scene2':
                currentScene = 2;
                break;
            case 'scene3':
                currentScene = 3;
                break;
        }
    }

    // Keyboard Navigation
    function setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown' || (e.key === ' ' && e.target === document.body)) {
                e.preventDefault();
                if (currentScene < 3) {
                    scrollToScene(currentScene + 1);
                }
            }
            
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (currentScene > 1) {
                    scrollToScene(currentScene - 1);
                }
            }

            if (e.key === 'Escape') {
                scrollToScene(3);
            }
        });
    }

    // Initialize on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Handle tab visibility
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            pauseAmbientSound();
        }
    });

})();
