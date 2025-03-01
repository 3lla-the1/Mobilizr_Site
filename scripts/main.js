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

