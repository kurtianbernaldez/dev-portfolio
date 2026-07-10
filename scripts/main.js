const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

function closeNavigation() {
    if (!hamburger || !navMenu) return;

    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open navigation');
}

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('active');
        hamburger.classList.toggle('active', isOpen);
        hamburger.setAttribute('aria-expanded', String(isOpen));
        hamburger.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeNavigation();
    });
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', event => {
        const targetId = link.getAttribute('href');
        if (!targetId || targetId === '#') return;

        const target = document.querySelector(targetId);
        if (!target) return;

        event.preventDefault();
        closeNavigation();
        target.scrollIntoView({
            behavior: reducedMotion.matches ? 'auto' : 'smooth',
            block: 'start'
        });
    });
});

let scrollTicking = false;
function updateNavbar() {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 32);
    scrollTicking = false;
}

window.addEventListener('scroll', () => {
    if (scrollTicking) return;
    scrollTicking = true;
    requestAnimationFrame(updateNavbar);
}, { passive: true });
updateNavbar();

const sections = document.querySelectorAll('section[id]');
if ('IntersectionObserver' in window && sections.length) {
    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
            });
        });
    }, { rootMargin: '-35% 0px -55%', threshold: 0 });

    sections.forEach(section => sectionObserver.observe(section));
}

const initializedTiltCards = new WeakSet();

function initializeCardTilt() {
    if (!finePointer.matches || reducedMotion.matches) return;

    document.querySelectorAll('[data-tilt-card]').forEach(card => {
        if (initializedTiltCards.has(card)) return;
        initializedTiltCards.add(card);

        const inner = card.querySelector('.project-card-inner');
        if (!inner) return;

        card.addEventListener('pointermove', event => {
            const bounds = card.getBoundingClientRect();
            const x = (event.clientX - bounds.left) / bounds.width;
            const y = (event.clientY - bounds.top) / bounds.height;

            inner.style.setProperty('--rotate-x', `${(0.5 - y) * 6}deg`);
            inner.style.setProperty('--rotate-y', `${(x - 0.5) * 7}deg`);
            inner.style.setProperty('--pointer-x', `${x * 100}%`);
            inner.style.setProperty('--pointer-y', `${y * 100}%`);
        });

        card.addEventListener('pointerleave', () => {
            inner.style.setProperty('--rotate-x', '0deg');
            inner.style.setProperty('--rotate-y', '0deg');
            inner.style.setProperty('--pointer-x', '50%');
            inner.style.setProperty('--pointer-y', '50%');
        });
    });
}

function initializeHeroDepth() {
    const hero = document.querySelector('.hero');
    const frame = document.querySelector('.cube-stage');
    if (!hero || !frame || !finePointer.matches || reducedMotion.matches) return;

    hero.addEventListener('pointermove', event => {
        const x = event.clientX / window.innerWidth - 0.5;
        const y = event.clientY / window.innerHeight - 0.5;
        frame.style.setProperty('--hero-rotate-x', `${7 - y * 5}deg`);
        frame.style.setProperty('--hero-rotate-y', `${-8 + x * 7}deg`);
    });

    hero.addEventListener('pointerleave', () => {
        frame.style.setProperty('--hero-rotate-x', '7deg');
        frame.style.setProperty('--hero-rotate-y', '-8deg');
    });
}

document.addEventListener('portfolio:projects-rendered', initializeCardTilt);
initializeCardTilt();
initializeHeroDepth();
