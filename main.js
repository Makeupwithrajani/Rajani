document.addEventListener('DOMContentLoaded', () => {

  // NAVBAR SCROLL
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  // HAMBURGER MENU
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target)) navLinks.classList.remove('open');
    });
  }

  // PORTFOLIO FILTER
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portItems = document.querySelectorAll('.port-item');
  if (filterBtns.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        portItems.forEach((item, i) => {
          const show = filter === 'all' || item.dataset.cat === filter;
          item.style.opacity = show ? '1' : '0.08';
          item.style.pointerEvents = show ? 'auto' : 'none';
          item.style.transform = show ? 'scale(1)' : 'scale(0.96)';
          item.style.transitionDelay = show ? `${i * 0.04}s` : '0s';
        });
      });
    });
  }

  // FAQ ACCORDION
  const faqItems = document.querySelectorAll('.faq-item');
  if (faqItems.length) {
    faqItems.forEach(item => {
      const q = item.querySelector('.faq-q');
      q.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        faqItems.forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      });
    });
  }

  // CONTACT FORM
  const form = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  if (form && formSuccess) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      form.style.opacity = '0';
      form.style.transform = 'translateY(-10px)';
      setTimeout(() => {
        form.style.display = 'none';
        formSuccess.style.display = 'block';
        formSuccess.style.opacity = '0';
        setTimeout(() => {
          formSuccess.style.transition = 'opacity .5s';
          formSuccess.style.opacity = '1';
        }, 50);
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    });
  }

  // SCROLL REVEAL
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('_vis');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.07, rootMargin: '0px 0px -40px 0px' });

  const toReveal = document.querySelectorAll(
    '.srv-card, .feat-card, .stat-item, .info-card, .port-item, .cred, .why-item, .usp-item, .testi-card, .process-step, .tl-item'
  );

  toReveal.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity .6s ease ${Math.min(i * 0.07, 0.5)}s, transform .6s ease ${Math.min(i * 0.07, 0.5)}s`;
    revealObserver.observe(el);
  });

  // Apply visible styles
  document.addEventListener('scroll', () => {
    document.querySelectorAll('._vis').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  }, { passive: true });

  // Trigger immediately for above-fold elements
  setTimeout(() => {
    document.querySelectorAll('._vis').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  }, 150);

});
