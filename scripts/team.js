document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const indicators = document.querySelectorAll('#story-nav .indicator');
    const sectionTitle = document.querySelector('#story-nav .section-title');
    const sections = document.querySelectorAll('.content-section');
    const logoLink = document.querySelector('.logo-link');
    const footerLogoVideo = document.querySelector('#footer-logo-video');
    const openModalBtn = document.querySelector('#open-scheduling-modal');
    const closeModalBtn = document.querySelector('#close-scheduling-modal');
    const modal = document.querySelector('#scheduling-modal');

    const sectionTitles = {
        story1: 'Where It Began',
        story2: 'The Spark',
        story3: 'Redefining Mobility',
        story4: 'A World in Motion'
    };

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

    // Debounce utility
    const debounce = (func, wait) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    };

    // Update active section
    const updateActiveSection = () => {
        let currentSection = '';
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const sectionTop = rect.top + window.scrollY;
            const sectionHeight = rect.height;
            if (window.scrollY >= sectionTop - 60 - 100 && window.scrollY < sectionTop + sectionHeight - 60 - 100) {
                currentSection = section.id;
            }
        });

        indicators.forEach(indicator => {
            indicator.classList.remove('active');
            if (indicator.getAttribute('data-section') === currentSection) {
                indicator.classList.add('active');
            }
        });

        sectionTitle.textContent = sectionTitles[currentSection] || 'Where It Began';
    };

    // Initial call and debounced scroll listener
    updateActiveSection();
    window.addEventListener('scroll', debounce(updateActiveSection, 10));

    // Smooth scroll on indicator click
    indicators.forEach(indicator => {
        indicator.addEventListener('click', () => {
            const sectionId = indicator.getAttribute('data-section');
            const section = document.getElementById(sectionId);
            section.scrollIntoView({ behavior: 'smooth' });
            setTimeout(updateActiveSection, 500);
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

    // Dynamic Tally Popup Width
    const joinUsBtn = document.getElementById('join-us-btn');
    if (joinUsBtn) {
        joinUsBtn.addEventListener('click', (e) => {
            e.preventDefault();

            // Calculate dynamic width
            const screenWidth = window.innerWidth;
            let modalWidth;

            // Desktop: 70% of screen width, max 600px, min 400px
            if (screenWidth > 900) {
                modalWidth = Math.min(Math.max(screenWidth * 0.7, 400), 600);
            }
            // Tablet: 80% of screen width, max 550px, min 350px
            else if (screenWidth > 600) {
                modalWidth = Math.min(Math.max(screenWidth * 0.8, 350), 550);
            }
            // Mobile: 90% of screen width, max 500px, min 300px
            else {
                modalWidth = Math.min(Math.max(screenWidth * 0.9, 300), 500);
            }

            // Open Tally popup with dynamic width
            Tally.openPopup('npZQeP', {
                layout: 'modal', // Always modal for consistency
                width: Math.round(modalWidth),
                emoji: { text: '🌍', animation: 'heart-beat' },
                autoClose: 2000,
                onOpen: () => console.log('Dynamic popup opened'),
                onSubmit: () => console.log('Dynamic form submitted')
            });
        });
    }
});