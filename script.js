// Get elements
const questionContainer = document.getElementById('questionContainer');
const celebrationContainer = document.getElementById('celebrationContainer');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');

// Track if the No button has been moved
let moveCount = 0;

// Detect if mobile device
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;

// Function to move the No button to a random position
function moveNoButton() {
    moveCount++;
    
    const container = document.querySelector('.buttons');
    const containerRect = container.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();
    
    // Calculate available space with padding
    const padding = isMobile ? 10 : 40;
    const maxX = containerRect.width - btnRect.width - padding;
    const maxY = containerRect.height - btnRect.height - padding;
    
    // Generate random position (avoid edges on mobile)
    const minOffset = isMobile ? 20 : 10;
    const randomX = Math.random() * (maxX - minOffset) + minOffset;
    const randomY = Math.random() * (maxY - minOffset) + minOffset;
    
    // Apply position with animation
    noBtn.style.position = 'absolute';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    
    // Add spin effect (less rotation on mobile for performance)
    const rotation = isMobile ? Math.random() * 180 : Math.random() * 360;
    noBtn.style.transform = `rotate(${rotation}deg) scale(${Math.max(0.7, 1 - moveCount * 0.04)})`;
    
    // Make the Yes button bigger and more prominent after attempts
    if (moveCount > 2) {
        yesBtn.style.transform = 'scale(1.2)';
        yesBtn.style.animation = 'yesGlow 1s ease-in-out infinite, shake 0.5s ease-in-out infinite';
    }
    if (moveCount > 5) {
        yesBtn.style.transform = 'scale(1.4)';
        noBtn.querySelector('.btn-text').textContent = 'No? 🥺';
    }
    if (moveCount > 8) {
        yesBtn.style.transform = 'scale(1.6)';
        noBtn.querySelector('.btn-text').textContent = 'Please? 🥹';
    }
    if (moveCount > 12) {
        yesBtn.style.transform = 'scale(1.8)';
        noBtn.querySelector('.btn-text').textContent = 'Maybe? 😢';
    }
}

// Event listeners for No button
if (!isMobile) {
    noBtn.addEventListener('mouseenter', moveNoButton);
}

noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    moveNoButton();
});

// Touch support for mobile (with better handling)
let touchMoved = false;
noBtn.addEventListener('touchstart', (e) => {
    touchMoved = false;
});

noBtn.addEventListener('touchmove', (e) => {
    touchMoved = true;
});

noBtn.addEventListener('touchend', (e) => {
    if (!touchMoved) {
        e.preventDefault();
        moveNoButton();
    }
});

// Prevent text selection on No button
noBtn.addEventListener('selectstart', (e) => e.preventDefault());

// Yes button click handler
yesBtn.addEventListener('click', () => {
    // Add click effect
    yesBtn.style.transform = 'scale(1.3)';
    
    // Hide question container with animation
    questionContainer.style.animation = 'fadeOutScale 0.6s ease-out';
    
    setTimeout(() => {
        questionContainer.style.display = 'none';
        celebrationContainer.classList.add('active');
        
        // Add confetti effect
        createConfetti();
        
        // Add floating hearts
        createFloatingHearts();
        
        // Play celebration sound effect (visual representation)
        createSoundWaves();
    }, 600);
});

