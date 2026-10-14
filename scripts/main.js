(function () {
    const root = document.documentElement;
    const validThemes = ['system', 'light', 'dark'];
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let theme = 'system';
    let themeTransition;
    let revealObserver;

    // Set the saved theme before the stylesheet paints; storage is optional.
    try {
        const saved = localStorage.getItem('kurtian-theme');
        if (validThemes.includes(saved)) theme = saved;
    } catch (error) { /* The OS preference still works if browser storage is unavailable. */ }
    root.dataset.theme = theme;

    async function transitionTheme() {
        if (themeTransition) themeTransition.skipTransition();
        if (motionPreference.matches || typeof document.startViewTransition !== 'function') {
            root.dataset.theme = theme;
            return;
        }

        root.classList.add('theme-transitioning');
        const transition = document.startViewTransition(() => { root.dataset.theme = theme; });
        themeTransition = transition;
        let animation;

        try {
            await transition.ready;
            if (themeTransition !== transition || motionPreference.matches) return;
            const radius = Math.hypot(window.innerWidth, window.innerHeight) / 2 + 2;
            animation = root.animate([
                { clipPath: 'circle(0px at 50% 50%)' },
                { clipPath: `circle(${radius}px at 50% 50%)` }
            ], {
                duration: 900,
                easing: 'cubic-bezier(.4, 0, .2, 1)',
                fill: 'forwards',
                pseudoElement: '::view-transition-new(root)'
            });
        } catch (error) {
            // A skipped snapshot must never prevent the selected theme applying.
            root.dataset.theme = theme;
            transition.skipTransition();
        } finally {
            await transition.finished;
            if (animation) animation.cancel();
            if (themeTransition === transition) {
                themeTransition = null;
                root.classList.remove('theme-transitioning');
            }
        }
    }

    function revealAll() {
        document.querySelectorAll('[data-reveal]').forEach(element => {
            element.classList.remove('reveal-pending');
            element.classList.add('is-revealed');
        });
    }

    function revealElement(element) {
        const revealTarget = element && element.closest('[data-reveal]');
        if (!revealTarget) return;
        revealTarget.classList.remove('reveal-pending');
        revealTarget.classList.add('is-revealed', 'reveal-immediate');
        if (revealObserver) revealObserver.unobserve(revealTarget);
    }

    function revealHashTarget() {
        if (!location.hash) return;
        let targetId;
        try { targetId = decodeURIComponent(location.hash.slice(1)); } catch (error) { return; }
        const target = document.getElementById(targetId);
        if (target) revealElement(target);
    }

    function observeReveals() {
        if (motionPreference.matches || !('IntersectionObserver' in window)) {
            root.classList.remove('motion-ready');
            if (revealObserver) revealObserver.disconnect();
            revealAll();
            return;
        }

        root.classList.add('motion-ready');
        if (!revealObserver) {
            revealObserver = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.remove('reveal-pending');
                    entry.target.classList.add('is-revealed');
                    revealObserver.unobserve(entry.target);
                });
            }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
        }

        document.querySelectorAll('[data-reveal]:not(.is-revealed)').forEach(element => {
            element.classList.add('reveal-pending');
            revealObserver.observe(element);
        });
    }

    function updateMotionPreference() {
        if (motionPreference.matches) {
            if (themeTransition) themeTransition.skipTransition();
        }
        observeReveals();
    }

    if (!motionPreference.matches && 'IntersectionObserver' in window) root.classList.add('motion-ready');

    document.addEventListener('DOMContentLoaded', () => {
        const inputs = document.querySelectorAll('input[name="theme"]');

        document.addEventListener('focusin', event => revealElement(event.target));
        window.addEventListener('hashchange', revealHashTarget);

        inputs.forEach(input => {
            input.checked = input.value === theme;
            input.addEventListener('change', () => {
                if (!input.checked || !validThemes.includes(input.value) || input.value === theme) return;

                theme = input.value;
                try { localStorage.setItem('kurtian-theme', theme); } catch (error) { /* Optional persistence. */ }
                transitionTheme();
            });
        });

        revealHashTarget();
        observeReveals();
        if (typeof motionPreference.addEventListener === 'function') motionPreference.addEventListener('change', updateMotionPreference);
        else if (typeof motionPreference.addListener === 'function') motionPreference.addListener(updateMotionPreference);
    }, { once: true });
}());
