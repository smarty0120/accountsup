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
      link.addEventListener('click', function () {
        btn.classList.remove('open');
        menu.classList.remove('open');
      });
    });
  }

  function initStickyNav() {
    var nav = document.getElementById('main-nav');
    if (!nav) return;
    window.addEventListener('scroll', function () {
      if (window.scrollY > 30) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  function initBackToTop() {
    var btn = document.getElementById('back-to-top');
    if (!btn) return;
    window.addEventListener('scroll', function () {
      if (window.scrollY > 300) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }, { passive: true });
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  function initScrollReveal() {
    var els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
    els.forEach(function (el) { observer.observe(el); });
  }

  function initCounters() {
    var counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { observer.observe(el); });
  }

  function animateCounter(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var suffix = el.getAttribute('data-suffix') || '';
    var prefix = el.getAttribute('data-prefix') || '';
    var decimals = el.getAttribute('data-decimals') ? parseInt(el.getAttribute('data-decimals')) : 0;
    var duration = 1800;
    var start = null;
    function step(timestamp) {
      if (!start) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = eased * target;
      el.textContent = prefix + current.toFixed(decimals) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var href = this.getAttribute('href');
        if (href === '#') return;
        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          var offset = target.getBoundingClientRect().top + window.scrollY - 85;
          window.scrollTo({ top: offset, behavior: 'smooth' });
        }
      });
    });
  }

  function injectWhatsApp() {
    var wa = document.createElement('a');
    wa.id = 'whatsapp-btn';
    wa.href = 'https://wa.me/18005551234?text=Hello%20Accountsup.com%2C%20I%20would%20like%20to%20enquire%20about%20your%20Financial%20Operations%20services.';
    wa.target = '_blank';
    wa.rel = 'noopener noreferrer';
    wa.setAttribute('aria-label', 'Chat with us on WhatsApp');
    wa.innerHTML = '<svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';

    var tooltip = document.createElement('div');
    tooltip.id = 'whatsapp-tooltip';
    tooltip.textContent = 'Chat with us on WhatsApp';

    document.body.appendChild(wa);
    document.body.appendChild(tooltip);

    wa.addEventListener('mouseenter', function () { tooltip.classList.add('show'); });
    wa.addEventListener('mouseleave', function () { tooltip.classList.remove('show'); });
  }

  function injectThemeToggle() {
    var THEME_KEY = 'accountsup_theme';

    // Build the pill toggle button
    var btn = document.createElement('button');
    btn.id = 'theme-toggle';
    btn.setAttribute('aria-label', 'Toggle light/dark theme');
    btn.setAttribute('data-tooltip', 'Switch to Light Mode');
    btn.innerHTML = '<div id="theme-toggle-knob"><svg class="icon-moon" width="12" height="12" viewBox="0 0 24 24" fill="#040d1a"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg><svg class="icon-sun" width="12" height="12" viewBox="0 0 24 24" fill="white"><circle cx="12" cy="12" r="5"/><path stroke="white" stroke-width="2" stroke-linecap="round" d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg></div>';

    // Inject into desktop nav-actions
    var navActions = document.querySelector('.nav-actions');
    if (navActions) {
      navActions.insertBefore(btn, navActions.firstChild);
    }

    // Inject into mobile menu
    var mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
      var mobileRow = document.createElement('div');
      mobileRow.id = 'mobile-theme-row';

      var mobileLabel = document.createElement('span');
      mobileLabel.id = 'mobile-theme-label';
      mobileLabel.textContent = 'Theme';

      var mobileBtn = document.createElement('button');
      mobileBtn.id = 'theme-toggle-mobile';
      mobileBtn.setAttribute('aria-label', 'Toggle theme');
      mobileBtn.style.cssText = 'width:48px;height:26px;background:rgba(212,175,55,0.12);border:1.5px solid rgba(212,175,55,0.3);border-radius:13px;cursor:pointer;display:flex;align-items:center;padding:2px;transition:background .35s ease,border-color .35s ease;';
      mobileBtn.innerHTML = '<div style="width:20px;height:20px;border-radius:50%;background:linear-gradient(135deg,var(--gold-dark),var(--gold));display:flex;align-items:center;justify-content:center;transition:transform .35s cubic-bezier(.34,1.56,.64,1);box-shadow:0 2px 8px rgba(212,175,55,.5);"><svg width="11" height="11" viewBox="0 0 24 24" fill="#040d1a"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg></div>';

      mobileRow.appendChild(mobileLabel);
      mobileRow.appendChild(mobileBtn);
      mobileMenu.insertBefore(mobileRow, mobileMenu.firstChild);
    }

    function applyTheme(theme) {
      var isLight = theme === 'light';
      document.body.classList.toggle('light-theme', isLight);
      if (btn) {
        btn.setAttribute('data-tooltip', isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode');
      }
      // Sync mobile button knob
      var mKnobDiv = document.querySelector('#theme-toggle-mobile div');
      if (mKnobDiv) {
        mKnobDiv.style.transform = isLight ? 'translateX(22px)' : '';
        mKnobDiv.style.background = isLight ? 'linear-gradient(135deg,#0A192F,#163769)' : 'linear-gradient(135deg,var(--gold-dark),var(--gold))';
        mKnobDiv.innerHTML = isLight
          ? '<svg width="11" height="11" viewBox="0 0 24 24" fill="white"><circle cx="12" cy="12" r="5"/><path stroke="white" stroke-width="2" stroke-linecap="round" d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
          : '<svg width="11" height="11" viewBox="0 0 24 24" fill="#040d1a"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>';
      }
      if (mobileBtn) {
        mobileBtn.style.background = isLight ? 'rgba(10,25,47,0.08)' : 'rgba(212,175,55,0.12)';
        mobileBtn.style.borderColor = isLight ? 'rgba(10,25,47,0.22)' : 'rgba(212,175,55,0.3)';
      }
    }

    var saved = localStorage.getItem(THEME_KEY) || 'dark';
    applyTheme(saved);

    function toggle() {
      var current = document.body.classList.contains('light-theme') ? 'light' : 'dark';
      var next = current === 'light' ? 'dark' : 'light';
      localStorage.setItem(THEME_KEY, next);
      applyTheme(next);
    }

    if (btn) {
      btn.addEventListener('click', function () {
        toggle();
        this.style.transform = 'scale(0.9)';
        setTimeout(function () { btn.style.transform = ''; }, 160);
      });
    }
    if (mobileMenu) {
      var mobileBtn2 = document.getElementById('theme-toggle-mobile');
      if (mobileBtn2) mobileBtn2.addEventListener('click', toggle);
    }
  }


  function injectSVGFilter() {
    if (document.getElementById('remove-white-filter-svg')) return;
    var svgDiv = document.createElement('div');
    svgDiv.id = 'remove-white-filter-svg';
    svgDiv.style.cssText = 'position:absolute; width:0; height:0; overflow:hidden; pointer-events:none;';
    svgDiv.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg">' +
                        '  <filter id="remove-white">' +
                        '    <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  -3 -3 -3 9 -0.1" />' +
                        '  </filter>' +
                        '</svg>';
    document.body.appendChild(svgDiv);
  }

  function injectLogo() {
    injectSVGFilter();
    var logos = document.querySelectorAll('.nav-logo');
    logos.forEach(function(el) {
      el.classList.add('nav-logo-badge');
      
      var img = document.createElement('img');
      img.className = 'logo-img logo-sticker';
      img.alt = 'Accountsup Logo';
      img.src = 'img/logo.png';
      
      // Fallback in case local img/logo.png is not found on their PC
      img.onerror = function() {
        this.src = 'file:///C:/Users/asfin/.gemini/antigravity-ide/brain/3ab19b97-4c9c-41ab-9115-2c0ed48f38bc/media__1781443498642.png';
        this.onerror = null; // Prevent infinite loop
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

    // Clean up page-fade-in class after animation to fix the position:fixed bug caused by body transforms
    var body = document.body;
    var clearAnimation = function (e) {
      if (!e || e.animationName === 'pageFadeIn') {
        body.classList.remove('page-fade-in');
        body.style.transform = '';
        body.removeEventListener('animationend', clearAnimation);
      }
    };
    body.addEventListener('animationend', clearAnimation);
    // Safety fallback (animation duration is 0.5s)
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
