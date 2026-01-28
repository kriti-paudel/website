// ===============================================
// MOBILE MENU TOGGLE
// ===============================================

// Get elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu when hamburger is clicked
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when a nav link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===============================================
// NAVBAR SCROLL EFFECT
// ===============================================

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    // Add 'scrolled' class to navbar when user scrolls down
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===============================================
// ACTIVE NAVIGATION LINK ON SCROLL
// ===============================================

// Get all sections that have an ID
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    // Get current scroll position
    const scrollPosition = window.scrollY + 100;

    // Loop through sections to find which one is in viewport
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        // Check if scroll position is within current section
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Remove active class from all links
            navLinks.forEach(link => {
                link.classList.remove('active');
            });

            // Add active class to current section's link
            const currentLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (currentLink) {
                currentLink.classList.add('active');
            }
        }
    });
});

// ===============================================
// SMOOTH SCROLL FOR NAVIGATION LINKS
// ===============================================

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        // Get the target section
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        // Smooth scroll to target section
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70; // Adjust for navbar height

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===============================================
// SCROLL ANIMATIONS (FADE IN EFFECT)
// ===============================================

// Function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + 100 &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Add fade-in class to elements that should animate
const animatedElements = document.querySelectorAll(
    '.skill-card, .project-card, .about-content, .contact-content'
);

// Add fade-in class initially
animatedElements.forEach(element => {
    element.classList.add('fade-in');
});

// Function to handle scroll animation
function handleScrollAnimation() {
    animatedElements.forEach(element => {
        if (isInViewport(element)) {
            element.classList.add('visible');
        }
    });
}

// Run animation check on scroll
window.addEventListener('scroll', handleScrollAnimation);

// Run animation check on page load
window.addEventListener('load', handleScrollAnimation);

// ===============================================
// CONTACT FORM HANDLING
// ===============================================

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    // Prevent default form submission
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Basic validation
    if (name.trim() === '' || email.trim() === '' || subject.trim() === '' || message.trim() === '') {
        alert('Please fill in all fields');
        return;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address');
        return;
    }

    // If validation passes, show success message
    alert(`Thank you, ${name}! Your message has been sent successfully. I'll get back to you soon.`);

    // Reset form
    contactForm.reset();

    // In a real application, you would send this data to a server here
    // For example:
    // fetch('your-server-endpoint', {
    //     method: 'POST',
    //     body: JSON.stringify({ name, email, subject, message }),
    //     headers: { 'Content-Type': 'application/json' }
    // })
});

// ===============================================
// TYPING ANIMATION FOR HERO TITLE (OPTIONAL)
// ===============================================

// Uncomment this section if you want a typing animation effect
/*
const heroTitle = document.querySelector('.hero-title');
const titleText = heroTitle.textContent;
heroTitle.textContent = '';

let charIndex = 0;

function typeWriter() {
    if (charIndex < titleText.length) {
        heroTitle.textContent += titleText.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 100);
    }
}

// Start typing animation after page loads
window.addEventListener('load', () => {
    setTimeout(typeWriter, 500);
});
*/

// ===============================================
// PROJECT CARD TILT EFFECT (OPTIONAL ENHANCEMENT)
// ===============================================

const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        // Get card dimensions and position
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Calculate rotation values
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        // Apply 3D rotation (subtle effect)
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    // Reset transform when mouse leaves
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===============================================
// SKILL CARD ANIMATION ON HOVER
// ===============================================

const skillCards = document.querySelectorAll('.skill-card');

skillCards.forEach(card => {
    // Add ripple effect on click (optional)
    card.addEventListener('click', function(e) {
        // Create ripple element
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// ===============================================
// SCROLL TO TOP BUTTON (OPTIONAL)
// ===============================================

// Create scroll to top button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.setAttribute('id', 'scrollToTopBtn');
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    color: var(--darker-bg);
    border: none;
    border-radius: 50%;
    font-size: 24px;
    cursor: pointer;
    display: none;
    z-index: 999;
    transition: all 0.3s;
    box-shadow: 0 5px 15px rgba(0, 217, 255, 0.3);
`;

document.body.appendChild(scrollToTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

// Scroll to top when button is clicked
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Hover effect for scroll button
scrollToTopBtn.addEventListener('mouseenter', () => {
    scrollToTopBtn.style.transform = 'translateY(-5px)';
    scrollToTopBtn.style.boxShadow = '0 10px 25px rgba(0, 217, 255, 0.5)';
});

scrollToTopBtn.addEventListener('mouseleave', () => {
    scrollToTopBtn.style.transform = 'translateY(0)';
    scrollToTopBtn.style.boxShadow = '0 5px 15px rgba(0, 217, 255, 0.3)';
});

// ===============================================
// LAZY LOADING FOR PERFORMANCE (OPTIONAL)
// ===============================================

// Lazy load images if you add actual images later
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
});

// ===============================================
// CONSOLE MESSAGE (OPTIONAL - FUN EASTER EGG)
// ===============================================

console.log('%c👋 Hello, Developer!', 'font-size: 20px; color: #00d9ff; font-weight: bold;');
console.log('%cThanks for checking out the code!', 'font-size: 14px; color: #9ca3af;');
console.log('%cFeel free to explore and learn from this portfolio.', 'font-size: 14px; color: #9ca3af;');

// ===============================================
// INITIALIZE ALL FUNCTIONS ON PAGE LOAD
// ===============================================

window.addEventListener('load', () => {
    // Remove loading animation if you add one
    // Add any initialization code here
    console.log('Portfolio loaded successfully! ✅');
});