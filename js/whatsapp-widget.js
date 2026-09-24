/* ============================================
   SOPHIA HOSPITALITY ACADEMY
   WhatsApp Chat Widget
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

    var waWidget = document.getElementById('waWidget');
    var waFloatBtn = document.getElementById('waFloatBtn');
    var waChatBody = document.getElementById('waChatBody');
    var waMinimize = document.getElementById('waMinimize');
    var waBadge = document.getElementById('waBadge');
    var waDateStamp = document.getElementById('waDateStamp');
    var waPhone = '255716777461';
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
        var msg = 'Hello Sophia Academy! My name is ' + name + '.\n\nI\'m interested in ' + category + ' \u2014 ' + detail + '.\n\nI\'d love to learn more.';
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
        await addBubble(getGreeting() + ' Welcome to Sophia Hospitality Academy!', 'bot', 0);

        var typing2 = await showTyping(800);
        await new Promise(function(r) { setTimeout(r, 1000); });
        removeTyping(typing2);
        await addBubble('How can we help you today?', 'bot', 0);

        var cat = await showQuickReplies([
            { emoji: '\uD83D\uDC69\u200D\uD83C\uDF93', label: 'I want to join a program', value: 'program' },
            { emoji: '\uD83E\uDD1D', label: 'I want to support the Academy', value: 'support' },
            { emoji: '\uD83C\uDFE2', label: 'I\'m interested in partnering', value: 'partner' },
            { emoji: '\u2753', label: 'I have a question', value: 'question' }
        ]);
        waSelectedCategory = cat.label;

        if (cat.value === 'program') {
            var typing3 = await showTyping(600);
            await new Promise(function(r) { setTimeout(r, 800); });
            removeTyping(typing3);
            await addBubble('Great choice! Which program interests you?', 'bot', 0);

            var prog = await showQuickReplies([
                { emoji: '\uD83C\uDF0D', label: 'Hospitality Foundations', value: 'Hospitality Foundations' },
                { emoji: '\uD83D\uDC1E', label: 'Guest Service & Experience', value: 'Guest Service & Experience' },
                { emoji: '\uD83D\uDCBC', label: 'Business & Entrepreneurship', value: 'Business & Entrepreneurship' }
            ]);
            waSelectedDetail = prog.value;

        } else if (cat.value === 'support') {
            var typing3 = await showTyping(600);
            await new Promise(function(r) { setTimeout(r, 800); });
            removeTyping(typing3);
            await addBubble('Thank you for wanting to make a difference! What type of support?', 'bot', 0);

            var sup = await showQuickReplies([
                { emoji: '\uD83D\uDCB0', label: 'Financial donation', value: 'Financial donation' },
                { emoji: '\uD83C\uDF92', label: 'Sponsor a student', value: 'Sponsor a student' },
                { emoji: '\uD83D\uDCDA', label: 'Donate supplies', value: 'Donate supplies' },
                { emoji: '\uD83D\uDCA1', label: 'Other ways to help', value: 'Other ways to help' }
            ]);
            waSelectedDetail = sup.value;

        } else if (cat.value === 'partner') {
            var typing3 = await showTyping(600);
            await new Promise(function(r) { setTimeout(r, 800); });
            removeTyping(typing3);
            await addBubble('Wonderful! What type of partnership?', 'bot', 0);

            var part = await showQuickReplies([
                { emoji: '\uD83C\uDFE8', label: 'Hotel / Lodge partnership', value: 'Hotel/Lodge partnership' },
                { emoji: '\uD83C\uDF93', label: 'Training & internship', value: 'Training & internship' },
                { emoji: '\uD83D\uDCCB', label: 'Corporate partnership', value: 'Corporate partnership' },
                { emoji: '\uD83E\uDD1D', label: 'Other partnership idea', value: 'Other partnership idea' }
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
        } else {
            var typing4 = await showTyping(600);
            await new Promise(function(r) { setTimeout(r, 600); });
            removeTyping(typing4);
            await addBubble('Please enter your name:', 'bot', 0);
        }

        waUserName = await showNameInput();

        var typing5 = await showTyping(600);
        await new Promise(function(r) { setTimeout(r, 800); });
        removeTyping(typing5);
        await addBubble('Opening WhatsApp now... Have a wonderful day!', 'bot', 0);

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
