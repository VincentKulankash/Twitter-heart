// ===== DOM ELEMENTS =====
const darkModeBtn = document.getElementById('darkModeBtn');
const welcomeSection = document.getElementById('welcomeSection');
const mainContent = document.getElementById('mainContent');
const heart = document.getElementById('heart');
const resetBtn = document.getElementById('resetBtn');

// ===== STATE =====
let isAnimating = false;
let animationTimeout = null;

// ===== PAGE LOAD =====
window.addEventListener('load', () => {
    console.log('💕 Page loaded! Welcome!');
    
    // Show welcome for 5 seconds
    setTimeout(() => {
        // Fade out welcome
        welcomeSection.classList.add('hidden');
        
        // Show main content
        setTimeout(() => {
            mainContent.classList.remove('hidden');
            mainContent.classList.add('visible');
            console.log('❤️ Heart is ready!');
        }, 500);
        
    }, 5000); // 5 seconds
});

// ===== HEART ANIMATION =====
function animateHeart() {
    if (isAnimating) {
        // Reset and re-trigger
        resetHeart();
        setTimeout(() => {
            triggerAnimation();
        }, 50);
    } else {
        triggerAnimation();
    }
}

function triggerAnimation() {
    isAnimating = true;
    heart.classList.add('animating');
    
    // Clean up after animation ends
    clearTimeout(animationTimeout);
    animationTimeout = setTimeout(() => {
        heart.classList.remove('animating');
        isAnimating = false;
        console.log('❤️ Heart animation complete!');
    }, 1000); // 1 second (matches CSS animation)
}

function resetHeart() {
    // Reset animation
    heart.classList.remove('animating');
    isAnimating = false;
    clearTimeout(animationTimeout);
    
    // Force reflow to reset position
    void heart.offsetWidth;
    heart.style.backgroundPosition = '0 0';
    
    console.log('🔄 Heart reset!');
}

// ===== HEART EVENTS =====
// Hover (mouseenter - your question!)
heart.addEventListener('mouseenter', () => {
    console.log('🖱️ Hover detected!');
    animateHeart();
});

// Click
heart.addEventListener('click', () => {
    console.log('👆 Click detected!');
    animateHeart();
});

// Prevent animation on mouse leave if currently animating
heart.addEventListener('mouseleave', () => {
    // Don't interrupt, let it finish
});

// ===== RESET BUTTON =====
resetBtn.addEventListener('click', () => {
    resetHeart();
});

// ===== DARK MODE TOGGLE =====
darkModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    // Change button icon
    if (document.body.classList.contains('dark-mode')) {
        darkModeBtn.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
        console.log('🌙 Dark mode activated');
    } else {
        darkModeBtn.textContent = '🌙';
        localStorage.setItem('theme', 'light');
        console.log('☀️ Light mode activated');
    }
});

// ===== LOAD SAVED THEME =====
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    darkModeBtn.textContent = '☀️';
    console.log('🌙 Loaded saved dark mode');
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', (e) => {
    // Press 'H' or 'h' to trigger heart
    if (e.key === 'h' || e.key === 'H') {
        e.preventDefault();
        console.log('⌨️ Keyboard shortcut: H pressed!');
        animateHeart();
    }
    
    // Press 'D' or 'd' for dark mode
    if (e.key === 'd' || e.key === 'D') {
        e.preventDefault();
        darkModeBtn.click();
    }
    
    // Press 'R' or 'r' for reset
    if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        resetBtn.click();
    }
});

// ===== CONSOLE WELCOME =====
console.log('💕 Hey Baby! ❤️');
console.log('📌 Tips:');
console.log('  • Hover or click the heart to animate');
console.log('  • Press "H" to heart, "D" for dark mode, "R" to reset');
console.log('  • Dark mode saves your preference!');