(function () {
    const tabs = Array.from(document.querySelectorAll('[data-project-view]'));
    const panels = Array.from(document.querySelectorAll('[data-project-panel]'));
    const tabList = document.querySelector('.project-view');
    if (!tabs.length || !panels.length || !tabList) return;

    const panelFor = view => panels.find(panel => panel.dataset.projectPanel === view);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let switchTimer;
    let enteringPanel;

    function activate(view, options = {}) {
        const nextPanel = panelFor(view);
        if (!nextPanel) return;

        tabs.forEach(tab => {
            const selected = tab.dataset.projectView === view;
            tab.setAttribute('aria-selected', String(selected));
            tab.tabIndex = selected ? 0 : -1;
        });
        panels.forEach(panel => {
            const selected = panel === nextPanel;
            panel.hidden = !selected;
            panel.setAttribute('role', 'tabpanel');
            if (selected) panel.setAttribute('aria-labelledby', tabs.find(tab => tab.dataset.projectView === view).id);
            else panel.removeAttribute('aria-labelledby');
            panel.tabIndex = selected ? 0 : -1;
        });

        if (options.animate && !reducedMotion.matches) {
            if (enteringPanel) delete enteringPanel.dataset.entering;
            nextPanel.dataset.entering = 'true';
            enteringPanel = nextPanel;
            window.clearTimeout(switchTimer);
            switchTimer = window.setTimeout(() => {
                delete nextPanel.dataset.entering;
                enteringPanel = null;
            }, 620);
        }
        if (options.focus) tabs.find(tab => tab.dataset.projectView === view).focus();
    }

    function showLinkedPanel() {
        if (!location.hash) return;
        let targetId;
        try { targetId = decodeURIComponent(location.hash.slice(1)); } catch (error) { return; }
        const target = document.getElementById(targetId);
        const owner = target && target.closest('[data-project-panel]');
        if (!owner) return;

        activate(owner.dataset.projectPanel);
        target.classList.remove('reveal-pending');
        target.classList.add('is-revealed');
        window.requestAnimationFrame(() => target.scrollIntoView({ behavior: 'instant', block: 'start' }));
        return true;
    }

    tabList.hidden = false;
    tabs.forEach(tab => {
        tab.addEventListener('click', () => activate(tab.dataset.projectView, { animate: true }));
        tab.addEventListener('keydown', event => {
            const currentIndex = tabs.indexOf(tab);
            const destinations = { ArrowLeft: currentIndex - 1, ArrowUp: currentIndex - 1, ArrowRight: currentIndex + 1, ArrowDown: currentIndex + 1, Home: 0, End: tabs.length - 1 };
            if (!(event.key in destinations)) return;
            event.preventDefault();
            const nextIndex = (destinations[event.key] + tabs.length) % tabs.length;
            activate(tabs[nextIndex].dataset.projectView, { animate: true, focus: true });
        });
    });

    if (!showLinkedPanel()) activate('development');
    window.addEventListener('hashchange', showLinkedPanel);
}());
