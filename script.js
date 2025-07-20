// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(0, 0, 0, 0.98)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.95)';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .contact-item, .stat');
    animateElements.forEach(el => observer.observe(el));
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + (element.textContent.includes('+') ? '+' : '');
        }
    }, 16);
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const stats = entry.target.querySelectorAll('.stat h3');
            stats.forEach(stat => {
                const target = parseInt(stat.textContent.replace(/\D/g, ''));
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Service card hover effects
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Button click effects
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        // Create ripple effect
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
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .loaded {
        opacity: 1;
    }
    
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
`;
document.head.appendChild(style); 

// Custom Cursor Effect
const cursor = document.querySelector('.custom-cursor');
if (cursor) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    // Hover effect for buttons and links
    const hoverTargets = document.querySelectorAll('a, button, .btn, .nav-link, .service-card, .social-link');
    hoverTargets.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
    });
} 

// Lightning effect on click (multi blue bolts, realistic)
if (cursor) {
    document.addEventListener('mousedown', (e) => {
        const boltCount = 2 + Math.floor(Math.random() * 2); // 2 hoặc 3 tia
        for (let i = 0; i < boltCount; i++) {
            const lightning = document.createElement('div');
            lightning.className = 'cursor-lightning-strike';
            lightning.style.position = 'fixed';
            lightning.style.left = e.clientX + (i-0.5)*(12 + Math.random()*8) + 'px';
            lightning.style.top = '0px';
            lightning.style.width = '36px';
            lightning.style.height = (e.clientY) + 'px';
            lightning.style.pointerEvents = 'none';
            lightning.style.zIndex = 10001;
            // Tạo các điểm ngẫu nhiên cho tia sét chính và nhánh phụ
            const y1 = Math.floor(e.clientY*0.25 + Math.random()*10);
            const y2 = Math.floor(e.clientY*0.5 + Math.random()*20);
            const y3 = Math.floor(e.clientY*0.7 + Math.random()*20);
            const y4 = e.clientY-10;
            const x0 = 18;
            const x1 = 18 + (Math.random()-0.5)*10;
            const x2 = 18 + (Math.random()-0.5)*16;
            const x3 = 18 + (Math.random()-0.5)*12;
            const x4 = 18 + (Math.random()-0.5)*8;
            // Nhánh phụ
            const branch1 = `<polyline points="${x1},${y1} ${x1-8},${y1+18} ${x1-12},${y1+32}" stroke="#00e1ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.7"/>`;
            const branch2 = `<polyline points="${x2},${y2} ${x2+10},${y2+18} ${x2+16},${y2+32}" stroke="#00e1ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.7"/>`;
            lightning.innerHTML = `
                <svg width="36" height="${e.clientY}" viewBox="0 0 36 ${e.clientY}" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <polyline points="${x0},0 ${x1},${y1} ${x2},${y2} ${x3},${y3} ${x4},${y4} 18,${e.clientY}" stroke="#00e1ff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" filter="url(#glow)"/>
                    ${Math.random()>0.5 ? branch1 : ''}
                    ${Math.random()>0.5 ? branch2 : ''}
                    <defs>
                        <filter id="glow" x="-10" y="-10" width="56" height="${e.clientY+20}" filterUnits="userSpaceOnUse">
                            <feGaussianBlur stdDeviation="4.5" result="coloredBlur"/>
                            <feMerge>
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                        </filter>
                    </defs>
                </svg>
            `;
            lightning.style.transform = 'translate(-50%, 0) scaleY(0)';
            lightning.style.opacity = '1';
            lightning.style.transition = 'transform 0.13s cubic-bezier(.4,2,.6,1), opacity 0.22s cubic-bezier(.4,2,.6,1)';
            document.body.appendChild(lightning);
            setTimeout(() => {
                lightning.style.transform = 'translate(-50%, 0) scaleY(1)';
            }, 10 + i*30);
            setTimeout(() => {
                lightning.style.opacity = '0';
            }, 160 + i*30);
            setTimeout(() => {
                lightning.remove();
            }, 350 + i*30);
        }
    });
} 

// Avatar 3D tilt effect
const profilePic = document.querySelector('.profile-pic');
const avatarImg = document.querySelector('.avatar-img');
if (profilePic && avatarImg) {
    profilePic.addEventListener('mousemove', (e) => {
        const rect = profilePic.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * 10; // max 10deg
        const rotateY = ((x - centerX) / centerX) * 10;
        avatarImg.style.setProperty('--tilt-x', `${rotateY}deg`);
        avatarImg.style.setProperty('--tilt-y', `${-rotateX}deg`);
        avatarImg.classList.add('avatar-tilt');
    });
    profilePic.addEventListener('mouseleave', () => {
        avatarImg.style.setProperty('--tilt-x', '0deg');
        avatarImg.style.setProperty('--tilt-y', '0deg');
        avatarImg.classList.remove('avatar-tilt');
    });
} 

// Hero title shine effect
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    // Shine on load
    heroTitle.classList.add('shine');
    setTimeout(() => heroTitle.classList.remove('shine'), 1300);
    // Shine on hover
    heroTitle.addEventListener('mouseenter', () => {
        heroTitle.classList.add('shine');
        setTimeout(() => heroTitle.classList.remove('shine'), 1300);
    });
} 