document.addEventListener('DOMContentLoaded', () => {
    // Debug: Log page load start with timestamp
    console.debug(`DEBUG: Page load started at ${new Date().toISOString()}`);

    // Debug: Log device details
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    console.debug(`DEBUG: Device details at ${new Date().toISOString()}`, {
        userAgent: navigator.userAgent,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        isMobile: isMobile
    });

    // Debug: Log memory usage if available
    if (performance.memory) {
        console.debug(`DEBUG: Initial memory usage at ${new Date().toISOString()}`, {
            jsHeapSizeLimit: performance.memory.jsHeapSizeLimit,
            totalJSHeapSize: performance.memory.totalJSHeapSize,
            usedJSHeapSize: performance.memory.usedJSHeapSize
        });
    }

    // Debug: Checkpoint before DOM queries
    console.debug(`DEBUG: Querying DOM elements at ${new Date().toISOString()}`);

    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const openModalBtn = document.querySelector('#open-scheduling-modal');
    const closeModalBtn = document.querySelector('#close-scheduling-modal');
    const modal = document.querySelector('#scheduling-modal');
    const logoLink = document.querySelector('.logo-link');
    const footerLogoVideo = document.querySelector('#footer-logo-video');
    const heroVideo = document.querySelector('.hero-background-video');
    const fallbackImage = document.querySelector('.hero-background-image');

    // Debug: Log video and image elements
    console.debug(`DEBUG: Hero video element exists at ${new Date().toISOString()}:`, !!heroVideo);
    console.debug(`DEBUG: Fallback image element exists at ${new Date().toISOString()}:`, !!fallbackImage);
    console.debug(`DEBUG: Modal button element exists at ${new Date().toISOString()}:`, !!openModalBtn);

    // Debug: Check video element styles, attributes, and sources
    if (heroVideo) {
        const computedStyle = window.getComputedStyle(heroVideo);
        console.debug(`DEBUG: Hero video computed styles at ${new Date().toISOString()}`, {
            display: computedStyle.display,
            visibility: computedStyle.visibility
        });
        console.debug(`DEBUG: Hero video attributes at ${new Date().toISOString()}`, {
            src: heroVideo.src,
            currentSrc: heroVideo.currentSrc,
            autoplay: heroVideo.hasAttribute('autoplay'),
            muted: heroVideo.muted,
            loop: heroVideo.loop,
            playsinline: heroVideo.playsInline,
            paused: heroVideo.paused,
            readyState: heroVideo.readyState
        });

        // Debug: Log video source elements
        const videoSources = heroVideo.querySelectorAll('source');
        console.debug(`DEBUG: Hero video sources at ${new Date().toISOString()}`, Array.from(videoSources).map(s => ({
            src: s.src,
            type: s.type
        })));

        // Debug: Additional video events
        heroVideo.addEventListener('loadedmetadata', () => {
            console.debug(`DEBUG: Hero video metadata loaded at ${new Date().toISOString()}, currentSrc: ${heroVideo.currentSrc}`);
        });
        heroVideo.addEventListener('loadeddata', () => {
            console.debug(`DEBUG: Hero video loaded successfully at ${new Date().toISOString()}, currentSrc: ${heroVideo.currentSrc}`);
        });
        heroVideo.addEventListener('canplay', () => {
            console.debug(`DEBUG: Hero video can play at ${new Date().toISOString()}, currentSrc: ${heroVideo.currentSrc}`);
        });
        heroVideo.addEventListener('stalled', () => {
            console.error(`DEBUG: Hero video stalled at ${new Date().toISOString()}, currentSrc: ${heroVideo.currentSrc}`);
        });
        heroVideo.addEventListener('error', (e) => {
            console.error(`DEBUG: Hero video error at ${new Date().toISOString()}:`, e);
        });
        heroVideo.addEventListener('play', () => {
            console.debug(`DEBUG: Hero video play started at ${new Date().toISOString()}`);
        });
        heroVideo.addEventListener('pause', () => {
            console.debug(`DEBUG: Hero video paused at ${new Date().toISOString()}`);
        });

        // Debug: Check if video is attempted to load on mobile
        if (isMobile) {
            console.debug(`DEBUG: Hero video detected on mobile, should not load at ${new Date().toISOString()}`);
        }

        // Debug: Observe video element mutations
        const videoObserver = new MutationObserver((mutations) => {
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

    // Debug: Handle fallback image loading
    if (fallbackImage) {
        fallbackImage.addEventListener('load', () => {
            console.debug(`DEBUG: Fallback image loaded successfully at ${new Date().toISOString()}`);
        });
        fallbackImage.addEventListener('error', () => {
            console.error(`DEBUG: Fallback image failed to load at ${new Date().toISOString()}`);
        });
    }

    // Debug: Checkpoint before video autoplay handling
    console.debug(`DEBUG: Handling video autoplay at ${new Date().toISOString()}`);

    // Disable autoplay on mobile devices
    if (heroVideo && isMobile) {
        heroVideo.removeAttribute('autoplay');
        heroVideo.load();
        console.debug(`DEBUG: Autoplay removed for hero video on mobile at ${new Date().toISOString()}, paused: ${heroVideo.paused}`);
    } else if (heroVideo) {
        // Ensure video plays on desktop
        heroVideo.addEventListener('loadeddata', () => {
            heroVideo.play().catch(err => {
                console.error(`DEBUG: Video play failed at ${new Date().toISOString()}:`, err);
            });
        });
    }

    // Debug: Checkpoint before hamburger menu setup
    console.debug(`DEBUG: Setting up hamburger menu at ${new Date().toISOString()}`);

    // Toggle hamburger menu
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
            console.debug(`DEBUG: Hamburger menu toggled at ${new Date().toISOString()}`);
        });
    }

    // Close menu when clicking a link or button
    if (navLinks) {
        navLinks.querySelectorAll('a, .get-started-btn').forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                console.debug(`DEBUG: Menu closed via link/button click at ${new Date().toISOString()}`);
            });
        });
    }

    // Debug: Checkpoint before modal setup
    console.debug(`DEBUG: Setting up modal button at ${new Date().toISOString()}`);

    // Open modal and lazy-load iframe
    if (openModalBtn) {
        console.debug(`DEBUG: Registering modal button listener at ${new Date().toISOString()}`);
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

    // Close modal when close button is clicked
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            console.debug(`DEBUG: Modal closed via close button at ${new Date().toISOString()}`);
        });
    }

    // Close modal when clicking outside the modal content
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                console.debug(`DEBUG: Modal closed via outside click at ${new Date().toISOString()}`);
            }
        });

        // Debug: Observe modal mutations
        const modalObserver = new MutationObserver((mutations) => {
            mutations.forEach(m => {
                console.debug(`DEBUG: Modal mutation at ${new Date().toISOString()}`, {
                    attributeName: m.attributeName,
                    oldValue: m.oldValue,
                    newValue: m.target.getAttribute(m.attributeName)
                });
            });
        });
        modalObserver.observe(modal, { attributes: true, attributeOldValue: true });
    }

    // Handle iframe errors
    const iframe = document.querySelector('.modal-iframe');
    if (iframe) {
        iframe.addEventListener('error', () => {
            console.error(`DEBUG: Failed to load NeetoCal iframe at ${new Date().toISOString()}`);
            modal.innerHTML = '<p>Sorry, the scheduling tool is unavailable. Please email us at <a href="mailto:team@mobilizr.eu">team@mobilizr.eu</a>.</p>';
        });
    }

    // Debug: Checkpoint before logo link setup
    console.debug(`DEBUG: Setting up logo link at ${new Date().toISOString()}`);

    // Handle logo click to navigate to index.html#hero
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

    // Debug: Checkpoint before footer video setup
    console.debug(`DEBUG: Setting up footer video at ${new Date().toISOString()}`);

    // Handle footer video click to navigate to index.html#hero
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

    // Debug: Log DOM content loaded completion
    console.debug(`DEBUG: DOM content loaded completed at ${new Date().toISOString()}`);
});

