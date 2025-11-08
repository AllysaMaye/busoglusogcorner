// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

mobileMenuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    const icon = mobileMenuToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Close mobile menu when clicking on a link
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        const icon = mobileMenuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Smooth Scroll for Navigation Links
const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
    const scrollY = window.scrollY;
    const headerHeight = document.querySelector('.header').offsetHeight;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionBottom) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// Header Scroll Effect
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }

    lastScroll = currentScroll;
});

// Button Click Handlers
const viewMenuButtons = document.querySelectorAll('.btn-primary:not(.cta-button), .btn-outline');

viewMenuButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const buttonText = button.textContent.toLowerCase();

        if (buttonText.includes('menu')) {
            const menuSection = document.querySelector('#menu');
            if (menuSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = menuSection.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        } else if (buttonText.includes('visit') || buttonText.includes('directions')) {
            // Google Maps link to Sta. Teresa College
            window.open('https://maps.google.com?q=Sta.+Teresa+College+Bauan+Batangas', '_blank');
        } else if (buttonText.includes('hours')) {
            alert('Operating Hours:\n\nNovember 10 - Monday only\n8:00 AM – 3:00 PM\n\nLocation: Inside Sta. Teresa College, near the canteen');
        }
    });
});

// Visit Us Today button redirect to Facebook
const visitButtons = document.querySelectorAll('.btn-secondary');
visitButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        window.open('https://www.facebook.com/share/16QDqKXtyW/', '_blank');
    });
});

// Contact Buttons
const contactButtons = document.querySelectorAll('.action-btn');

contactButtons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonText = button.textContent.toLowerCase();

        if (buttonText.includes('contact')) {
            window.location.href = 'tel:+639635685968';
        } else if (buttonText.includes('updates') || buttonText.includes('email')) {
            window.location.href = 'mailto:busoglusogcorner@gmail.com';
        }
    });
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
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe menu cards
const menuCards = document.querySelectorAll('.menu-card');
menuCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Scroll to Top on Page Load
window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});

// Prevent default for all CTA buttons and add appropriate actions
const ctaButtons = document.querySelectorAll('.cta-button');
ctaButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const buttonText = button.textContent.toLowerCase();
        
        // Only prevent default for non-link buttons
        if (button.tagName !== 'A') {
            e.preventDefault();
            if (buttonText.includes('visit')) {
                window.open('https://maps.google.com?q=Sta.+Teresa+College+Bauan+Batangas', '_blank');
            }
        }
        // If it's an <a> tag, let it navigate normally
    });
});

// Add hover effect to menu cards
menuCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'all 0.3s ease';
    });
});

// Dynamic year in footer
const currentYear = new Date().getFullYear();
const footerYear = document.querySelector('.footer-bottom p');
if (footerYear) {
    footerYear.textContent = `© ${currentYear} Busog Lusog Corner. All rights reserved.`;
}

// Menu Modal Functionality
const menuModal = document.getElementById('menuModal');
const viewFullMenuBtn = document.getElementById('viewFullMenuBtn');
const closeMenuModal = document.getElementById('closeMenuModal');
const menuModalOverlay = document.querySelector('.menu-modal-overlay');
const menuTabs = document.querySelectorAll('.menu-tab');
const menuCategories = document.querySelectorAll('.menu-category');

// Open modal
if (viewFullMenuBtn) {
    viewFullMenuBtn.addEventListener('click', () => {
        menuModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        // Set focus to close button for accessibility
        setTimeout(() => closeMenuModal.focus(), 100);
    });
}

// Close modal function
function closeModal() {
    menuModal.classList.remove('active');
    document.body.style.overflow = '';
    // Return focus to the button that opened the modal
    if (viewFullMenuBtn) {
        viewFullMenuBtn.focus();
    }
}

// Close button click
if (closeMenuModal) {
    closeMenuModal.addEventListener('click', closeModal);
}

// Click overlay to close
if (menuModalOverlay) {
    menuModalOverlay.addEventListener('click', closeModal);
}

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuModal && menuModal.classList.contains('active')) {
        closeModal();
    }
});

// Tab switching with keyboard support
menuTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        switchTab(tab);
    });
    
    // Keyboard navigation for tabs
    tab.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            e.preventDefault();
            const nextTab = menuTabs[index + 1] || menuTabs[0];
            nextTab.focus();
            switchTab(nextTab);
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            const prevTab = menuTabs[index - 1] || menuTabs[menuTabs.length - 1];
            prevTab.focus();
            switchTab(prevTab);
        }
    });
});

function switchTab(tab) {
    const category = tab.dataset.category;
    
    // Update active tab
    menuTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
    });
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    
    // Update active category
    menuCategories.forEach(cat => {
        if (cat.dataset.category === category) {
            cat.classList.add('active');
            // Scroll to top of modal body when switching tabs
            const modalBody = document.querySelector('.menu-modal-body');
            if (modalBody) {
                modalBody.scrollTop = 0;
            }
        } else {
            cat.classList.remove('active');
        }
    });
}

// Prevent scroll on body when modal is open
menuModal.addEventListener('wheel', (e) => {
    const modalContent = document.querySelector('.menu-modal-content');
    const isScrollable = modalContent.scrollHeight > modalContent.clientHeight;
    
    if (!isScrollable) {
        e.preventDefault();
    }
}, { passive: false });

// Add touch swipe to close modal on mobile
let touchStartY = 0;
let touchEndY = 0;

menuModal.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
}, { passive: true });

menuModal.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeDistance = touchEndY - touchStartY;
    // If swipe down is more than 100px, close modal
    if (swipeDistance > 100) {
        closeModal();
    }
}

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    const images = document.querySelectorAll('img');
    images.forEach(img => imageObserver.observe(img));
}

// Add scroll reveal effect to sections
const revealSections = document.querySelectorAll('.section-container, .about-content, .benefits-card');
revealSections.forEach((section, index) => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = `all 0.8s ease ${index * 0.1}s`;
    observer.observe(section);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroBackground = document.querySelector('.hero-bg-img');
    
    if (heroBackground && scrolled < window.innerHeight) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add click tracking for analytics (placeholder)
document.addEventListener('click', (e) => {
    const target = e.target;
    
    if (target.matches('button') || target.matches('a')) {
        // Log click event (can be integrated with analytics)
        console.log('User clicked:', target.textContent.trim());
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.header') && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        const icon = mobileMenuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger hero animations
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero-content > *');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 100);
});
