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

    // --- WHATSAPP CHAT WIDGET ---
    var waWidget = document.getElementById('waWidget');
    var waFloatBtn = document.getElementById('waFloatBtn');
    var waChatWindow = document.getElementById('waChatWindow');
    var waChatBody = document.getElementById('waChatBody');
    var waMinimize = document.getElementById('waMinimize');
    var waBadge = document.getElementById('waBadge');
    var waDateStamp = document.getElementById('waDateStamp');
    var waPhone = '255759541722';
    var waUserName = '';
    var waSelectedCategory = '';
    var waSelectedDetail = '';
    var chatStarted = false;

    var greetings = {
        morning: 'Good morning!',
        afternoon: 'Good afternoon!',
        evening: 'Good evening!'
    };

    function getGreeting() {
        var hour = new Date().getHours();
        if (hour < 12) return greetings.morning;
        if (hour < 17) return greetings.afternoon;
        return greetings.evening;
    }

    function showDateStamp() {
        var now = new Date();
        var options = { weekday: 'long', month: 'short', day: 'numeric' };
        waDateStamp.textContent = now.toLocaleDateString('en-US', options);
        waDateStamp.classList.add('visible');
    }

    function addBubble(text, type, delay) {
        return new Promise(function(resolve) {
            setTimeout(function() {
                var bubble = document.createElement('div');
                bubble.className = 'wa-bubble ' + type;
                bubble.textContent = text;
                waChatBody.appendChild(bubble);
                waChatBody.scrollTop = waChatBody.scrollHeight;
                resolve();
            }, delay);
        });
    }

    function showTyping(delay) {
        return new Promise(function(resolve) {
            setTimeout(function() {
                var typing = document.createElement('div');
                typing.className = 'wa-typing';
                typing.innerHTML = '<span></span><span></span><span></span>';
                waChatBody.appendChild(typing);
                waChatBody.scrollTop = waChatBody.scrollHeight;
                resolve(typing);
            }, delay);
        });
    }

    function removeTyping(el) {
        if (el && el.parentNode) el.parentNode.removeChild(el);
    }

    function showQuickReplies(options) {
        return new Promise(function(resolve) {
            var container = document.createElement('div');
            container.className = 'wa-quick-replies';
            options.forEach(function(opt) {
                var btn = document.createElement('button');
                btn.className = 'wa-quick-btn';
                btn.textContent = opt.emoji + ' ' + opt.label;
                btn.addEventListener('click', function() {
                    addBubble(opt.label, 'user', 0);
                    container.remove();
                    resolve(opt);
                });
                container.appendChild(btn);
            });
            waChatBody.appendChild(container);
            waChatBody.scrollTop = waChatBody.scrollHeight;
        });
    }

    function showNameInput() {
        return new Promise(function(resolve) {
            var wrap = document.createElement('div');
            wrap.className = 'wa-name-input-wrap';

            var input = document.createElement('input');
            input.type = 'text';
            input.className = 'wa-name-input';
            input.placeholder = 'Type your name...';
            input.setAttribute('autocomplete', 'name');

            var sendBtn = document.createElement('button');
            sendBtn.className = 'wa-name-send';
            sendBtn.innerHTML = '<i class="fas fa-paper-plane"></i>';

            function submitName() {
                var name = input.value.trim();
                if (name) {
                    addBubble(name, 'user', 0);
                    wrap.remove();
                    resolve(name);
                }
            }

            sendBtn.addEventListener('click', submitName);
            input.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') submitName();
            });

            wrap.appendChild(input);
            wrap.appendChild(sendBtn);
            waChatBody.appendChild(wrap);
            waChatBody.scrollTop = waChatBody.scrollHeight;
            setTimeout(function() { input.focus(); }, 400);
        });
    }

    function openWhatsApp(name, category, detail) {
        var msg = 'Hello Sophia Academy! My name is ' + name + '.\n\nI\'m interested in ' + category + ' — ' + detail + '.\n\nI\'d love to learn more.';
        var url = 'https://wa.me/' + waPhone + '?text=' + encodeURIComponent(msg);
        window.open(url, '_blank');
    }

    async function startChat() {
        if (chatStarted) return;
        chatStarted = true;

        showDateStamp();

        var typing1 = await showTyping(600);
        await new Promise(function(r) { setTimeout(r, 1200); });
        removeTyping(typing1);
        await addBubble(getGreeting() + ' Welcome to Sophia Hospitality Academy! 🌍', 'bot', 0);

        var typing2 = await showTyping(800);
        await new Promise(function(r) { setTimeout(r, 1000); });
        removeTyping(typing2);
        await addBubble('How can we help you today?', 'bot', 0);

        var cat = await showQuickReplies([
            { emoji: '👩\u200d🎓', label: 'I want to join a program', value: 'program' },
            { emoji: '🤝', label: 'I want to support the Academy', value: 'support' },
            { emoji: '🏢', label: 'I\'m interested in partnering', value: 'partner' },
            { emoji: '❓', label: 'I have a question', value: 'question' }
        ]);
        waSelectedCategory = cat.label;

        if (cat.value === 'program') {
            var typing3 = await showTyping(600);
            await new Promise(function(r) { setTimeout(r, 800); });
            removeTyping(typing3);
            await addBubble('Great choice! Which program interests you?', 'bot', 0);

            var prog = await showQuickReplies([
                { emoji: '🌍', label: 'Hospitality Foundations', value: 'Hospitality Foundations' },
                { emoji: '🛎️', label: 'Guest Service & Experience', value: 'Guest Service & Experience' },
                { emoji: '💼', label: 'Business & Entrepreneurship', value: 'Business & Entrepreneurship' }
            ]);
            waSelectedDetail = prog.value;

        } else if (cat.value === 'support') {
            var typing3 = await showTyping(600);
            await new Promise(function(r) { setTimeout(r, 800); });
            removeTyping(typing3);
            await addBubble('Thank you for wanting to make a difference! What type of support?', 'bot', 0);

            var sup = await showQuickReplies([
                { emoji: '💰', label: 'Financial donation', value: 'Financial donation' },
                { emoji: '🎒', label: 'Sponsor a student', value: 'Sponsor a student' },
                { emoji: '📚', label: 'Donate supplies', value: 'Donate supplies' },
                { emoji: '💡', label: 'Other ways to help', value: 'Other ways to help' }
            ]);
            waSelectedDetail = sup.value;

        } else if (cat.value === 'partner') {
            var typing3 = await showTyping(600);
            await new Promise(function(r) { setTimeout(r, 800); });
            removeTyping(typing3);
            await addBubble('Wonderful! What type of partnership?', 'bot', 0);

            var part = await showQuickReplies([
                { emoji: '🏨', label: 'Hotel / Lodge partnership', value: 'Hotel/Lodge partnership' },
                { emoji: '🎓', label: 'Training & internship', value: 'Training & internship' },
                { emoji: '📋', label: 'Corporate partnership', value: 'Corporate partnership' },
                { emoji: '🤝', label: 'Other partnership idea', value: 'Other partnership idea' }
            ]);
            waSelectedDetail = part.value;

        } else {
            var typing3 = await showTyping(600);
            await new Promise(function(r) { setTimeout(r, 800); });
            removeTyping(typing3);
            await addBubble('We\'re here to help! Please share your question and we\'ll get back to you shortly.', 'bot', 0);
            waSelectedDetail = 'General inquiry';
        }

        if (cat.value !== 'question') {
            var typing4 = await showTyping(600);
            await new Promise(function(r) { setTimeout(r, 600); });
            removeTyping(typing4);
            await addBubble('Almost there! Please enter your name so we can personalize your message:', 'bot', 0);

            waUserName = await showNameInput();
        } else {
            var typing4 = await showTyping(600);
            await new Promise(function(r) { setTimeout(r, 600); });
            removeTyping(typing4);
            await addBubble('Please enter your name:', 'bot', 0);

            waUserName = await showNameInput();
        }

        var typing5 = await showTyping(600);
        await new Promise(function(r) { setTimeout(r, 800); });
        removeTyping(typing5);
        await addBubble('Opening WhatsApp now... Have a wonderful day! 🌟', 'bot', 0);

        setTimeout(function() {
            openWhatsApp(waUserName, waSelectedCategory, waSelectedDetail);
        }, 1000);
    }

    waFloatBtn.addEventListener('click', function() {
        waWidget.classList.toggle('open');
        if (waWidget.classList.contains('open')) {
            waBadge.style.opacity = '0';
            if (!chatStarted) {
                setTimeout(function() { startChat(); }, 400);
            }
        }
    });

    waMinimize.addEventListener('click', function() {
        waWidget.classList.remove('open');
    });

});
