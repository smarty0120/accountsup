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
    btn.innerHTML = '<svg width="28" height="28" viewBox="0 0 24 24" fill="#fff"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.725 1.45 5.489 0 9.952-4.43 9.955-9.885.002-2.643-1.019-5.127-2.877-6.986a9.82 9.82 0 00-6.992-2.879C6.012 1.854 1.55 6.284 1.547 11.739c-.002 1.714.453 3.39 1.32 4.873l-.99 3.613 3.77-.971zM17.487 14.39c-.3-.15-1.774-.875-2.049-.974-.276-.1-.476-.15-.676.15-.2.3-.775.974-.95 1.174-.175.2-.35.226-.65.076-1.05-.525-1.807-1.026-2.52-2.253-.188-.328-.378-.656-.546-.98-.24-.46-.02-.7.2-.92l.6-.6c.07-.07.1-.15.15-.25.05-.1.02-.2-.01-.3-.03-.1-.3-.725-.412-1.001-.11-.275-.23-.238-.312-.242-.08-.004-.175-.004-.275-.004-.1 0-.263.037-.4.187-.137.15-.525.513-.525 1.252 0 .739.538 1.45.613 1.55.075.1 1.058 1.616 2.562 2.267.36.156.64.25.86.32.36.115.69.1.95.064.29-.041.875-.359 1.001-.707.125-.348.125-.648.088-.707-.037-.059-.15-.1-.45-.25z"/></svg>';
    
    var tooltip = document.createElement('div');
    tooltip.id = 'whatsapp-tooltip';
    tooltip.textContent = 'Need help? Chat with us!';
    
    document.body.appendChild(btn);
    document.body.appendChild(tooltip);
    
    setTimeout(function() {
      tooltip.classList.add('show');
    }, 5000);
  }

  function injectThemeToggle() {
    var navInner = document.querySelector('.nav-inner');
    if (!navInner) return;
    
    var navActions = navInner.querySelector('.nav-actions');
    if (!navActions) return;
    
    var toggleGroup = document.createElement('div');
    toggleGroup.style.cssText = 'display:flex;align-items:center;gap:10px;margin-left:16px;';
    
    var label = document.createElement('span');
    label.id = 'theme-label';
    label.style.cssText = 'font-size:12px;color:var(--slate-soft);font-weight:600;text-transform:uppercase;letter-spacing:0.05em;';
    label.textContent = 'Dark';
    
    var btn = document.createElement('button');
    btn.id = 'theme-toggle';
    btn.setAttribute('aria-label', 'Toggle theme');
    btn.innerHTML = '<div id="theme-toggle-knob"></div>';
    
    toggleGroup.appendChild(label);
    toggleGroup.appendChild(btn);
    navActions.parentNode.insertBefore(toggleGroup, navActions.nextSibling);
    
    var theme = localStorage.getItem('accountsup_theme') || 'dark';
    if (theme === 'light') {
      document.body.classList.add('light-theme');
      label.textContent = 'Light';
    }
    
    btn.addEventListener('click', function() {
      var isLight = document.body.classList.toggle('light-theme');
      if (isLight) {
        localStorage.setItem('accountsup_theme', 'light');
        label.textContent = 'Light';
      } else {
        localStorage.setItem('accountsup_theme', 'dark');
        label.textContent = 'Dark';
      }
    });
  }

  function injectLogo() {
    var logos = document.querySelectorAll('.nav-logo');
    logos.forEach(function(el) {
      el.classList.add('nav-logo-badge');
      
      var img = document.createElement('img');
      img.className = 'logo-img';
      img.alt = 'Accountsup Logo';
      img.src = 'assets/logo.png';
      
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
    injectThemeToggle();

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
