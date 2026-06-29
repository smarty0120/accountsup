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
    btn.innerHTML = '<svg width="28" height="28" viewBox="0 0 24 24" fill="#fff"><path d="M19.001 4.908A9.817 9.817 0 0 0 11.992 2C6.534 2 2.085 6.448 2.08 11.91c0 1.748.458 3.45 1.321 4.956L2 23l6.282-1.648a9.816 9.816 0 0 0 4.708 1.201h.004c5.454 0 9.907-4.448 9.912-9.91a9.825 9.825 0 0 0-2.905-7.008zM11.992 20.15a8.163 8.163 0 0 1-4.162-1.144l-.298-.177-3.73.978.995-3.637-.194-.309a8.145 8.145 0 0 1-1.248-4.215c.004-4.5 3.666-8.162 8.171-8.162a8.113 8.113 0 0 1 5.776 2.395 8.115 8.115 0 0 1 2.392 5.777c-.004 4.505-3.667 8.169-8.172 8.169zm4.484-6.132c-.246-.123-1.455-.718-1.68-.8a.312.312 0 0 0-.452.12c-.227.3-.603.753-.738.905-.136.15-.27.165-.517.042A7.39 7.39 0 0 1 9.4 12.115c-.914-1.583-.98-1.543-1.12-1.782-.136-.24-.015-.368.107-.49.11-.11.245-.286.37-.43.123-.142.164-.24.246-.4.082-.165.04-.308-.02-.43-.062-.124-.549-1.323-.752-1.812-.198-.475-.4-.41-.548-.418-.14-.007-.302-.008-.462-.008a.887.887 0 0 0-.642.3c-.22.24-.84.82-.84 2.002 0 1.183.86 2.325.98 2.485.12.16 1.69 2.58 4.098 3.62.573.247 1.02.394 1.368.504.577.182 1.102.156 1.517.094.462-.07 1.455-.595 1.66-1.171.205-.577.205-1.073.143-1.172-.06-.1-.227-.162-.472-.284z"/></svg>';
    
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
    var logoSrc = base + 'assets/logo.png';
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
