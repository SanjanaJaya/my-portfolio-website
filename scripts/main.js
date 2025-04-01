// Smooth scrolling for navbar links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        const navbar = document.getElementById('navbar');
        navbar.classList.remove('active');
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// Animate sections when they come into view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Terminal typing effects
const nameText = "Hello, I'm Imesh Sanjana";
const titleText = "Computer Security Undergraduate";
const nameElement = document.getElementById('name-text');
const titleElement = document.getElementById('title-text');
let i = 0;
let j = 0;

function typeName() {
    if (i < nameText.length) {
        nameElement.innerHTML += nameText.charAt(i);
        i++;
        setTimeout(typeName, 100);
    } else {
        // Start typing title after name finishes
        setTimeout(typeTitle, 500);
    }
}

function typeTitle() {
    if (j < titleText.length) {
        titleElement.innerHTML += titleText.charAt(j);
        j++;
        setTimeout(typeTitle, 100);
    }
}

// Start typing effect
window.onload = function() {
    typeName();
};