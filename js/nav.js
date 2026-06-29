(function () {
  var PAGES = {
    'index.html': 'nav-home',
    'services.html': 'nav-services',
    'about.html': 'nav-about',
    'performance.html': 'nav-performance',
    'consultation.html': 'nav-consultation',
    'contact.html': 'nav-contact'
  };

  function getCurrentPage() {
    var path = window.location.pathname;
    var filename = path.split('/').pop() || 'index.html';
    if (filename === '' || filename === '/') filename = 'index.html';
    return filename;
  }

  function setActiveNav() {
    var current = getCurrentPage();
    var activeId = PAGES[current];
    if (activeId) {
      var el = document.getElementById(activeId);
      if (el) el.classList.add('active');
      var mob = document.getElementById('mob-' + activeId);
      if (mob) mob.classList.add('active');
    }
  }

  function initHamburger() {
    var btn = document.getElementById('hamburger-btn');
    var menu = document.getElementById('mobile-menu');
    if (!btn || !menu) return;
    btn.addEventListener('click', function () {
      btn.classList.toggle('open');
      menu.classList.toggle('open');
    });
    document.addEventListener('click', function (e) {
      if (!btn.contains(e.target) && !menu.contains(e.target)) {
        btn.classList.remove('open');
        menu.classList.remove('open');
      }
    });
    var mobileLinks = menu.querySelectorAll('a');
    mobileLinks.forEach(function (link) {
      link.addEventListener('click', function() {
        btn.classList.remove('open');
        menu.classList.remove('open');
      });
    });
  }

  function initStickyNav() {
    var nav = document.getElementById('main-nav');
    if (!nav) return;
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });
  }

  function initBackToTop() {
    var btn = document.getElementById('back-to-top');
    if (!btn) return;
    window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    });
    btn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  function initScrollReveal() {
    var reveals = document.querySelectorAll('.reveal');
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    
    reveals.forEach(function(el) {
      observer.observe(el);
    });
  }

  function initCounters() {
    var counters = document.querySelectorAll('[data-count]');
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var targetStr = el.getAttribute('data-count');
          var target = parseInt(targetStr, 10);
          var suffix = el.getAttribute('data-suffix') || '';
          
          if (isNaN(target)) {
            el.textContent = targetStr + suffix;
            observer.unobserve(el);
            return;
          }
          
          var start = 0;
          var duration = 1500;
          var stepTime = Math.abs(Math.floor(duration / target));
          stepTime = Math.max(stepTime, 16);
          
          var timer = setInterval(function() {
            start += Math.ceil(target / (duration / stepTime));
            if (start >= target) {
              el.textContent = target + suffix;
              clearInterval(timer);
            } else {
              el.textContent = start + suffix;
            }
          }, stepTime);
          
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.1 });
    
    counters.forEach(function(c) {
      observer.observe(c);
    });
  }

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
      anchor.addEventListener('click', function(e) {
        var targetId = this.getAttribute('href');
        if (targetId === '#') return;
        var targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  function injectWhatsApp() {
    if (document.getElementById('whatsapp-btn')) return;
    var btn = document.createElement('a');
    btn.id = 'whatsapp-btn';
    btn.href = 'https://wa.me/18005551234';
    btn.target = '_blank';
    btn.setAttribute('aria-label', 'Chat on WhatsApp');
    btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 175.216 175.552" fill="#fff"><path d="M87.184 14.2c-40.415 0-73.28 32.865-73.28 73.28 0 13.72 3.803 26.56 10.402 37.555L14.5 161.352l37.467-9.553a73.09 73.09 0 0 0 35.217 8.981c40.415 0 73.28-32.865 73.28-73.28s-32.865-73.28-73.28-73.28zm0 132.888c-12.36 0-24.09-3.628-34.11-10.46l-2.15-1.36-23.5 6.09 6.272-22.87-1.535-2.373c-7.57-11.67-11.578-25.17-11.578-39.195 0-32.898 26.782-59.68 59.68-59.68 15.928 0 30.912 6.218 42.178 17.483 11.267 11.267 17.483 26.25 17.483 42.178-.08 32.978-26.862 59.76-59.76 59.76z"/><path d="M126.66 100.887c-2.148-1.074-12.698-6.27-14.67-6.97-1.972-.7-3.407-1.076-4.84 1.074-1.434 2.15-5.558 6.97-6.814 8.404-1.256 1.434-2.512 1.614-4.66.54-2.148-1.076-9.074-3.347-17.282-10.68-6.39-5.702-10.706-12.747-11.962-14.895-1.256-2.148-.134-3.312 .944-4.382.97-.963 2.148-2.512 3.222-3.766 1.076-1.256 1.434-2.15 2.15-3.586.718-1.434.358-2.69-.18-3.766-.538-1.076-4.84-11.664-6.632-15.968-1.746-4.192-3.52-3.624-4.84-3.69-1.254-.06-2.69-.074-4.124-.074-1.434 0-3.766.538-5.736 2.688-1.97 2.15-7.528 7.35-7.528 17.938 0 10.587 7.708 20.82 8.784 22.254 1.076 1.434 15.178 23.178 36.768 32.496 5.132 2.214 9.136 3.538 12.258 4.528 5.15 1.636 9.838 1.405 13.544.85 4.132-.617 12.698-5.19 14.49-10.2 1.79-5.01 1.79-9.302 1.254-10.2-.538-.896-1.972-1.434-4.12-2.508z"/></svg>';

    
    var tooltip = document.createElement('div');
    tooltip.id = 'whatsapp-tooltip';
    tooltip.textContent = 'Need help? Chat with us!';
    
    document.body.appendChild(btn);
    document.body.appendChild(tooltip);
    
    setTimeout(function() {
      tooltip.classList.add('show');
    }, 5000);
  }

  function initThemeListener() {
    var mq = window.matchMedia('(prefers-color-scheme: light)');
    function applyTheme(e) {
      if (e.matches) {
        document.body.classList.add('light-theme');
      } else {
        document.body.classList.remove('light-theme');
      }
    }
    if (mq.addEventListener) {
      mq.addEventListener('change', applyTheme);
    } else if (mq.addListener) {
      mq.addListener(applyTheme);
    }
    applyTheme(mq);
  }

  function injectLogo() {
    var logos = document.querySelectorAll('.nav-logo');
    var base = window.location.pathname.replace(/\/[^\/]*$/, '/');
    var logoSrc = base + 'assets/logo.png?v=3';
    logos.forEach(function(el) {
      el.classList.add('nav-logo-badge');
      
      var img = document.createElement('img');
      img.className = 'logo-img';
      img.alt = 'Accountsup Logo';
      img.src = logoSrc;
      
      img.onerror = function() {
        this.style.display = 'none';
        el.textContent = 'ACCOUNTSUP';
        el.style.cssText += 'font-size:16px;font-weight:800;letter-spacing:0.05em;color:var(--gold);';
      };
      
      el.innerHTML = '';
      el.appendChild(img);
    });
  }

  function initAll() {
    injectLogo();
    setActiveNav();
    initHamburger();
    initStickyNav();
    initBackToTop();
    initScrollReveal();
    initCounters();
    initSmoothScroll();
    injectWhatsApp();
    initThemeListener();

    var body = document.body;
    var clearAnimation = function (e) {
      if (!e || e.animationName === 'pageFadeIn') {
        body.classList.remove('page-fade-in');
        body.style.transform = '';
        body.removeEventListener('animationend', clearAnimation);
      }
    };
    body.addEventListener('animationend', clearAnimation);
    setTimeout(clearAnimation, 600);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

  window.AccountsupNav = {
    setActiveNav: setActiveNav,
    initCounters: initCounters
  };
})();
