// Smooth scrolling for navbar links with animation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 800;
        let start = null;
        
        function animation(currentTime) {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }
        
        function ease(t, b, c, d) {
            t /= d/2;
            if (t < 1) return c/2*t*t*t + b;
            t -= 2;
            return c/2*(t*t*t + 2) + b;
        }
        
        requestAnimationFrame(animation);
        
        // Close mobile menu if open
        const navbar = document.getElementById('navbar');
        navbar.classList.remove('active');
    });
});

// Enhanced Navbar effects
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    const scrollY = window.scrollY;
    
    if (scrollY > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        navbar.style.background = 'var(--nav-bg)';
    } else {
        navbar.style.boxShadow = 'none';
        navbar.style.background = 'transparent';
    }
    
    // Parallax effect for hero image
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrollY * 0.3}px)`;
    }
});

// Advanced Intersection Observer with staggered animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Add sequential delay for child elements
            const animatableChildren = entry.target.querySelectorAll('.project-card, .terminal-box, .contact-btn');
            animatableChildren.forEach((child, childIndex) => {
                child.style.animationDelay = `${childIndex * 0.15}s`;
            });
        }
    });
}, { 
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Enhanced Terminal Typing Effect with multiple phrases
const heroText = document.querySelector('.typed');
const cursor = document.querySelector('.cursor');
const phrases = [
    "Hello, I'm Imesh Sanjana Bandara",
    "Computer Security Undergraduate",
    "WEB Developer",
    "Mobile App Developer"
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isEnd = false;

function typeWriter() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        heroText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        heroText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentPhrase.length) {
        isEnd = true;
        setTimeout(() => {
            isDeleting = true;
            typeWriter();
        }, 2000);
        return;
    }
    
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        isEnd = false;
    }
    
    const speed = isDeleting ? 50 : isEnd ? 2000 : 100;
    setTimeout(typeWriter, speed);
}

// Cursor blink animation
function cursorBlink() {
    cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
    setTimeout(cursorBlink, 500);
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Start typing effect
    typeWriter();
    cursorBlink();
    
    // Add hover effects to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const angle = Math.atan2(y - centerY, x - centerX) * 180 / Math.PI;
            card.style.setProperty('--angle', `${angle}deg`);
        });
    });
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.contact-btn, .project-link');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const x = e.pageX - this.offsetLeft;
            const y = e.pageY - this.offsetTop;
            const ripple = document.createElement('span');
            
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
    });
});

// Window resize handler
window.addEventListener('resize', function() {
    // Recalculate anything that needs to be responsive
    const navbar = document.getElementById('navbar');
    if (window.innerWidth < 768) {
        navbar.style.background = 'var(--nav-bg)';
    } else {
        navbar.style.background = window.scrollY > 50 ? 'var(--nav-bg)' : 'transparent';
    }
});