// Enhanced confetti effect
function createConfetti() {
    const colors = ['#f093fb', '#f5576c', '#4facfe', '#00f2fe', '#ffd700', '#ff69b4', '#fff', '#ffb6c1'];
    const confettiCount = isMobile ? 100 : 200; // Reduce on mobile for performance
    const shapes = ['circle', 'square', 'triangle'];
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            
            const size = Math.random() * (isMobile ? 15 : 20) + (isMobile ? 6 : 8);
            confetti.style.position = 'fixed';
            confetti.style.width = size + 'px';
            confetti.style.height = size + 'px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-30px';
            confetti.style.opacity = '1';
            confetti.style.borderRadius = shape === 'circle' ? '50%' : '0';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9999';
            confetti.style.boxShadow = `0 0 ${isMobile ? 10 : 15}px ${colors[Math.floor(Math.random() * colors.length)]}`;
            
            if (shape === 'triangle') {
                confetti.style.width = '0';
                confetti.style.height = '0';
                confetti.style.borderLeft = (size/2) + 'px solid transparent';
                confetti.style.borderRight = (size/2) + 'px solid transparent';
                confetti.style.borderBottom = size + 'px solid ' + confetti.style.backgroundColor;
                confetti.style.backgroundColor = 'transparent';
            }
            
            document.body.appendChild(confetti);
            
            const fallDuration = 3 + Math.random() * (isMobile ? 3 : 4);
            const swayAmount = (Math.random() - 0.5) * (isMobile ? 250 : 400);
            const rotation = Math.random() * (isMobile ? 720 : 1440);
            
            confetti.animate([
                {
                    transform: 'translateY(0) translateX(0) rotate(0deg) scale(0)',
                    opacity: 0
                },
                {
                    transform: `translateY(100px) translateX(${swayAmount * 0.2}px) rotate(${rotation * 0.2}deg) scale(1)`,
                    opacity: 1,
                    offset: 0.1
                },
                {
                    transform: `translateY(${window.innerHeight + 50}px) translateX(${swayAmount}px) rotate(${rotation}deg) scale(0.5)`,
                    opacity: 0
                }
            ], {
                duration: fallDuration * 1000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }).onfinish = () => {
                confetti.remove();
            };
        }, i * (isMobile ? 20 : 15));
    }
    
    // Add pig and panda confetti
    const animalCount = isMobile ? 12 : 20;
    for (let i = 0; i < animalCount; i++) {
        setTimeout(() => {
            const animal = document.createElement('div');
            animal.textContent = i % 2 === 0 ? '🐷' : '🐼';
            animal.style.position = 'fixed';
            animal.style.fontSize = Math.random() * (isMobile ? 20 : 30) + (isMobile ? 15 : 20) + 'px';
            animal.style.left = Math.random() * 100 + '%';
            animal.style.top = '-50px';
            animal.style.opacity = '1';
            animal.style.pointerEvents = 'none';
            animal.style.zIndex = '9999';
            animal.style.filter = 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.8))';
            
            document.body.appendChild(animal);
            
            const fallDuration = 4 + Math.random() * 3;
            const sway = (Math.random() - 0.5) * (isMobile ? 200 : 300);
            
            animal.animate([
                {
                    transform: 'translateY(0) translateX(0) rotate(0deg)',
                    opacity: 1
                },
                {
                    transform: `translateY(${window.innerHeight + 50}px) translateX(${sway}px) rotate(${Math.random() * (isMobile ? 720 : 1080)}deg)`,
                    opacity: 0
                }
            ], {
                duration: fallDuration * 1000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }).onfinish = () => {
                animal.remove();
            };
        }, i * 200);
    }
}

// Create floating hearts during celebration
function createFloatingHearts() {
    const heartEmojis = ['💖', '💕', '💗', '💝', '💘', '❤️', '💓', '🐷', '🐼', '🐷', '🐼'];
    const heartCount = isMobile ? 25 : 40;
    
    for (let i = 0; i < heartCount; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
            heart.style.position = 'fixed';
            heart.style.fontSize = Math.random() * (isMobile ? 30 : 40) + (isMobile ? 20 : 25) + 'px';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.bottom = '-50px';
            heart.style.opacity = '0.9';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '9998';
            heart.style.filter = 'drop-shadow(0 0 15px rgba(255, 105, 180, 0.9))';
            
            document.body.appendChild(heart);
            
            const floatDuration = 4 + Math.random() * (isMobile ? 2 : 3);
            const sway = (Math.random() - 0.5) * (isMobile ? 100 : 150);
            const rotation = Math.random() * (isMobile ? 360 : 720) - (isMobile ? 180 : 360);
            
            heart.animate([
                {
                    transform: 'translateY(0) translateX(0) scale(0) rotate(0deg)',
                    opacity: 0
                },
                {
                    transform: `translateY(-200px) translateX(${sway * 0.3}px) scale(1.2) rotate(${rotation * 0.3}deg)`,
                    opacity: 1,
                    offset: 0.2
                },
                {
                    transform: `translateY(-${window.innerHeight/2}px) translateX(${sway}px) scale(1) rotate(${rotation * 0.6}deg)`,
                    opacity: 0.9,
                    offset: 0.6
                },
                {
                    transform: `translateY(-${window.innerHeight + 200}px) translateX(${sway * 1.5}px) scale(0.8) rotate(${rotation}deg)`,
                    opacity: 0
                }
            ], {
                duration: floatDuration * 1000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }).onfinish = () => {
                heart.remove();
            };
        }, i * (isMobile ? 120 : 100));
    }
}

// Create sound wave effect
function createSoundWaves() {
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const wave = document.createElement('div');
            wave.style.position = 'fixed';
            wave.style.width = '100px';
            wave.style.height = '100px';
            wave.style.border = `${4 - i * 0.3}px solid rgba(255, 105, 180, ${0.8 - i * 0.1})`;
            wave.style.borderRadius = '50%';
            wave.style.left = '50%';
            wave.style.top = '50%';
            wave.style.transform = 'translate(-50%, -50%)';
            wave.style.pointerEvents = 'none';
            wave.style.zIndex = '9997';
            wave.style.boxShadow = `0 0 ${20 + i * 5}px rgba(255, 105, 180, 0.5)`;
            
            document.body.appendChild(wave);
            
            wave.animate([
                {
                    width: '100px',
                    height: '100px',
                    opacity: 0.8
                },
                {
                    width: '400px',
                    height: '400px',
                    opacity: 0.5,
                    offset: 0.5
                },
                {
                    width: '800px',
                    height: '800px',
                    opacity: 0
                }
            ], {
                duration: 2000,
                easing: 'ease-out'
            }).onfinish = () => {
                wave.remove();
            };
        }, i * 150);
    }
    
    // Create pig and panda burst
    createAnimalBurst();
}

