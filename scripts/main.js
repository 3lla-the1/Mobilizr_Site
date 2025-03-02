document.addEventListener("DOMContentLoaded", function() {
    console.log("Hemsidan har laddats!");
  
    // 1. Smooth scrolling for navbar links
    document.querySelectorAll("nav a").forEach(anchor => {
      anchor.addEventListener("click", function(event) {
        event.preventDefault();
        const targetId = this.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: "smooth" });
        }
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
