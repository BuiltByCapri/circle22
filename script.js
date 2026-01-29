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
        audioToggle.addEventListener('click', toggleAudio);
    }

    function toggleAudio() {
        isAudioEnabled = !isAudioEnabled;
        audioToggle.classList.toggle('active', isAudioEnabled);
        audioStatus.textContent = isAudioEnabled ? 'On' : 'Off';

        if (isAudioEnabled) {
            // Only play if we're past scene 3 (where ambient sound makes sense)
            if (currentScene >= 3) {
                playAmbientSound();
            }
        } else {
            pauseAmbientSound();
        }

        // Save preference
        localStorage.setItem('circle22_audio', isAudioEnabled);
    }

    function playAmbientSound() {
        if (ambientSound && isAudioEnabled) {
            ambientSound.volume = 0.3;
            const playPromise = ambientSound.play();
            
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log('Audio playback prevented:', error);
                });
            }
        }
    }

    function pauseAmbientSound() {
        if (ambientSound) {
            ambientSound.pause();
        }
    }

    function fadeOutAudio() {
        if (ambientSound && !ambientSound.paused) {
            const fadeInterval = setInterval(() => {
                if (ambientSound.volume > 0.05) {
                    ambientSound.volume -= 0.05;
                } else {
                    ambientSound.volume = 0;
                    ambientSound.pause();
                    clearInterval(fadeInterval);
                }
            }, 50);
        }
    }

    // Elevator Button
    function setupElevatorButton() {
        circle22Button.addEventListener('click', pressButton);
        circle22Button.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                pressButton();
            }
        });
    }

    function pressButton() {
        if (buttonPressed) return;

        buttonPressed = true;
        circle22Button.classList.add('pressed');
        
        // Haptic feedback (if supported)
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }

        // Smooth scroll to next scene after animation
        setTimeout(() => {
            scrollToScene(2);
            openElevatorDoors();
        }, 800);
    }

    function openElevatorDoors() {
        scene2.classList.add('open');
        
        // Auto-scroll to scene 3 after doors open
        setTimeout(() => {
            scrollToScene(3);
        }, 3000);
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
                pauseAmbientSound();
                break;
                
            case 'scene2':
                currentScene = 2;
                if (!scene.classList.contains('open') && buttonPressed) {
                    scene.classList.add('open');
                }
                break;
                
            case 'scene3':
                currentScene = 3;
                // Start ambient sound if enabled
                if (isAudioEnabled) {
                    playAmbientSound();
                }
                break;
                
            case 'scene4':
                currentScene = 4;
                // Fade out audio for door slam
                fadeOutAudio();
                // Auto-scroll to final scene
                setTimeout(() => {
                    scrollToScene(5);
                }, 2000);
                break;
                
            case 'scene5':
                currentScene = 5;
                // Ensure audio is off for reading
                pauseAmbientSound();
                break;
        }
    }

    // Keyboard Navigation
    function setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Arrow down / Space: Next scene
            if (e.key === 'ArrowDown' || (e.key === ' ' && e.target === document.body)) {
                e.preventDefault();
                if (currentScene < 5) {
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
                scrollToScene(5);
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
        } else {
            if (isAudioEnabled && currentScene >= 3 && currentScene < 4) {
                playAmbientSound();
            }
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

    // Track analytics (placeholder for future implementation)
    function trackInteraction(action) {
        // Example: window.gtag('event', action, { 'event_category': 'Circle22' });
        console.log('Interaction:', action);
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
