/* ============================================
   SOPHIA HOSPITALITY ACADEMY
   Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

    // --- NAVBAR SCROLL EFFECT ---
    var navbar = document.getElementById('navbar');

    window.addEventListener('scroll', function() {
        var currentScroll = window.pageYOffset;
        if (currentScroll > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- MOBILE MENU ---
    var hamburger = document.getElementById('hamburger');
    var mobileMenu = document.getElementById('mobileMenu');

    function closeMenu() {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // --- SMOOTH SCROLL ---
    var allLinks = document.querySelectorAll('a[href^="#"]');
    for (var i = 0; i < allLinks.length; i++) {
        allLinks[i].addEventListener('click', function(e) {
            var href = this.getAttribute('href');
            if (href && href.length > 1) {
                e.preventDefault();
                var target = document.querySelector(href);
                if (target) {
                    var offset = 80;
                    var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    closeMenu();
                }
            }
        });
    }

    // --- REVEAL ON SCROLL ---
    var revealElements = document.querySelectorAll('.reveal');

    var revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    for (var j = 0; j < revealElements.length; j++) {
        revealObserver.observe(revealElements[j]);
    }

    // --- PATHWAY ANIMATION ---
    var pathwaySteps = document.querySelectorAll('.pathway-step');
    var pathwayConnectors = document.querySelectorAll('.pathway-connector');

    var pathwayObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                var step = entry.target;
                var stepNum = parseInt(step.getAttribute('data-step'), 10);

                setTimeout(function() {
                    step.classList.add('active');
                    if (stepNum > 1 && pathwayConnectors[stepNum - 2]) {
                        pathwayConnectors[stepNum - 2].classList.add('active');
                    }
                }, (stepNum - 1) * 200);
            }
        });
    }, {
        threshold: 0.3
    });

    for (var k = 0; k < pathwaySteps.length; k++) {
        pathwayObserver.observe(pathwaySteps[k]);
    }

    // --- FORM HANDLING ---
    var contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            var form = e.target;
            var btn = form.querySelector('button[type="submit"]');
            var originalText = btn.textContent;

            btn.textContent = 'Sending...';
            btn.disabled = true;

            setTimeout(function() {
                btn.textContent = 'Message Sent!';
                btn.style.background = '#4A5A35';
                btn.style.color = '#fff';

                setTimeout(function() {
                    form.reset();
                    btn.textContent = originalText;
                    btn.style.background = '';
                    btn.style.color = '';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

    // --- ACTIVE NAV LINK HIGHLIGHT ---
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', function() {
        var current = '';
        for (var m = 0; m < sections.length; m++) {
            var sectionTop = sections[m].offsetTop - 150;
            if (window.pageYOffset >= sectionTop) {
                current = sections[m].getAttribute('id');
            }
        }

        for (var n = 0; n < navLinks.length; n++) {
            navLinks[n].style.color = '';
            if (navLinks[n].getAttribute('href') === '#' + current) {
                navLinks[n].style.color = '#C9A96E';
            }
        }
    });

    // --- PARALLAX EFFECT ON HERO ---
    var hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            var scrolled = window.pageYOffset;
            if (scrolled < window.innerHeight) {
                hero.style.backgroundPositionY = (scrolled * 0.4) + 'px';
            }
        });
    }

    // --- IMPACT QUESTIONS ANIMATION ---
    var impactQuestions = document.querySelectorAll('.impact-q');
    var impactObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry, index) {
            if (entry.isIntersecting) {
                setTimeout(function() {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150);
            }
        });
    }, { threshold: 0.2 });

    for (var p = 0; p < impactQuestions.length; p++) {
        impactQuestions[p].style.opacity = '0';
        impactQuestions[p].style.transform = 'translateY(20px)';
        impactQuestions[p].style.transition = 'all 0.6s ease';
        impactObserver.observe(impactQuestions[p]);
    }

});
