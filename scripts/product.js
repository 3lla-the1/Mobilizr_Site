document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const openModalBtn = document.querySelector('#open-scheduling-modal');
    const closeModalBtn = document.querySelector('#close-scheduling-modal');
    const modal = document.querySelector('#scheduling-modal');
    const logoLink = document.querySelector('.logo-link');
    const footerLogoVideo = document.querySelector('#footer-logo-video');
    const heroVideo = document.querySelector('.hero-background-video');

    // Disable autoplay on mobile
    if (heroVideo && window.innerWidth <= 768) {
        heroVideo.removeAttribute('autoplay');
        heroVideo.load(); // Ensure video is ready but not playing
    }

    // Toggle hamburger menu
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking a link or button
    navLinks.querySelectorAll('a, .get-started-btn').forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Open modal and lazy-load iframe
    openModalBtn.addEventListener('click', () => {
        modal.classList.add('active');
        const iframe = document.querySelector('.modal-iframe');
        if (!iframe.src) {
            iframe.src = 'https://mobilizr.neetocal.com/meeting-with-ella-karlsson';
        }
    });

    // Close modal when close button is clicked
    closeModalBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    // Close modal when clicking outside the modal content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // Handle iframe errors
    const iframe = document.querySelector('.modal-iframe');
    iframe.addEventListener('error', () => {
        console.error('Failed to load NeetoCal iframe');
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
            }
        } else {
            window.location.href = 'index.html#hero';
        }
    });

    // Handle footer video click to navigate to index.html#hero
    footerLogoVideo.addEventListener('click', () => {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        if (currentPath === 'index.html') {
            const heroSection = document.getElementById('hero');
            if (heroSection) {
                heroSection.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            window.location.href = 'index.html#hero';
        }
    });
});