document.addEventListener('DOMContentLoaded', () => {
    // Hamburger menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const logoLink = document.querySelector('.logo-link');
    const footerLogoVideo = document.querySelector('#footer-logo-video');
    const openModalBtn = document.querySelector('#open-scheduling-modal');
    const closeModalBtn = document.querySelector('#close-scheduling-modal');
    const modal = document.querySelector('#scheduling-modal');
    const candidateButtons = document.querySelectorAll('[data-tally-open="wvWkgQ"]'); // Select all buttons/links

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    navLinks.querySelectorAll('a, .get-started-btn').forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Video autoplay
    const video = document.querySelector('.hero-video');
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

    // Placeholder for employer form
    const employerButtons = document.querySelectorAll('[data-tally-open="placeholder"]');
    if (employerButtons.length > 0) {
        employerButtons.forEach(btn => {
            // Remove Tally attributes to prevent default behavior
            btn.removeAttribute('data-tally-open');
            btn.removeAttribute('data-tally-overlay');
            btn.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent any default behavior
                alert('Employer registration is coming soon! Please contact info@mobilizr.com for more information.');
            });
        });
    }

    // Emoji hover effects for hero buttons
    const employeeBtn = document.querySelector('button[data-tally-open="wvWkgQ"]');
    const employerBtnEmoji = document.querySelector('button[data-tally-open="placeholder"]') || document.querySelector('button[data-tally-open="placeholder"]');

    const createEmoji = (button, emoji) => {
        if (!button) return; // Skip if button is not found
        const emojiSpan = document.createElement('span');
        emojiSpan.textContent = emoji;
        emojiSpan.style.position = 'absolute';
        emojiSpan.style.top = '-20px';
        emojiSpan.style.left = '50%';
        emojiSpan.style.transform = 'translateX(-50%)';
        emojiSpan.style.fontSize = '1.2rem';
        emojiSpan.style.opacity = '0';
        emojiSpan.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        button.style.position = 'relative';
        button.appendChild(emojiSpan);

        button.addEventListener('mouseenter', () => {
            emojiSpan.style.opacity = '1';
            emojiSpan.style.transform = 'translateX(-50%) translateY(-10px)';
        });

        button.addEventListener('mouseleave', () => {
            emojiSpan.style.opacity = '0';
            emojiSpan.style.transform = 'translateX(-50%)';
        });
    };

    if (employeeBtn) createEmoji(employeeBtn, '💼');
    if (employerBtnEmoji) createEmoji(employerBtnEmoji, '🚀');

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const faqAnswer = question.nextElementSibling;

            // Close other open FAQs
            document.querySelectorAll('.faq-item.active').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                    item.querySelector('.faq-answer').classList.remove('active');
                }
            });

            // Toggle current FAQ
            faqItem.classList.toggle('active');
            faqAnswer.classList.toggle('active');
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

    // Dynamic Tally Popup for Candidate Form (apply to all buttons/links with data-tally-open="wvWkgQ")
    if (candidateButtons.length > 0) {
        candidateButtons.forEach(btn => {
            // Remove the data-tally-open attribute to prevent Tally's default behavior
            btn.removeAttribute('data-tally-open');
            // Remove any other Tally-related attributes
            btn.removeAttribute('data-tally-emoji-text');
            btn.removeAttribute('data-tally-emoji-animation');

            btn.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent any default behavior
                e.stopPropagation(); // Stop event propagation to be extra sure

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
                Tally.openPopup('wvWkgQ', {
                    layout: 'modal', // Center the popup on the screen
                    width: Math.round(modalWidth),
                    emoji: { text: '🇸🇪', animation: 'heart-beat' },
                    autoClose: 2000,
                    onOpen: () => console.log('Candidate popup opened'),
                    onSubmit: () => console.log('Candidate form submitted')
                });
            });
        });
    }
});