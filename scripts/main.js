document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navItems = document.getElementById('nav-items');
  const toast = document.getElementById('toast');
  const currentYear = document.getElementById('current-year');
  
  const problemsContainer = document.querySelector('.problems-container');
  const cards = document.querySelectorAll('.problem-card');
  const cardVisibleHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--card-visible')) || 150;
  
  const blogFilterBtns = document.querySelectorAll('.blog-filter-btn');
  const blogPosts = document.querySelectorAll('.blog-post');

  const modals = {
    problem: {
      open: document.getElementById('problem-btn'),
      modal: document.getElementById('problem-modal'),
      close: document.getElementById('close-problem-modal'),
      form: document.getElementById('problem-form'),
    },
    meet: {
      open: document.getElementById('meet-btn'),
      modal: document.getElementById('meet-modal'),
      close: document.getElementById('close-meet-modal'),
      form: document.getElementById('meet-form'),
      addTime: document.getElementById('add-meet-time'),
      timeSlots: document.getElementById('meet-time-slots'),
    },
    newsletter: {
      open: document.getElementById('newsletter-link'),
      modal: document.getElementById('newsletter-modal'),
      close: document.getElementById('close-newsletter-modal'),
      form: document.getElementById('newsletter-form'),
    },
  };

  let timeSlotCount = 1;

  if (currentYear) currentYear.textContent = new Date().getFullYear();

  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) navbar.classList.add('scrolled');
      else navbar.classList.remove('scrolled');
    });
  }

  if (mobileToggle && navItems) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      navItems.classList.toggle('active');
      navbar.classList.toggle('mobile-active');
      const bars = mobileToggle.querySelectorAll('.bar');
      if (mobileToggle.classList.contains('active')) {
        bars[0].style.transform = 'translateY(8px) rotate(45deg)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'translateY(-8px) rotate(-45deg)';
      } else {
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
      }
    });
  }

  function handleModal(modalObj) {
    const { open, modal, close, form } = modalObj;
    console.log('Attaching listener to:', open);
    if (open && modal) {
      open.addEventListener('click', () => {
        console.log('Button clicked:', open.id);
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    }
    if (close && modal) {
      close.addEventListener('click', () => closeModal(modal));
    }
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal(modal);
      });
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) closeModal(modal);
      });
    }
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('Form submitted:', form.id);
        const data = new FormData(form);
        const url = form === modals.problem.form ? '/submit_problem.php' :
                    form === modals.meet.form ? '/submit_meet.php' :
                    '/submit_newsletter.php';
        console.log('Sending to:', url, 'with data:', form === modals.problem.form ? [...data] : Object.fromEntries(data));
        const options = {
          method: 'POST',
          body: form === modals.problem.form ? data : JSON.stringify(Object.fromEntries(data)),
          headers: form === modals.problem.form ? {} : { 'Content-Type': 'application/json' },
        };
        fetch(url, options)
          .then((res) => {
            console.log('Response status:', res.status);
            if (!res.ok) return res.json().then(err => { throw new Error(err.message); });
            return res.json();
          })
          .then((response) => {
            console.log('Response data:', response);
            if (response.status === 'success') {
              form.reset();
              closeModal(modal);
              showToast(response.message);
              confetti({ particleCount: 100, spread: 70 });
            } else {
              throw new Error(response.message);
            }
          })
          .catch((err) => {
            console.error('Fetch error:', err.message);
            showToast('Oops: ' + err.message);
          });
      });
    }
  }

  function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    const form = modal.querySelector('form');
    if (form) {
      form.reset();
      if (form.id === 'meet-form') {
        const extraSlots = modals.meet.timeSlots.querySelectorAll('.time-slot');
        extraSlots.forEach(slot => slot.remove());
        timeSlotCount = 1;
      }
    }
  }

  if (modals.meet.addTime && modals.meet.timeSlots) {
    modals.meet.addTime.addEventListener('click', () => {
      if (timeSlotCount < 3) {
        timeSlotCount++;
        const slot = document.createElement('div');
        slot.className = 'time-slot';
        slot.innerHTML = `<input type="datetime-local" id="meet-time${timeSlotCount}" name="meet-time${timeSlotCount}" class="input-field apple-input" required />`;
        modals.meet.timeSlots.appendChild(slot);
      } else {
        showToast('Max 3 time slots.');
      }
    });
  }

  Object.values(modals).forEach(handleModal);

  if (problemsContainer && cards.length) {
    function adjustCards() {
      let scroll = problemsContainer.scrollTop;
      cards.forEach((card, index) => {
        const cardPos = (index * cardVisibleHeight) - scroll;
        if (cardPos < 0) card.style.transform = `translateY(${cardPos}px)`;
        else card.style.transform = `translateY(0)`;
      });
    }
    problemsContainer.addEventListener('scroll', adjustCards);
    adjustCards();
  }

  if (blogFilterBtns.length && blogPosts.length) {
    blogFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        blogFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        blogPosts.forEach(post => {
          const category = post.getAttribute('data-category');
          if (filter === 'ALL' || category === filter) post.style.display = 'block';
          else post.style.display = 'none';
        });
      });
    });
    const latestBtn = document.querySelector('.blog-filter-btn[data-filter="ALL"]');
    if (latestBtn) latestBtn.click();
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.remove('hidden');
    toast.classList.add('active');
    setTimeout(() => {
      toast.classList.remove('active');
      setTimeout(() => toast.classList.add('hidden'), 300);
    }, 3000);
  }
});