// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Prevent animations from running on page load until GSAP is ready
window.addEventListener('DOMContentLoaded', () => {
    initAnimations();
});

function initAnimations() {
    // Hero Section Animations
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

    // Parallax effect for hero background
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

    // Section Title Animations
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

    // Projects Section Animations
    function animateProjects() {
        const projectCards = document.querySelectorAll('.project-card');
        if (projectCards.length === 0) {
            // If projects haven't loaded yet, wait a bit and try again
            setTimeout(animateProjects, 100);
            return;
        }

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
                    delay: index * 0.2,
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

    // Wait for projects to be loaded, then animate
    animateProjects();

    // About Section Animations
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

    // Skills list animation
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

    // Tools Section Animations
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

    // Contact Section Animations
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

    // Animate social links
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

    // Form input focus animations
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
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

    // Hover animations for project cards
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

    // Scroll indicator fade out when scrolling
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

// Refresh ScrollTrigger on window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 250);
});