// Debug: Log window load completion
window.addEventListener('load', () => {
    console.debug(`DEBUG: Window fully loaded at ${new Date().toISOString()}`);
    // Debug: Log loaded resources
    const resources = performance.getEntriesByType('resource');
    console.debug(`DEBUG: Loaded resources at ${new Date().toISOString()}`, resources.map(r => ({
        name: r.name,
        initiatorType: r.initiatorType,
        duration: r.duration
    })));
});

// Debug: Periodic memory check
if (performance.memory) {
    setInterval(() => {
        console.debug(`DEBUG: Memory usage check at ${new Date().toISOString()}`, {
            jsHeapSizeLimit: performance.memory.jsHeapSizeLimit,
            totalJSHeapSize: performance.memory.totalJSHeapSize,
            usedJSHeapSize: performance.memory.usedJSHeapSize
        });
    }, 5000); // Check every 5 seconds
}

// Debug: Catch unhandled errors
window.addEventListener('error', (e) => {
    console.error(`DEBUG: Unhandled error at ${new Date().toISOString()}:`, {
        message: e.message,
        filename: e.filename,
        lineno: e.lineno,
        colno: e.colno,
        error: e.error
    });
});

// Debug: Catch unhandled promise rejections
window.addEventListener('unhandledrejection', (e) => {
    console.error(`DEBUG: Unhandled promise rejection at ${new Date().toISOString()}:`, {
        reason: e.reason
    });
});