// New function for animal burst effect
function createAnimalBurst() {
    const animals = ['🐷', '🐼'];
    const count = isMobile ? 8 : 12;
    
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const animal = document.createElement('div');
            animal.textContent = animals[i % 2];
            animal.style.position = 'fixed';
            animal.style.fontSize = isMobile ? '2rem' : '3rem';
            animal.style.left = '50%';
            animal.style.top = '50%';
            animal.style.pointerEvents = 'none';
            animal.style.zIndex = '10000';
            animal.style.filter = 'drop-shadow(0 0 20px rgba(255, 255, 255, 1))';
            
            document.body.appendChild(animal);
            
            const angle = (i / count) * Math.PI * 2;
            const distance = isMobile ? 200 : 300;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            
            animal.animate([
                {
                    transform: 'translate(-50%, -50%) scale(0) rotate(0deg)',
                    opacity: 1
                },
                {
                    transform: `translate(calc(-50% + ${x * 0.5}px), calc(-50% + ${y * 0.5}px)) scale(1.5) rotate(${360 * (i % 2 === 0 ? 1 : -1)}deg)`,
                    opacity: 1,
                    offset: 0.5
                },
                {
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(0.5) rotate(${720 * (i % 2 === 0 ? 1 : -1)}deg)`,
                    opacity: 0
                }
            ], {
                duration: 1500,
                easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
            }).onfinish = () => {
                animal.remove();
            };
        }, i * 50);
    }
}

// Add shake animation to styles
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOutScale {
        from {
            opacity: 1;
            transform: scale(1) translateY(0);
        }
        to {
            opacity: 0;
            transform: scale(0.5) translateY(-100px);
        }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0) scale(1.4); }
        25% { transform: translateX(-10px) scale(1.4); }
        75% { transform: translateX(10px) scale(1.4); }
    }
`;
document.head.appendChild(style);

// Add parallax effect to background (disabled on mobile for performance)
if (!isMobile) {
    document.addEventListener('mousemove', (e) => {
        const particles = document.querySelectorAll('.particle');
        const hearts = document.querySelectorAll('.floating-heart');
        
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        particles.forEach((particle, index) => {
            const speed = (index + 1) * 0.5;
            const x = (mouseX - 0.5) * speed * 20;
            const y = (mouseY - 0.5) * speed * 20;
            particle.style.transform = `translate(${x}px, ${y}px)`;
        });
        
        hearts.forEach((heart, index) => {
            const speed = (index + 1) * 0.3;
            const x = (mouseX - 0.5) * speed * 15;
            const y = (mouseY - 0.5) * speed * 15;
            heart.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

// Add click interaction for cute animals
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const animals = document.querySelectorAll('.animal-emoji');
        animals.forEach(animal => {
            const createBurst = function(e) {
                // Prevent multiple triggers
                if (this.classList.contains('bursting')) return;
                this.classList.add('bursting');
                
                // Create burst effect
                const emoji = this.textContent;
                const burstCount = isMobile ? 6 : 8;
                const rect = this.getBoundingClientRect();
                
                for (let i = 0; i < burstCount; i++) {
                    setTimeout(() => {
                        const burst = document.createElement('div');
                        burst.textContent = emoji;
                        burst.style.position = 'fixed';
                        burst.style.fontSize = isMobile ? '1.5rem' : '2rem';
                        burst.style.left = rect.left + rect.width/2 + 'px';
                        burst.style.top = rect.top + rect.height/2 + 'px';
                        burst.style.pointerEvents = 'none';
                        burst.style.zIndex = '10001';
                        
                        document.body.appendChild(burst);
                        
                        const angle = (i / burstCount) * Math.PI * 2;
                        const distance = isMobile ? 80 : 100;
                        const x = Math.cos(angle) * distance;
                        const y = Math.sin(angle) * distance;
                        
                        burst.animate([
                            {
                                transform: 'translate(-50%, -50%) scale(1) rotate(0deg)',
                                opacity: 1
                            },
                            {
                                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(0) rotate(${isMobile ? 360 : 720}deg)`,
                                opacity: 0
                            }
                        ], {
                            duration: 800,
                            easing: 'ease-out'
                        }).onfinish = () => {
                            burst.remove();
                        };
                    }, i * 30);
                }
                
                // Allow bursting again after animation
                setTimeout(() => {
                    this.classList.remove('bursting');
                }, 500);
            };
            
            // Add both click and touch events
            animal.addEventListener('click', createBurst);
            
            // Better touch handling
            let touchStartTime;
            animal.addEventListener('touchstart', (e) => {
                touchStartTime = Date.now();
            });
            
            animal.addEventListener('touchend', (e) => {
                if (Date.now() - touchStartTime < 300) { // Quick tap
                    e.preventDefault();
                    createBurst.call(animal, e);
                }
            });
        });
    }, 1000);
});
