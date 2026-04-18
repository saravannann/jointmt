// Header Scroll Effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.classList.add('animate-fade-up');
            // Once animated, stop observing
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Select all elements to animate
const animElements = document.querySelectorAll('.animate-fade-up');
animElements.forEach(el => {
    el.style.opacity = '0'; // Ensure they are hidden before animation starts
    observer.observe(el);
});

// Smooth Scrolling for Nav Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Offset for sticky header
                behavior: 'smooth'
            });
        }
    });
});

// Form Submission Simulation
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    const submitBtn = contactForm.querySelector('button');
    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Basic validation check
        const inputs = contactForm.querySelectorAll('input, textarea');
        let isValid = true;
        inputs.forEach(input => {
            if (!input.value.trim()) isValid = false;
        });

        if (!isValid) {
            alert('Please fill in all fields before submitting.');
            return;
        }

        // Simulate success
        submitBtn.innerHTML = '<i data-lucide="check"></i> Sent Successfully!';
        lucide.createIcons(); // Re-run lucide to render the new icon
        submitBtn.style.backgroundColor = '#2ecc71';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            contactForm.reset();
            submitBtn.innerHTML = 'SUBMIT';
            submitBtn.style.backgroundColor = '';
            submitBtn.disabled = false;
            lucide.createIcons();
        }, 3000);
    });
}
