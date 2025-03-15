document.addEventListener("DOMContentLoaded", function() {
    console.log("Hemsidan har laddats!");
  
    // 1. Smooth scrolling for navbar links
    document.querySelectorAll("nav a").forEach(anchor => {
        anchor.addEventListener("click", function(event) {
          const href = this.getAttribute("href");
      
          // If the link is an internal section (starts with #), enable smooth scrolling
          if (href.startsWith("#")) {
            event.preventDefault();
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
              targetSection.scrollIntoView({ behavior: "smooth" });
            }
          }
          // Otherwise, let it navigate normally (for external pages like team.html)
        });
      });
  
    // 2. IntersectionObserver for .fade-in elements
    const fadeElements = document.querySelectorAll(".fade-in");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Element enters the viewport
            entry.target.classList.add('visible');
          } else {
            // Element leaves the viewport
            entry.target.classList.remove('visible');
          }
        });
      }, { threshold: 0.2 });
      
  
    // *** This line is CRUCIAL. ***
    // It tells the observer to actually watch each fade element:
    fadeElements.forEach(el => observer.observe(el));
  });

  // 2. The Bubble/Interactive code:
  // ---------------------------------------------------------------
  const interBubble = document.querySelector('.interactive');
  if (interBubble) {
    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0; henrik.atterstrom. arbetsformdlingen.se ny i danmark.dk
    

    function move() {
      // Slowly ease the current position towards the target
      curX += (tgX - curX) / 20;
      curY += (tgY - curY) / 20;
      interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
      requestAnimationFrame(move);
    }

    window.addEventListener('mousemove', (event) => {
      tgX = event.clientX;
      tgY = event.clientY;
    });

    // Start the animation
    move();
  }






  function startConfetti() {
    var duration = 3 * 1000; // 3 seconds
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function() {
        var timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        var particleCount = 5 * (timeLeft / duration);
        confetti({
            particleCount,
            angle: randomInRange(55, 125),
            spread: 60,
            origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 },
            colors: ["#FFB3B3", "#B3CFFF", "#FFDD99", "#B3E0B3"] // Apple-inspired pastels
        });
    }, 250);
}
