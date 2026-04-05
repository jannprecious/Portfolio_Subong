// Wait sa DOM nga ma fully loaded
document.addEventListener('DOMContentLoaded', function() {
  
  // 1. SA SCROLL ANIMATION (Intersection Observer) - fadeup elements
  const fadeElements = document.querySelectorAll('.fade-up');
  
  if (fadeElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -20px 0px" });
    
    fadeElements.forEach(el => observer.observe(el));
    
    // ma check para sa elements kun already visible mag load
    window.addEventListener('load', () => {
      fadeElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          el.classList.add('visible');
          observer.unobserve(el);
        }
      });
    });
  }
  
  // 2. CONTACT FORM HANDLER (client-side validation + demo submission)
  const form = document.getElementById('contactForm');
  const feedbackDiv = document.getElementById('form-feedback');
  
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');
      
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const message = messageInput.value.trim();
      
      // Validation
      if (!name || !email || !message) {
        feedbackDiv.style.color = "#c2410c";
        feedbackDiv.innerHTML = "⚠️ Please fill in all fields before sending.";
        return;
      }
      
      const emailPattern = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
      if (!emailPattern.test(email)) {
        feedbackDiv.style.color = "#c2410c";
        feedbackDiv.innerHTML = "📧 Please enter a valid email address.";
        return;
      }
      
      // Simulate sending message
      feedbackDiv.style.color = "#1f7a8c";
      feedbackDiv.innerHTML = " Sending your message...";
      
      setTimeout(() => {
        //ma Clear angform fields after successful submission
        nameInput.value = '';
        emailInput.value = '';
        messageInput.value = '';
        feedbackDiv.innerHTML = "✅ Thanks " + name + "! I'll get back to you soon. (demo)";
        feedbackDiv.style.color = "#2b6e47";
        
        // Reset feedback after 4 seconds
        setTimeout(() => {
          if (feedbackDiv.innerHTML.includes("Thanks") || feedbackDiv.innerHTML.includes("demo")) {
            feedbackDiv.innerHTML = "";
          }
        }, 4000);
      }, 800);
    });
  }
  
  // 3. SMOOTH SCROLLING PARA SA MGA NAVIGATION LINKS
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    link.addEventListener('click', function(event) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          event.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          // Update URL hash without jumping
          history.pushState(null, null, targetId);
        }
      }
    });
  });
  
  // 4. Active navigation highlight sa scroll
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-links a');
  
  function updateActiveNav() {
    let current = '';
    const scrollPos = window.scrollY + 150;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    navItems.forEach(item => {
      item.style.color = '';
      item.style.fontWeight = '500';
      if (item.getAttribute('href') === `#${current}`) {
        item.style.color = '#1f7a8c';
        item.style.fontWeight = '600';
      }
    });
  }
  
  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav(); // Call on load
  
  console.log(" Personal portfolio ready — Precious Janna D. Subong");
});