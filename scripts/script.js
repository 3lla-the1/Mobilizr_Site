document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot');
    const logoLink = document.querySelector('.logo-link');
    const footerLogoVideo = document.querySelector('#footer-logo-video');
    const openModalBtn = document.querySelector('#open-scheduling-modal');
    const closeModalBtn = document.querySelector('#close-scheduling-modal');
    const modal = document.querySelector('#scheduling-modal');
    let current = 0;

    const video = document.querySelector('#section1 video');
    if (video) {
        video.play().catch(error => {
            console.log('Autoplay was prevented:', error);
            setTimeout(() => video.play(), 1000);
        });

        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') {
                video.play();
            }
        });
    }

    // Function to update slideshow and dots
    const updateSlides = () => {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        slides[current].classList.add('active');
        dots[current].classList.add('active');
    };

    // Automatic slideshow
    setInterval(() => {
        current = (current + 1) % slides.length;
        updateSlides();
    }, 3000);

    // Click on dots
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            current = parseInt(dot.getAttribute('data-slide'));
            updateSlides();
        });
    });

    // Toggle hamburger menu and cross
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

    // Feature nav code
    const indicators = document.querySelectorAll('.indicator');
    const sectionTitle = document.querySelector('.section-title');
    const sections = document.querySelectorAll('.content-section');

    const sectionTitles = {
        section1: 'Work Permit Engine',
        section2: 'Give Talent a Better Start',
        section3: 'Expand with Ease',
        section4: 'Scale with Confidence'
    };

    const updateActiveSection = () => {
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 100 && window.scrollY < sectionTop + sectionHeight - 100) {
                currentSection = section.id;
            }
        });

        indicators.forEach(indicator => {
            indicator.classList.remove('active');
            if (indicator.getAttribute('data-section') === currentSection) {
                indicator.classList.add('active');
            }
        });

        sectionTitle.textContent = sectionTitles[currentSection] || 'Work Permit Engine';
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection);

    indicators.forEach(indicator => {
        indicator.addEventListener('click', () => {
            const sectionId = indicator.getAttribute('data-section');
            const section = document.getElementById(sectionId);
            section.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Handle logo click to navigate to index.html#hero
    logoLink.addEventListener('click', (e) => {
        e.preventDefault();
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        if (currentPath === 'index.html') {
            // If already on index.html, scroll to hero section
            const heroSection = document.getElementById('hero');
            if (heroSection) {
                heroSection.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            // Navigate to index.html#hero
            window.location.href = 'index.html#hero';
        }
    });

    // Handle footer video click to navigate to index.html#hero
    footerLogoVideo.addEventListener('click', () => {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        if (currentPath === 'index.html') {
            // If already on index.html, scroll to hero section
            const heroSection = document.getElementById('hero');
            if (heroSection) {
                heroSection.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            // Navigate to index.html#hero
            window.location.href = 'index.html#hero';
        }
    });

    // Open modal when "Meet us" button is clicked
    openModalBtn.addEventListener('click', () => {
        modal.classList.add('active');
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
});