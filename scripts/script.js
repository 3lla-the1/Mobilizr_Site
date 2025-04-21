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

    // Lazy-load videos using Intersection Observer
    const videos = document.querySelectorAll('.section-video, .footer-logo-video');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const videoObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            const video = entry.target;
            const fallbackImg = video.querySelector('.video-fallback');
            
            if (entry.isIntersecting) {
                video.play().catch(error => {
                    console.log('Autoplay was prevented:', error);
                    // If video fails to play, show the fallback image
                    video.style.display = 'none';
                    if (fallbackImg) {
                        fallbackImg.style.display = 'block';
                    }
                });
            } else {
                video.pause();
            }
        });
    }, observerOptions);

    // Add error handling for videos
    videos.forEach(video => {
        const fallbackImg = video.querySelector('.video-fallback');
        
        // Handle video errors (e.g., unsupported format or network issues)
        video.addEventListener('error', (e) => {
            console.error('Video failed to load:', e);
            video.style.display = 'none';
            if (fallbackImg) {
                fallbackImg.style.display = 'block';
            }
        });

        // Initially hide the fallback image
        if (fallbackImg) {
            fallbackImg.style.display = 'none';
        }

        // Observe the video for intersection
        videoObserver.observe(video);
    });

    const updateSlides = () => {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        slides[current].classList.add('active');
        dots[current].classList.add('active');
    };

    setInterval(() => {
        current = (current + 1) % slides.length;
        updateSlides();
    }, 3000);

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            current = parseInt(dot.getAttribute('data-slide'));
            updateSlides();
        });
    });

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

    const throttle = (func, limit) => {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    };
    
    const throttledUpdateActiveSection = throttle(updateActiveSection, 100);
    window.addEventListener('scroll', throttledUpdateActiveSection);

    indicators.forEach(indicator => {
        indicator.addEventListener('click', () => {
            const sectionId = indicator.getAttribute('data-section');
            const section = document.getElementById(sectionId);
            section.scrollIntoView({ behavior: 'smooth' });
        });
    });

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

    openModalBtn.addEventListener('click', () => {
        modal.classList.add('active');
    });

    closeModalBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
});