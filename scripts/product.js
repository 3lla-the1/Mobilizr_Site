document.addEventListener('DOMContentLoaded', () => {
    // Debug: Log page load start
    console.debug('DEBUG: Page load started');

    // Debug: Log device details
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    console.debug('DEBUG: Device details', {
        userAgent: navigator.userAgent,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        isMobile: isMobile
    });

    // Debug: Log memory usage if available
    if (performance.memory) {
        console.debug('DEBUG: Memory usage', {
            jsHeapSizeLimit: performance.memory.jsHeapSizeLimit,
            totalJSHeapSize: performance.memory.totalJSHeapSize,
            usedJSHeapSize: performance.memory.usedJSHeapSize
        });
    }

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
    console.debug('DEBUG: Hero video element exists:', !!heroVideo);
    console.debug('DEBUG: Fallback image element exists:', !!fallbackImage);

    // Debug: Handle video loading
    if (heroVideo) {
        heroVideo.addEventListener('loadeddata', () => {
            console.debug('DEBUG: Hero video loaded successfully');
        });
        heroVideo.addEventListener('error', (e) => {
            console.error('DEBUG: Hero video error:', e);
        });
        // Debug: Check if video is attempted to load on mobile
        if (isMobile) {
            console.debug('DEBUG: Hero video detected on mobile, should not load');
        }
    }

    // Debug: Handle fallback image loading
    if (fallbackImage) {
        fallbackImage.addEventListener('load', () => {
            console.debug('DEBUG: Fallback image loaded successfully');
        });
        fallbackImage.addEventListener('error', () => {
            console.error('DEBUG: Fallback image failed to load');
        });
    }

    // Disable autoplay on mobile devices
    if (heroVideo && isMobile) {
        heroVideo.removeAttribute('autoplay');
        heroVideo.load();
        console.debug('DEBUG: Autoplay removed for hero video on mobile');
    } else if (heroVideo) {
        // Ensure video plays on desktop
        heroVideo.addEventListener('loadeddata', () => {
            heroVideo.play().catch(err => {
                console.error('DEBUG: Video play failed:', err);
            });
        });
    }

    // Toggle hamburger menu
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
        console.debug('DEBUG: Hamburger menu toggled');
    });

    // Close menu when clicking a link or button
    navLinks.querySelectorAll('a, .get-started-btn').forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            console.debug('DEBUG: Menu closed via link/button click');
        });
    });

    // Open modal and lazy-load iframe
    openModalBtn.addEventListener('click', () => {
        modal.classList.add('active');
        const iframe = document.querySelector('.modal-iframe');
        if (!iframe.src) {
            iframe.src = 'https://mobilizr.neetocal.com/meeting-with-ella-karlsson';
            console.debug('DEBUG: Modal opened, iframe src set');
        }
    });

    // Close modal when close button is clicked
    closeModalBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        console.debug('DEBUG: Modal closed via close button');
    });

    // Close modal when clicking outside the modal content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            console.debug('DEBUG: Modal closed via outside click');
        }
    });

    // Handle iframe errors
    const iframe = document.querySelector('.modal-iframe');
    iframe.addEventListener('error', () => {
        console.error('DEBUG: Failed to load NeetoCal iframe');
        modal.innerHTML = '<p>Sorry, the scheduling tool is unavailable. Please email us at <a href="mailto:team@mobilizr.eu">team@mobilizr.eu</a>.</p>';
    });

    // Handle logo click to navigate to index.html#hero
    logoLink.addEventListener('click', (e) => {
        e.preventDefault();
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        if (currentPath === 'index.html') {
            const heroSection = document.getElementById('hero');
            if (heroSection) {
                heroSection.scrollIntoView({ behavior: 'smooth' });
                console.debug('DEBUG: Logo clicked, scrolled to hero section');
            }
        } else {
            window.location.href = 'index.html#hero';
            console.debug('DEBUG: Logo clicked, navigating to index.html#hero');
        }
    });

    // Handle footer video click to navigate to index.html#hero
    footerLogoVideo.addEventListener('click', () => {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        if (currentPath === 'index.html') {
            const heroSection = document.getElementById('hero');
            if (heroSection) {
                heroSection.scrollIntoView({ behavior: 'smooth' });
                console.debug('DEBUG: Footer video clicked, scrolled to hero section');
            }
        } else {
            window.location.href = 'index.html#hero';
            console.debug('DEBUG: Footer video clicked, navigating to index.html#hero');
        }
    });

    // Debug: Log DOM content loaded completion
    console.debug('DEBUG: DOM content loaded completed');
});

// Debug: Catch unhandled errors
window.addEventListener('error', (e) => {
    console.error('DEBUG: Unhandled error:', {
        message: e.message,
        filename: e.filename,
        lineno: e.lineno,
        colno: e.colno,
        error: e.error
    });
});

// Debug: Catch unhandled promise rejections
window.addEventListener('unhandledrejection', (e) => {
    console.error('DEBUG: Unhandled promise rejection:', {
        reason: e.reason
    });
});