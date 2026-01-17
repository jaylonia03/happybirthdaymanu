// Current page tracker
let currentPage = 1;
const totalPages = 6;

// DOM Elements
const pages = document.querySelectorAll('.page');
const heartsContainer = document.getElementById('hearts-container');
const clickSound = document.getElementById('clickSound');
const modalOverlay = document.getElementById('modalOverlay');

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    // Set page 1 as active
    showPage(1);
    
    // Create floating hearts
    createHearts();
    
    // Add click sound to all buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            playClickSound();
        });
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight' || e.key === ' ') {
            nextPage();
        } else if (e.key === 'ArrowLeft') {
            previousPage();
        }
    });
});

// Function to show a specific page
function showPage(pageNumber) {
    // Hide all pages
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show the requested page
    const pageToShow = document.getElementById(`page${pageNumber}`);
    if (pageToShow) {
        pageToShow.classList.add('active');
        currentPage = pageNumber;
        
        // Update URL hash without page refresh
        window.location.hash = `page${pageNumber}`;
    }
}

// Function to go to the next page
function nextPage() {
    if (currentPage < totalPages) {
        showPage(currentPage + 1);
    }
}

// Function to go to the previous page (optional, not in requirements but nice to have)
function previousPage() {
    if (currentPage > 1) {
        showPage(currentPage - 1);
    }
}

// Function to create floating hearts
function createHearts() {
    const heartCount = 25;
    
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        
        // Randomly assign blue or white
        if (Math.random() > 0.5) {
            heart.classList.add('blue');
            heart.innerHTML = '💙';
        } else {
            heart.classList.add('white');
            heart.innerHTML = '🤍';
        }
        
        // Random position
        const left = Math.random() * 100;
        const size = Math.random() * 1.5 + 0.5;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        heart.style.left = `${left}%`;
        heart.style.fontSize = `${size}rem`;
        heart.style.animationDuration = `${duration}s`;
        heart.style.animationDelay = `${delay}s`;
        
        heartsContainer.appendChild(heart);
    }
}

// Function to play click sound
function playClickSound() {
    if (clickSound) {
        clickSound.currentTime = 0;
        clickSound.play().catch(e => {
            // Sound play failed (might be browser restrictions)
            console.log("Sound play failed:", e);
        });
    }
}

// Function to show modal
function showModal() {
    if (modalOverlay) {
        modalOverlay.style.display = 'flex';
    }
}

// Function to close modal
function closeModal() {
    if (modalOverlay) {
        modalOverlay.style.display = 'none';
    }
}

// Function to restart the experience
function restartExperience() {
    showPage(1);
    
    // Add a celebration effect
    const content = document.querySelector('.content');
    content.classList.add('celebrate');
    
    setTimeout(() => {
        content.classList.remove('celebrate');
    }, 1000);
}

// Handle hash navigation
window.addEventListener('hashchange', function() {
    const hash = window.location.hash;
    if (hash) {
        const pageNumber = parseInt(hash.replace('#page', ''));
        if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
            showPage(pageNumber);
        }
    }
});

// Add CSS for celebration effect
const style = document.createElement('style');
style.textContent = `
    @keyframes celebrate {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .celebrate {
        animation: celebrate 1s ease;
    }
`;
document.head.appendChild(style);
