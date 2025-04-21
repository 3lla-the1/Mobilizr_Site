document.addEventListener('DOMContentLoaded', () => {
    console.debug(`DEBUG: Page load started at ${new Date().toISOString()}`);

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    console.debug(`DEBUG: Device details at ${new Date().toISOString()}`, {
        userAgent: navigator.userAgent,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        isMobile: isMobile
    });

    const heroVideo = document.querySelector('.hero-background-video');
    const fallbackImage = document.querySelector('.hero-background-image');
    console.debug(`DEBUG: Hero video element exists at ${new Date().toISOString()}:`, !!heroVideo);
    console.debug(`DEBUG: Fallback image element exists at ${new Date().toISOString()}:`, !!fallbackImage);

    if (isMobile && heroVideo) {
        console.debug(`DEBUG: Mobile device detected, skipping video processing at ${new Date().toISOString()}`);
        const videoSources = heroVideo.querySelectorAll('source');
        videoSources.forEach(source => {
            source.src = '';
        });
        heroVideo.load();
        heroVideo.remove();
        console.debug(`DEBUG: Hero video element removed from DOM at ${new Date().toISOString()}`);
    } else if (heroVideo) {
        console.debug(`DEBUG: Hero video computed styles at ${new Date().toISOString()}`, {
            display: window.getComputedStyle(heroVideo).display,
            visibility: window.getComputedStyle(heroVideo).visibility
        });
        console.debug(`DEBUG: Hero video attributes at ${new Date().toISOString()}`, {
            src: heroVideo.src,
            currentSrc: heroVideo.currentSrc,
            muted: heroVideo.muted,
            loop: heroVideo.loop,
            playsinline: heroVideo.playsInline,
            paused: heroVideo.paused,
            readyState: heroVideo.readyState
        });

        const videoSources = heroVideo.querySelectorAll('source');
        console.debug(`DEBUG: Hero video sources at ${new Date().toISOString()}`, Array.from(videoSources).map(s => ({
            src: s.src,
            type: s.type
        })));

        heroVideo.addEventListener('loadeddata', () => {
            console.debug(`DEBUG: Hero video loaded successfully at ${new Date().toISOString()}, currentSrc: ${heroVideo.currentSrc}`);
            heroVideo.play().catch(err => {
                console.error(`DEBUG: Video play failed at ${new Date().toISOString()}:`, err);
            });
        });
        heroVideo.addEventListener('error', (e) => {
            console.error(`DEBUG: Hero video error at ${new Date().toISOString()}:`, e);
        });

        let lastMutation = 0;
        const videoObserver = new MutationObserver((mutations) => {
            const now = Date.now();
            if (now - lastMutation < 100) return;
            lastMutation = now;
            mutations.forEach(m => {
                console.debug(`DEBUG: Hero video mutation at ${new Date().toISOString()}`, {
                    attributeName: m.attributeName,
                    oldValue: m.oldValue,
                    newValue: m.target.getAttribute(m.attributeName)
                });
            });
        });
        videoObserver.observe(heroVideo, { attributes: true, attributeOldValue: true });
    }

    if (fallbackImage) {
        fallbackImage.addEventListener('load', () => {
            console.debug(`DEBUG: Fallback image loaded successfully at ${new Date().toISOString()}`);
        });
        fallbackImage.addEventListener('error', () => {
            console.error(`DEBUG: Fallback image failed to load at ${new Date().toISOString()}`);
        });
    }

    // Hamburger menu, modal, logo link, footer video setup (unchanged)
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const openModalBtn = document.querySelector('#open-scheduling-modal');
    const closeModalBtn = document.querySelector('#close-scheduling-modal');
    const modal = document.querySelector('#scheduling-modal');
    const logoLink = document.querySelector('.logo-link');
    const footerLogoVideo = document.querySelector('#footer-logo-video');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
            console.debug(`DEBUG: Hamburger menu toggled at ${new Date().toISOString()}`);
        });
    }

    if (navLinks) {
        navLinks.querySelectorAll('a, .get-started-btn').forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                console.debug(`DEBUG: Menu closed via link/button click at ${new Date().toISOString()}`);
            });
        });
    }

    if (openModalBtn) {
        openModalBtn.addEventListener('click', () => {
            console.debug(`DEBUG: Modal button clicked at ${new Date().toISOString()}`);
            modal.classList.add('active');
            const iframe = document.querySelector('.modal-iframe');
            if (!iframe.src) {
                iframe.src = 'https://mobilizr.neetocal.com/meeting-with-ella-karlsson';
                console.debug(`DEBUG: Modal opened, iframe src set at ${new Date().toISOString()}`);
            }
        });
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            console.debug(`DEBUG: Modal closed via close button at ${new Date().toISOString()}`);
        });
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                console.debug(`DEBUG: Modal closed via outside click at ${new Date().toISOString()}`);
            }
        });
    }

    const iframe = document.querySelector('.modal-iframe');
    if (iframe) {
        iframe.addEventListener('error', () => {
            console.error(`DEBUG: Failed to load NeetoCal iframe at ${new Date().toISOString()}`);
            modal.innerHTML = '<p>Sorry, the scheduling tool is unavailable. Please email us at <a href="mailto:team@mobilizr.eu">team@mobilizr.eu</a>.</p>';
        });
    }

    if (logoLink) {
        logoLink.addEventListener('click', (e) => {
            e.preventDefault();
            const currentPath = window.location.pathname.split('/').pop() || 'index.html';
            if (currentPath === 'index.html') {
                const heroSection = document.getElementById('hero');
                if (heroSection) {
                    heroSection.scrollIntoView({ behavior: 'smooth' });
                    console.debug(`DEBUG: Logo clicked, scrolled to hero section at ${new Date().toISOString()}`);
                }
            } else {
                window.location.href = 'index.html#hero';
                console.debug(`DEBUG: Logo clicked, navigating to index.html#hero at ${new Date().toISOString()}`);
            }
        });
    }

    if (footerLogoVideo) {
        footerLogoVideo.addEventListener('click', () => {
            const currentPath = window.location.pathname.split('/').pop() || 'index.html';
            if (currentPath === 'index.html') {
                const heroSection = document.getElementById('hero');
                if (heroSection) {
                    heroSection.scrollIntoView({ behavior: 'smooth' });
                    console.debug(`DEBUG: Footer video clicked, scrolled to hero section at ${new Date().toISOString()}`);
                }
            } else {
                window.location.href = 'index.html#hero';
                console.debug(`DEBUG: Footer video clicked, navigating to index.html#hero at ${new Date().toISOString()}`);
            }
        });
    }

    console.debug(`DEBUG: DOM content loaded completed at ${new Date().toISOString()}`);
});

window.addEventListener('load', () => {
    console.debug(`DEBUG: Window fully loaded at ${new Date().toISOString()}`);
});

if (performance.memory && !window.matchMedia('(max-width: 768px)').matches) {
    setInterval(() => {
        console.debug(`DEBUG: Memory usage check at ${new Date().toISOString()}`, {
            jsHeapSizeLimit: performance.memory.jsHeapSizeLimit,
            totalJSHeapSize: performance.memory.totalJSHeapSize,
            usedJSHeapSize: performance.memory.usedJSHeapSize
        });
    }, 10000);
}

window.addEventListener('error', (e) => {
    console.error(`DEBUG: Unhandled error at ${new Date().toISOString()}:`, {
        message: e.message,
        filename: e.filename,
        lineno: e.lineno,
        colno: e.colno
    });
});

window.addEventListener('unhandledrejection', (e) => {
    console.error(`DEBUG: Unhandled promise rejection at ${new Date().toISOString()}:`, {
        reason: e.reason
    });
});