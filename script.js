// Page navigation
let currentPage = 0;
const pages = document.querySelectorAll('.page');
const dots = document.querySelectorAll('.dot');
const heartsBg = document.getElementById('heartsBg');
const bgMusic = document.getElementById('bgMusic');
let musicEnabled = false;

// Initialize the page
function init() {
    createHearts();
    initializeGallery();
    setupEventListeners();
    goToPage(0);
}

// Create floating hearts
function createHearts() {
    const heartEmojis = ['💙', '🤍', '💘', '💝', '💖'];
    
    for (let i = 0; i < 30; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        
        // Random properties
        const size = Math.random() * 20 + 15;
        const left = Math.random() * 100;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 5;
        
        heart.style.left = `${left}%`;
        heart.style.fontSize = `${size}px`;
        heart.style.animationDuration = `${duration}s`;
        heart.style.animationDelay = `${delay}s`;
        heart.style.opacity = Math.random() * 0.5 + 0.3;
        
        heartsBg.appendChild(heart);
    }
}

// Initialize gallery
function initializeGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    const galleryItems = [];
    
    for (let i = 0; i < 6; i++) {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.innerHTML = `
            <i class="fas fa-plus-circle"></i>
            <p class="upload-instruction">Memory ${i + 1}</p>
            <input type="file" class="gallery-upload" accept="image/*" style="display: none;">
        `;
        
        // Add click event
        item.addEventListener('click', () => {
            const fileInput = item.querySelector('.gallery-upload');
            fileInput.click();
            
            fileInput.onchange = function(e) {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        const img = document.createElement('img');
                        img.src = event.target.result;
                        img.alt = `Memory ${i + 1}`;
                        item.innerHTML = '';
                        item.appendChild(img);
                        
                        // Add hover effect
                        item.style.position = 'relative';
                        const overlay = document.createElement('div');
                        overlay.style.position = 'absolute';
                        overlay.style.top = '0';
                        overlay.style.left = '0';
                        overlay.style.width = '100%';
                        overlay.style.height = '100%';
                        overlay.style.background = 'rgba(137, 207, 240, 0.7)';
                        overlay.style.display = 'none';
                        overlay.style.justifyContent = 'center';
                        overlay.style.alignItems = 'center';
                        overlay.style.color = 'white';
                        overlay.style.fontSize = '2rem';
                        overlay.innerHTML = '<i class="fas fa-heart"></i>';
                        
                        item.appendChild(overlay);
                        
                        item.addEventListener('mouseenter', () => {
                            overlay.style.display = 'flex';
                        });
                        
                        item.addEventListener('mouseleave', () => {
                            overlay.style.display = 'none';
                        });
                    };
                    reader.readAsDataURL(file);
                }
            };
        });
        
        galleryItems.push(item);
    }
    
    galleryGrid.innerHTML = '';
    galleryItems.forEach(item => galleryGrid.appendChild(item));
}

// Setup event listeners
function setupEventListeners() {
    // Photo upload
    const mainPhoto = document.getElementById('mainPhoto');
    const photoUpload = document.getElementById('photoUpload');
    
    mainPhoto.addEventListener('click', () => {
        photoUpload.click();
    });
    
    photoUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                mainPhoto.innerHTML = `<img src="${event.target.result}" alt="Manu's Photo">`;
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Letter photo upload
    const letterPhoto = document.getElementById('letterPhoto');
    const letterPhotoUpload = document.getElementById('letterPhotoUpload');
    
    letterPhoto.addEventListener('click', () => {
        letterPhotoUpload.click();
    });
    
    letterPhotoUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                letterPhoto.innerHTML = `<img src="${event.target.result}" alt="Special Photo">`;
            };
            reader.readAsDataURL(file);
        }
    });
}

// Page navigation functions
function nextPage() {
    if (currentPage < pages.length - 1) {
        goToPage(currentPage + 1);
    }
}

function prevPage() {
    if (currentPage > 0) {
        goToPage(currentPage - 1);
    }
}

