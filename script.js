// ==================== Theme Toggle ====================
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.querySelector('.theme-icon');
const html = document.documentElement;

// Check for saved theme preference or default to 'light' mode
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

// Theme toggle event listener
themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
}

// ==================== Smooth Scroll Navigation ====================
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetSection.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== Active Navigation Link ====================
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navbarHeight - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        const scrollPosition = window.scrollY;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            const sectionId = section.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// ==================== Navbar Scroll Effect ====================
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// ==================== Contact Form Validation & Submission ====================
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Clear previous errors
    clearErrors();
    
    // Get form values
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        subject: document.getElementById('subject').value.trim(),
        message: document.getElementById('message').value.trim()
    };
    
    // Validate form
    let isValid = true;
    
    if (formData.name.length < 2) {
        showError('nameError', 'Name must be at least 2 characters long');
        isValid = false;
    }
    
    if (!isValidEmail(formData.email)) {
        showError('emailError', 'Please enter a valid email address');
        isValid = false;
    }
    
    if (formData.subject.length < 3) {
        showError('subjectError', 'Subject must be at least 3 characters long');
        isValid = false;
    }
    
    if (formData.message.length < 10) {
        showError('messageError', 'Message must be at least 10 characters long');
        isValid = false;
    }
    
    if (!isValid) {
        return;
    }
    
    // Simulate form submission
    const submitButton = contactForm.querySelector('.btn-submit');
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        formStatus.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
        formStatus.className = 'form-status success';
        
        // Reset form
        contactForm.reset();
        submitButton.textContent = 'Send Message';
        submitButton.disabled = false;
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            formStatus.className = 'form-status';
        }, 5000);
    }, 1500);
});

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    
    // Add visual feedback to input
    const input = errorElement.previousElementSibling;
    input.style.borderColor = '#ef4444';
}

function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => {
        error.textContent = '';
    });
    
    const inputs = document.querySelectorAll('.form-group input, .form-group textarea');
    inputs.forEach(input => {
        input.style.borderColor = '';
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ==================== Scroll Animations ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.skill-card, .project-card');
    
    animatedElements.forEach(element => {
        // Set initial state
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        observer.observe(element);
    });
});

// ==================== Project Card Interactions ====================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ==================== Skill Card Interactions ====================
const skillCards = document.querySelectorAll('.skill-card');

skillCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.skill-icon');
        icon.style.transform = 'scale(1.2) rotate(5deg)';
        icon.style.transition = 'transform 0.3s ease';
    });
    
    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.skill-icon');
        icon.style.transform = 'scale(1) rotate(0deg)';
    });
});

// ==================== Hero Section Parallax Effect ====================
const heroSection = document.querySelector('.hero');
const heroBackground = document.querySelector('.hero-background');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroHeight = heroSection.offsetHeight;
    
    if (scrolled < heroHeight) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ==================== Smooth Form Input Focus ====================
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
        this.parentElement.style.transition = 'transform 0.2s ease';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// ==================== Dynamic Year in Footer ====================
const currentYear = new Date().getFullYear();
const footerText = document.querySelector('.footer p');
if (footerText) {
    footerText.innerHTML = `&copy; ${currentYear} Alex Johnson. Built with ❤️ and code.`;
}

// ==================== Keyboard Navigation for Accessibility ====================
document.addEventListener('keydown', (e) => {
    // ESC key to close any potential modals or overlays
    if (e.key === 'Escape') {
        // Future implementation for modals
    }
    
    // Tab navigation enhancement
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// ==================== Performance Optimization ====================
// Debounce scroll events for better performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll handlers
const debouncedUpdateNav = debounce(updateActiveNavLink, 100);
window.addEventListener('scroll', debouncedUpdateNav);

// ==================== Console Message ====================
console.log('%c👋 Welcome to my portfolio!', 'font-size: 20px; color: #667eea; font-weight: bold;');
console.log('%cInterested in the code? Check out the repository!', 'font-size: 14px; color: #764ba2;');

// ==================== Loading Animation ====================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '1';
    }
});
