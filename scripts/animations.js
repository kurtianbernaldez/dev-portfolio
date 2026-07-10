function makeContentVisible() {
    document.querySelectorAll(
        '.hero-kicker, .hero-name, .hero-title, .hero-tagline, .button-container, .hero .social-links, ' +
        '.hero-visual, .section-kicker, .section-title, .work-description, .about-text, .about-image, ' +
        '.project-card, .work-card, .business-card'
    ).forEach(element => {
        element.style.opacity = '1';
        element.style.visibility = 'visible';
    });
}

function initAnimations() {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        document.documentElement.classList.add('reduced-motion');
        makeContentVisible();
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    gsap.timeline({ defaults: { ease: 'power3.out' } })
        .fromTo('.hero-kicker', { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.55 })
        .fromTo('.hero-name > span', { autoAlpha: 0, yPercent: 55 }, {
            autoAlpha: 1,
            yPercent: 0,
            duration: 0.9,
            stagger: 0.1
        }, '-=0.25')
        .fromTo('.hero-title, .hero-tagline', { autoAlpha: 0, y: 24 }, {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1
        }, '-=0.52')
        .fromTo('.button-container, .hero .social-links', { autoAlpha: 0, y: 20 }, {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08
        }, '-=0.42')
        .fromTo('.hero-visual', { autoAlpha: 0, scale: 0.84, rotate: -4 }, {
            autoAlpha: 1,
            scale: 1,
            rotate: 0,
            duration: 1.25,
            ease: 'expo.out'
        }, 0.2);

    gsap.to('.hero-background', {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.8
        }
    });

    gsap.to('.hero-grid', {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        }
    });

    gsap.to('.hero-visual', {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        }
    });

    document.querySelectorAll('.section-kicker').forEach(kicker => {
        gsap.fromTo(kicker, { autoAlpha: 0, y: 18 }, {
            autoAlpha: 1,
            y: 0,
            duration: 0.55,
            scrollTrigger: { trigger: kicker, start: 'top 88%', once: true }
        });
    });

    document.querySelectorAll('.section-title').forEach(title => {
        gsap.fromTo(title, { autoAlpha: 0, y: 45 }, {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            scrollTrigger: { trigger: title, start: 'top 86%', once: true }
        });
    });

    document.querySelectorAll('.work-description').forEach(description => {
        gsap.fromTo(description, { autoAlpha: 0, y: 20 }, {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            scrollTrigger: { trigger: description, start: 'top 90%', once: true }
        });
    });

    gsap.fromTo('.about-text', { autoAlpha: 0, x: -55 }, {
        autoAlpha: 1,
        x: 0,
        duration: 1,
        scrollTrigger: { trigger: '.about-content', start: 'top 78%', once: true }
    });

    gsap.fromTo('.about-image', { autoAlpha: 0, x: 55 }, {
        autoAlpha: 1,
        x: 0,
        duration: 1,
        scrollTrigger: { trigger: '.about-content', start: 'top 78%', once: true }
    });

    gsap.fromTo('.skills-list li', { autoAlpha: 0, x: -18 }, {
        autoAlpha: 1,
        x: 0,
        duration: 0.45,
        stagger: 0.07,
        scrollTrigger: { trigger: '.skills-list', start: 'top 86%', once: true }
    });

    function animateProjectCards() {
        const cards = gsap.utils.toArray('.project-card');
        if (!cards.length) return;

        gsap.fromTo(cards, { autoAlpha: 0, y: 65 }, {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            overwrite: 'auto',
            scrollTrigger: {
                trigger: '.projects-grid',
                start: 'top 82%',
                once: true
            }
        });
    }

    animateProjectCards();

    document.addEventListener('portfolio:projects-rendered', () => {
        requestAnimationFrame(() => {
            document.querySelectorAll('.project-card').forEach(card => {
                card.style.opacity = '1';
                card.style.visibility = 'visible';
            });
            ScrollTrigger.refresh();
        });
    });

    gsap.fromTo('.work-card', { autoAlpha: 0, y: 55 }, {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.14,
        scrollTrigger: { trigger: '.tools-container', start: 'top 82%', once: true }
    });

    gsap.fromTo('.business-card', { autoAlpha: 0, y: 55, scale: 0.96 }, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 1,
        scrollTrigger: { trigger: '.contact-content', start: 'top 82%', once: true }
    });

    gsap.to('.scroll-indicator', {
        autoAlpha: 0,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: '35% top',
            scrub: true
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimations, { once: true });
} else {
    initAnimations();
}

let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
    }, 200);
}, { passive: true });
