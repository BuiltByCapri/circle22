// Circle 22 - Interactive Narrative Experience
// Scroll-based cinematic journey with audio controls

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
    const scene2 = document.getElementById('scene2');
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

        // Save preference
        localStorage.setItem('circle22_audio', isAudioEnabled);
    }

    function playAmbientSound() {
        if (ambientSound && isAudioEnabled) {
            ambientSound.volume = 0.25;
            const playPromise = ambientSound.play();
            
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log('Audio playback prevented:', error);
                    // Reset state if blocked
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
            ambientSound.currentTime = 0; // Reset to beginning
        }
    }

    // Elevator Button
    function setupElevatorButton() {
        if (circle22Button) {
            circle22Button.addEventListener('click', pressButton);
            circle22Button.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    pressButton();
                }
            });
        }
    }

    function pressButton() {
        if (buttonPressed) return;

        buttonPressed = true;
        circle22Button.classList.add('pressed');
        
        // Haptic feedback (if supported)
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }

        // Open elevator doors and scroll to invitation
        setTimeout(() => {
            openElevatorDoors();
            setTimeout(() => {
                scrollToScene(3);
            }, 1500);
        }, 800);
    }

    function openElevatorDoors() {
        if (scene2) {
            scene2.classList.add('open');
        }
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

    // Intersection Observer for Scene Transitions
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
                if (!scene.classList.contains('open') && buttonPressed) {
                    scene.classList.add('open');
                }
                break;
                
            case 'scene3':
                currentScene = 3;
                break;
        }
    }

    // Keyboard Navigation
    function setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Arrow down / Space: Next scene
            if (e.key === 'ArrowDown' || (e.key === ' ' && e.target === document.body)) {
                e.preventDefault();
                if (currentScene < 3) {
                    scrollToScene(currentScene + 1);
                }
            }
            
            // Arrow up: Previous scene
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (currentScene > 1) {
                    scrollToScene(currentScene - 1);
                }
            }

            // Escape: Scroll to invitation
            if (e.key === 'Escape') {
                scrollToScene(3);
            }
        });
    }

    // Load saved audio preference
    function loadAudioPreference() {
        const savedPreference = localStorage.getItem('circle22_audio');
        if (savedPreference === 'true') {
            // Don't auto-enable, just mark as preferred
            // User must still interact to start audio
        }
    }

    // Smooth reveal animations on page load
    function initializeRevealAnimations() {
        // Add staggered fade-ins for instruction text
        const instructions = document.querySelectorAll('.scene-instruction');
        instructions.forEach((instruction, index) => {
            instruction.style.animationDelay = `${0.5 + index * 0.2}s`;
        });
    }

    // Handle visibility change (pause audio when tab hidden)
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            pauseAmbientSound();
        }
    });

    // Performance: Reduce animations on low-end devices
    function checkPerformance() {
        const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
        if (isLowEnd) {
            document.body.classList.add('reduce-motion');
        }
    }

    // Prevent scrolling on scene 1 until button pressed
    function lockScrollOnLoad() {
        if (!buttonPressed) {
            window.scrollTo(0, 0);
        }
    }

    // Initialize everything when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            init();
            loadAudioPreference();
            initializeRevealAnimations();
            checkPerformance();
            lockScrollOnLoad();
        });
    } else {
        init();
        loadAudioPreference();
        initializeRevealAnimations();
        checkPerformance();
        lockScrollOnLoad();
    }

    // Expose public methods for debugging
    window.Circle22 = {
        scrollToScene,
        toggleAudio,
        currentScene: () => currentScene
    };

})();