function goToPage(pageIndex) {
    // Update current page
    currentPage = pageIndex;
    
    // Hide all pages
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show current page
    pages[pageIndex].classList.add('active');
    
    // Update dots
    dots.forEach((dot, index) => {
        if (index === pageIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
    
    // Play cute sound on page change
    playClickSound();
    
    // Scroll to top of page
    pages[pageIndex].scrollTop = 0;
}

// Video loading
function loadVideo() {
    const urlInput = document.getElementById('youtubeUrl');
    const videoEmbed = document.getElementById('videoEmbed');
    const videoPlaceholder = document.getElementById('videoPlaceholder');
    const url = urlInput.value.trim();
    
    if (!url) {
        alert('Please enter a YouTube URL!');
        return;
    }
    
    // Extract video ID from URL
    const videoId = extractYouTubeId(url);
    
    if (!videoId) {
        alert('Invalid YouTube URL. Please use a valid link like: https://www.youtube.com/watch?v=VIDEO_ID');
        return;
    }
    
    // Create embed
    videoEmbed.innerHTML = `
        <iframe 
            width="100%" 
            height="100%" 
            src="https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&modestbranding=1&rel=0" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
        </iframe>
    `;
    
    // Show embed, hide placeholder
    videoEmbed.style.display = 'block';
    videoPlaceholder.style.display = 'none';
}

function extractYouTubeId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

// Letter modal
function openLetter() {
    playClickSound();
    goToPage(4); // Go to letter page
}

function showModal() {
    playClickSound();
    const modal = document.getElementById('modalOverlay');
    modal.style.display = 'flex';
}

function closeModal() {
    playClickSound();
    const modal = document.getElementById('modalOverlay');
    modal.style.display = 'none';
}

// Restart experience
function restartExperience() {
    playClickSound();
    
    // Confetti effect
    createConfetti();
    
    // Go back to first page after delay
    setTimeout(() => {
        goToPage(0);
    }, 1500);
}

// Create confetti effect
function createConfetti() {
    const confettiContainer = document.createElement('div');
    confettiContainer.style.position = 'fixed';
    confettiContainer.style.top = '0';
    confettiContainer.style.left = '0';
    confettiContainer.style.width = '100%';
    confettiContainer.style.height = '100%';
    confettiContainer.style.pointerEvents = 'none';
    confettiContainer.style.zIndex = '2000';
    
    const confettiEmojis = ['💙', '🎉', '🎊', '✨', '🎈', '🎁', '🥳', '🎂'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.textContent = confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)];
        
        const size = Math.random() * 25 + 20;
        const left = Math.random() * 100;
        const rotation = Math.random() * 360;
        const duration = Math.random() * 1 + 1;
        
        confetti.style.position = 'absolute';
        confetti.style.left = `${left}%`;
        confetti.style.top = '-50px';
        confetti.style.fontSize = `${size}px`;
        confetti.style.transform = `rotate(${rotation}deg)`;
        confetti.style.animation = `confetti-fall ${duration}s linear forwards`;
        
        confettiContainer.appendChild(confetti);
    }
    
    document.body.appendChild(confettiContainer);
    
    // Remove after animation
    setTimeout(() => {
        confettiContainer.remove();
    }, 2000);
}

// Add confetti animation to styles
function addConfettiAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes confetti-fall {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Play click sound
function playClickSound() {
    if (!musicEnabled) return;
    
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 523.25; // C5
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
        console.log('Audio context not supported');
    }
}

// Toggle background music
function toggleMusic() {
    const musicBtn = document.querySelector('.music-btn i');
    
    if (musicEnabled) {
        bgMusic.pause();
        musicBtn.style.color = '#0A2342';
        musicEnabled = false;
    } else {
        bgMusic.play().catch(e => {
            console.log('Autoplay prevented. Please click the music button again.');
        });
        musicBtn.style.color = '#89CFF0';
        musicEnabled = true;
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    init();
    addConfettiAnimation();
    
    // Set volume
    bgMusic.volume = 0.3;
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') nextPage();
        if (e.key === 'ArrowLeft') prevPage();
        if (e.key === 'Escape') closeModal();
    });
    
    // Add touch swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left
                nextPage();
            } else {
                // Swipe right
                prevPage();
            }
        }
    }
    
    // Easter egg: hidden page
    let konamiCode = [];
    const konamiSequence = [
        'ArrowUp', 'ArrowUp',
        'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight',
        'ArrowLeft', 'ArrowRight',
        'b', 'a'
    ];
    
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.key);
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.join(',') === konamiSequence.join(',')) {
            showEasterEgg();
        }
    });
});

// Easter egg function
function showEasterEgg() {
    const easterEgg = document.createElement('div');
    easterEgg.style.position = 'fixed';
    easterEgg.style.top = '0';
    easterEgg.style.left = '0';
    easterEgg.style.width = '100%';
    easterEgg.style.height = '100%';
    easterEgg.style.background = 'linear-gradient(135deg, #FFB6C1 0%, #FF69B4 100%)';
    easterEgg.style.zIndex = '3000';
    easterEgg.style.display = 'flex';
    easterEgg.style.flexDirection = 'column';
    easterEgg.style.justifyContent = 'center';
    easterEgg.style.alignItems = 'center';
    easterEgg.style.color = 'white';
    easterEgg.style.fontSize = '2rem';
    easterEgg.style.textAlign = 'center';
    easterEgg.style.padding = '20px';
    easterEgg.style.animation = 'fadeIn 0.5s ease';
    
    easterEgg.innerHTML = `
        <h1 style="font-size: 4rem; margin-bottom: 20px;">🎉 Surprise! 🎉</h1>
        <p style="margin-bottom: 20px;">You found the secret page!</p>
        <p style="margin-bottom: 30px;">Here's an extra special message for Manu:</p>
        <div style="background: rgba(255, 255, 255, 0.2); padding: 30px; border-radius: 20px; max-width: 600px;">
            <p style="font-size: 1.8rem; font-style: italic;">"You're even more amazing than any secret I could hide in this website! ✨"</p>
        </div>
        <p style="margin-top: 30px; font-size: 3rem;">💙💙💙</p>
        <button onclick="this.parentElement.remove()" style="
            margin-top: 40px;
            padding: 15px 30px;
            background: white;
            color: #FF69B4;
            border: none;
            border-radius: 25px;
            font-size: 1.5rem;
            cursor: pointer;
            font-family: 'Comic Neue', cursive;
        ">
            Close Secret 💝
        </button>
    `;
    
    document.body.appendChild(easterEgg);
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}
