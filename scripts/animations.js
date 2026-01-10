// Register GSAP plugins
if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// Optimize for TBT: Defer animations until after initial render
// Use requestIdleCallback to run during idle time, fallback to setTimeout
function initAnimations() {
    // Wait for browser to be idle to avoid blocking main thread
    if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
            initAnimationsImmediate();
        }, { timeout: 2000 });
    } else {
        setTimeout(() => {
            initAnimationsImmediate();
        }, 100);
    }
}

function initAnimationsImmediate() {
    // Only animate if elements exist and are ready
    const heroName = document.querySelector('.hero-name');
    if (!heroName) return;
    
    // Hero Section Animations - only animate if not already visible
    // Elements start visible now (opacity: 1), so skip if already visible
    const heroElements = document.querySelectorAll('.hero-name, .hero-title, .hero-tagline, .button-container, .social-links');
    const needsAnimation = Array.from(heroElements).some(el => {
        const style = window.getComputedStyle(el);
        return style.opacity === '0' || style.transform !== 'none';
    });
    
    if (needsAnimation && typeof gsap !== 'undefined') {
        const heroTimeline = gsap.timeline();
        
        heroTimeline
            .to('.hero-name', {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out'
            })
            .to('.hero-title', {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out'
            }, '-=0.5')
            .to('.hero-tagline', {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out'
            }, '-=0.5')
            .to('.button-container', {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out'
            }, '-=0.5')
            .to('.social-links', {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out'
            }, '-=0.5');
    }

    // Only proceed if GSAP is loaded
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.warn('GSAP or ScrollTrigger not loaded');
        return;
    }
    
    // Use requestAnimationFrame to break up work and reduce blocking
    requestAnimationFrame(() => {
        // Parallax effect for hero background - lazy load on scroll
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            gsap.to('.hero-background', {
                scrollTrigger: {
                    trigger: '.hero',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                },
                y: '50%',
                ease: 'none'
            });
        }
    });

    // Section Title Animations - batch with requestAnimationFrame
    requestAnimationFrame(() => {
        const titles = document.querySelectorAll('.section-title');
        if (titles.length > 0 && typeof gsap !== 'undefined') {
            gsap.utils.toArray('.section-title').forEach(title => {
                gsap.fromTo(title, 
                    {
                        opacity: 0,
                        y: 50
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: title,
                            start: 'top 80%',
                            end: 'top 50%',
                            toggleActions: 'play none play none'
                        }
                    }
                );
            });
        }
    });

    // Projects Section Animations - defer until idle
    function animateProjects() {
        const projectCards = document.querySelectorAll('.project-card');
        if (projectCards.length === 0) {
            // If projects haven't loaded yet, wait a bit and try again
            setTimeout(animateProjects, 200);
            return;
        }

        // Use requestIdleCallback to avoid blocking main thread
        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => {
                if (typeof gsap !== 'undefined' && projectCards.length > 0) {
                    gsap.utils.toArray('.project-card').forEach((card, index) => {
                        gsap.fromTo(card,
                            {
                                opacity: 0,
                                y: 80,
                                scale: 0.9
                            },
                            {
                                opacity: 1,
                                y: 0,
                                scale: 1,
                                duration: 0.8,
                                ease: 'power3.out',
                                delay: index * 0.1, // Reduced delay
                                scrollTrigger: {
                                    trigger: card,
                                    start: 'top 85%',
                                    end: 'top 50%',
                                    toggleActions: 'play none play none'
                                }
                            }
                        );
                    });
                }
            }, { timeout: 1000 });
        } else {
            setTimeout(() => {
                if (typeof gsap !== 'undefined' && projectCards.length > 0) {
                    gsap.utils.toArray('.project-card').forEach((card, index) => {
                        gsap.fromTo(card,
                            {
                                opacity: 0,
                                y: 80,
                                scale: 0.9
                            },
                            {
                                opacity: 1,
                                y: 0,
                                scale: 1,
                                duration: 0.8,
                                ease: 'power3.out',
                                delay: index * 0.1,
                                scrollTrigger: {
                                    trigger: card,
                                    start: 'top 85%',
                                    end: 'top 50%',
                                    toggleActions: 'play none play none'
                                }
                            }
                        );
                    });
                }
            }, 300);
        }
    }

    // Wait for projects to be loaded, then animate with delay
    setTimeout(animateProjects, 500);

    // About Section Animations - defer with requestAnimationFrame
    requestAnimationFrame(() => {
        const aboutText = document.querySelector('.about-text');
        if (aboutText && typeof gsap !== 'undefined') {
            gsap.fromTo('.about-text',
                {
                    opacity: 0,
                    x: -80
                },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.about-content',
                        start: 'top 80%',
                        end: 'top 50%',
                        toggleActions: 'play none play none'
                    }
                }
            );
        }
    });

    // About image animation - defer
    requestAnimationFrame(() => {
        const aboutImage = document.querySelector('.about-image');
        if (aboutImage && typeof gsap !== 'undefined') {
            gsap.fromTo('.about-image',
                {
                    opacity: 0,
                    x: 80,
                    scale: 0.9
                },
                {
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.about-content',
                        start: 'top 80%',
                        end: 'top 50%',
                        toggleActions: 'play none play none'
                    }
                }
            );
        }
    });

    // Skills list animation - defer until idle
    if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
            const skillsItems = document.querySelectorAll('.skills-list li');
            if (skillsItems.length > 0 && typeof gsap !== 'undefined') {
                gsap.utils.toArray('.skills-list li').forEach((item, index) => {
                    gsap.fromTo(item,
                        {
                            opacity: 0,
                            x: -30
                        },
                        {
                            opacity: 1,
                            x: 0,
                            duration: 0.5,
                            ease: 'power2.out',
                            delay: index * 0.1,
                            scrollTrigger: {
                                trigger: '.skills-list',
                                start: 'top 85%',
                                toggleActions: 'play none play none'
                            }
                        }
                    );
                });
            }
        }, { timeout: 2000 });
    }

    // Tools Section Animations - defer until idle
    if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
            const toolCategories = document.querySelectorAll('.tool-category');
            if (toolCategories.length > 0 && typeof gsap !== 'undefined') {
                gsap.utils.toArray('.tool-category').forEach((category, index) => {
                    gsap.fromTo(category,
                        {
                            opacity: 0,
                            y: 60,
                            scale: 0.95
                        },
                        {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            duration: 0.8,
                            ease: 'power3.out',
                            delay: index * 0.2,
                            scrollTrigger: {
                                trigger: category,
                                start: 'top 85%',
                                end: 'top 50%',
                                toggleActions: 'play none play none'
                            }
                        }
                    );

                    // Animate tool items within each category
                    const toolItems = category.querySelectorAll('.tool-item');
                    gsap.utils.toArray(toolItems).forEach((item, itemIndex) => {
                        gsap.fromTo(item,
                            {
                                opacity: 0,
                                x: -20
                            },
                            {
                                opacity: 1,
                                x: 0,
                                duration: 0.5,
                                ease: 'power2.out',
                                delay: index * 0.2 + itemIndex * 0.1,
                                scrollTrigger: {
                                    trigger: category,
                                    start: 'top 85%',
                                    toggleActions: 'play none play none'
                                }
                            }
                        );
                    });
                });
            }
        }, { timeout: 3000 });
    }

    // Contact Section Animations - defer until idle
    if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
            const businessCard = document.querySelector('.business-card');
            if (businessCard && typeof gsap !== 'undefined') {
                gsap.fromTo('.business-card',
                    {
                        opacity: 0,
                        y: 50,
                        scale: 0.95
                    },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: '.contact-content',
                            start: 'top 80%',
                            end: 'top 50%',
                            toggleActions: 'play none play none'
                        }
                    }
                );

                // Animate contact items with stagger
                const contactItems = document.querySelectorAll('.contact-item');
                if (contactItems.length > 0) {
                    gsap.utils.toArray('.contact-item').forEach((item, index) => {
                        gsap.fromTo(item,
                            {
                                opacity: 0,
                                x: -30
                            },
                            {
                                opacity: 1,
                                x: 0,
                                duration: 0.6,
                                ease: 'power2.out',
                                delay: index * 0.1,
                                scrollTrigger: {
                                    trigger: '.business-card',
                                    start: 'top 85%',
                                    toggleActions: 'play none play none'
                                }
                            }
                        );
                    });
                }

                // Animate social links
                const socialLinks = document.querySelectorAll('.business-card .social-link');
                if (socialLinks.length > 0) {
                    gsap.utils.toArray('.business-card .social-link').forEach((link, index) => {
                        gsap.fromTo(link,
                            {
                                opacity: 0,
                                scale: 0
                            },
                            {
                                opacity: 1,
                                scale: 1,
                                duration: 0.4,
                                ease: 'back.out(1.7)',
                                delay: 0.5 + index * 0.1,
                                scrollTrigger: {
                                    trigger: '.business-card',
                                    start: 'top 85%',
                                    toggleActions: 'play none play none'
                                }
                            }
                        );
                    });
                }
            }
        }, { timeout: 4000 });
    }

    // Form input focus animations - lazy load on interaction only
    requestAnimationFrame(() => {
        const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
        if (formInputs.length > 0 && typeof gsap !== 'undefined') {
            formInputs.forEach(input => {
                input.addEventListener('focus', function() {
                    gsap.to(this, {
                        scale: 1.02,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                });

                input.addEventListener('blur', function() {
                    gsap.to(this, {
                        scale: 1,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                });
            });
        }
    });

    // Hover animations for project cards - lazy load
    if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
            const projectCards = document.querySelectorAll('.project-card');
            if (projectCards.length > 0 && typeof gsap !== 'undefined') {
                gsap.utils.toArray('.project-card').forEach(card => {
                    card.addEventListener('mouseenter', function() {
                        gsap.to(this, {
                            scale: 1.02,
                            duration: 0.3,
                            ease: 'power2.out'
                        });
                    });

                    card.addEventListener('mouseleave', function() {
                        gsap.to(this, {
                            scale: 1,
                            duration: 0.3,
                            ease: 'power2.out'
                        });
                    });
                });
            }
        }, { timeout: 5000 });
    }

    // Scroll indicator fade out when scrolling - defer
    requestAnimationFrame(() => {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator && typeof gsap !== 'undefined') {
            gsap.to('.scroll-indicator', {
                opacity: 0,
                duration: 0.5,
                scrollTrigger: {
                    trigger: '.hero',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                }
            });
        }
    });
}

// Initialize animations when DOM and GSAP are ready
// Using defer ensures DOM is ready, but we wait for GSAP to load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // Wait a bit for GSAP to load (since it's also deferred)
        setTimeout(() => {
            if (typeof gsap !== 'undefined') {
                initAnimations();
            } else {
                // Retry after a short delay if GSAP isn't loaded yet
                setTimeout(initAnimations, 100);
            }
        }, 50);
    });
} else {
    // DOM already ready, check for GSAP
    setTimeout(() => {
        if (typeof gsap !== 'undefined') {
            initAnimations();
        } else {
            setTimeout(initAnimations, 100);
        }
    }, 50);
}

// Refresh ScrollTrigger on window resize - debounced
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
        }
    }, 250);
}, { passive: true });

