// Smooth scrolling function
function scrollToPlaces() {
    document.getElementById('places').scrollIntoView({
        behavior: 'smooth'
    });
}

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Incredible India website loaded!');
    
    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(255, 107, 53, 0.95)';
        } else {
            navbar.style.backgroundColor = 'rgba(255, 107, 53, 1)';
        }
    });

    // Animate cards when they come into view
    const cards = document.querySelectorAll('.place-card');
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Add click animation to cards
    cards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(0)';
            }, 150);
        });
    });

    // Counter animation for stats
    const stats = document.querySelectorAll('.stat h3');
    stats.forEach(stat => {
        const finalValue = stat.textContent;
        const numValue = parseInt(finalValue.replace(/\D/g, ''));
        
        let current = 0;
        const increment = numValue / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= numValue) {
                stat.textContent = finalValue;
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current) + (finalValue.includes('+') ? '+' : '');
            }
        }, 50);
    });

    // Show welcome message
    setTimeout(() => {
        console.log('🇮🇳 Welcome to Incredible India! Explore amazing destinations.');
    }, 2000);
});

// Add keyboard shortcuts
document.addEventListener('keydown', function(event) {
    if (event.key === 'Home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    if (event.key === 'End') {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
});

// Simple notification function
function showMessage(text) {
    const message = document.createElement('div');
    message.textContent = text;
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ff6b35;
        color: white;
        padding: 10px 20px;
        border-radius: 5px;
        z-index: 1000;
    `;
    document.body.appendChild(message);
    
    setTimeout(() => {
        document.body.removeChild(message);
    }, 3000);
}

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'linear-gradient(135deg, rgba(255, 107, 53, 0.95), rgba(247, 147, 30, 0.95))';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'linear-gradient(135deg, #ff6b35, #f7931e)';
            navbar.style.backdropFilter = 'none';
        }
    });

    // Animate cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const cardObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all place cards
    const placeCards = document.querySelectorAll('.place-card');
    placeCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        cardObserver.observe(card);
    });

    // Observe tip cards
    const tipCards = document.querySelectorAll('.tip-card');
    tipCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        cardObserver.observe(card);
    });

    // Add floating animation to hero button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        setInterval(() => {
            ctaButton.style.transform = 'translateY(-2px)';
            setTimeout(() => {
                ctaButton.style.transform = 'translateY(0)';
            }, 1000);
        }, 3000);
    }

    // Counter animation for stats
    const statsElements = document.querySelectorAll('.stat h3');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                
                if (finalValue.includes('+')) {
                    const numValue = parseInt(finalValue.replace(/\D/g, ''));
                    animateCounter(target, 0, numValue, finalValue.includes('1000') ? '+' : '');
                } else {
                    const numValue = parseInt(finalValue);
                    animateCounter(target, 0, numValue, '');
                }
                
                statsObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    statsElements.forEach(stat => {
        statsObserver.observe(stat);
    });

    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const hero = document.querySelector('.hero');
        if (hero) {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });

    // Add search functionality (placeholder for future enhancement)
    document.addEventListener('keydown', function(event) {
        if (event.ctrlKey && event.key === '/') {
            event.preventDefault();
            alert('Search functionality coming soon! 🔍');
        }
    });

    // Add random tip display
    const tips = [
        "💡 Tip: Best time to visit India is October to March!",
        "💡 Tip: Always carry a water bottle and stay hydrated!",
        "💡 Tip: Learn basic Hindi phrases for better communication!",
        "💡 Tip: Try local street food but be cautious initially!",
        "💡 Tip: Respect local customs and dress codes!"
    ];

    // Show a random tip after 10 seconds
    setTimeout(() => {
        const randomTip = tips[Math.floor(Math.random() * tips.length)];
        showNotification(randomTip);
    }, 10000);
});

// Counter animation function
function animateCounter(element, start, end, suffix) {
    const duration = 2000;
    const increment = end / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            element.textContent = end + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, 16);
}

// Notification system
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #ff6b35, #f7931e);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 1001;
        font-weight: 500;
        max-width: 300px;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Animate out after 5 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add keyboard navigation
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        // Close any open modals or reset focus
        document.activeElement.blur();
    }
    
    if (event.key === 'Home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    if (event.key === 'End') {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
});

// Add dynamic greeting based on time
function addTimeBasedGreeting() {
    const hour = new Date().getHours();
    let greeting = "Welcome to Incredible India!";
    
    if (hour < 12) {
        greeting = "🌅 Good Morning! Welcome to Incredible India!";
    } else if (hour < 17) {
        greeting = "☀️ Good Afternoon! Welcome to Incredible India!";
    } else {
        greeting = "🌆 Good Evening! Welcome to Incredible India!";
    }
    
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        heroTitle.setAttribute('data-greeting', greeting);
    }
}

// Initialize time-based greeting
document.addEventListener('DOMContentLoaded', addTimeBasedGreeting);

// Add weather-like random facts about India
const indiaFacts = [
    "🏛️ India has 38 UNESCO World Heritage Sites!",
    "🗣️ Over 1,600 languages are spoken in India!",
    "🎭 India produces the most films in the world!",
    "🐅 India is home to 70% of the world's tigers!",
    "🚂 Indian Railways employs over 1.3 million people!"
];

// Show random fact every 30 seconds
setInterval(() => {
    if (Math.random() > 0.7) { // 30% chance every 30 seconds
        const randomFact = indiaFacts[Math.floor(Math.random() * indiaFacts.length)];
        showNotification(randomFact);
    }
}, 30000); 