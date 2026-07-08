(function(){var _w=window,_d=document,_dt=false;_d.addEventListener('contextmenu',function(e){e.preventDefault();return false;});_d.addEventListener('keydown',function(e){if(e.key==='F12'||(e.ctrlKey&&e.shiftKey&&(e.key==='I'||e.key==='C'||e.key==='J'))||(e.ctrlKey&&(e.key==='U'||e.key==='S'))){e.preventDefault();e.stopPropagation();return false;}},true);function _showOv(){if(document.getElementById('_prot_ov'))return;var o=document.createElement('div');o.id='_prot_ov';o.style.cssText='position:fixed;top:0;left:0;width:100%;height:100%;background:#0b0f19;z-index:2147483647;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:monospace;color:#f8fafc;';o.innerHTML='<div style="font-size:3.5rem;margin-bottom:1rem">&#9940;</div><h1 style="font-size:1.6rem;margin-bottom:.5rem">Access Restricted</h1><p style="color:#94a3b8;font-size:.9rem">Developer tools are not permitted on this page.</p>';document.body?document.body.appendChild(o):document.addEventListener('DOMContentLoaded',function(){document.body.appendChild(o);});}function _hideOv(){var o=document.getElementById('_prot_ov');if(o)o.remove();}function _dbgCheck(){var t=new Date();(function(){}).constructor('debugger')();if(new Date()-t>80&&!_dt){_dt=true;_showOv();}}setInterval(_dbgCheck,1500);_w.addEventListener('resize',function(){var open=(_w.outerWidth-_w.innerWidth>160||_w.outerHeight-_w.innerHeight>160);if(open&&!_dt){_dt=true;_showOv();}else if(!open&&_dt){_dt=false;_hideOv();}});})();

document.addEventListener('DOMContentLoaded', function () {

    /* ── Sticky Navbar & Scroll Discover ── */
    var a = document.getElementById('navbar');
    var b = document.querySelector('.scroll-discover');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            if (a) a.classList.add('scrolled');
            if (b) b.classList.add('fade-out');
        } else {
            if (a) a.classList.remove('scrolled');
            if (b) b.classList.remove('fade-out');
        }
    });

    /* ── Active Nav Section Highlight ── */
    var navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    var sections = document.querySelectorAll('header[id], section[id]');

    var activeObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            var id = entry.target.getAttribute('id');
            navLinks.forEach(function (link) {
                link.classList.toggle('active-section', link.getAttribute('href') === '#' + id);
            });
        });
    }, { threshold: 0.35 });

    sections.forEach(function (sec) { activeObserver.observe(sec); });

    /* ── Timeline Connector Draw on Scroll ── */
    var timelineEl = document.querySelector('.timeline');
    if (timelineEl) {
        var tlObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('draw-line');
                    tlObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        tlObserver.observe(timelineEl);
    }

    /* ── Page Transition Shutter and Navigation Handler ── */
    var pageTransition = document.getElementById('page-transition');
    var adminLink = document.querySelector('.footer-admin-link');

    /* Slide shutter out on page load & cache restore */
    function initShutter() {
        var pt = document.getElementById('page-transition');
        if (pt) {
            pt.classList.remove('active');
            pt.classList.add('exit');
        }
    }

    setTimeout(initShutter, 80);

    window.addEventListener('pageshow', function (e) {
        if (e.persisted) {
            initShutter();
            var preloader = document.getElementById('preloader');
            if (preloader) {
                preloader.classList.add('loaded');
            }
            document.body.classList.add('preloader-done');
        }
    });

    if (pageTransition && adminLink) {
        adminLink.addEventListener('click', function (e) {
            e.preventDefault();
            pageTransition.classList.remove('exit');
            pageTransition.classList.add('active');
            setTimeout(function () {
                window.location.href = 'login.html';
            }, 600);
        });
    }



    /* ── Premium Mobile Navbar Toggle (custom, no Bootstrap JS) ── */
    var toggler  = document.getElementById('navToggler');
    var collapse = document.getElementById('navbarNav');
    var menuOpen = false;

    function openMenu() {
        menuOpen = true;
        collapse.classList.remove('is-closing');
        collapse.classList.add('show');
        toggler.classList.add('is-open');
        if (a) a.classList.add('menu-open');
    }

    function closeMenu() {
        menuOpen = false;
        collapse.classList.add('is-closing');
        toggler.classList.remove('is-open');
        if (a) a.classList.remove('menu-open');
        /* Wait for CSS transition to finish, then remove .show */
        setTimeout(function () {
            collapse.classList.remove('show');
            collapse.classList.remove('is-closing');
        }, 420); /* matches max-height transition duration */
    }

    if (toggler && collapse) {
        toggler.addEventListener('click', function (e) {
            e.stopPropagation();
            menuOpen ? closeMenu() : openMenu();
        });

        /* Close on nav-link click (mobile) */
        collapse.querySelectorAll('.nav-link').forEach(function (link) {
            link.addEventListener('click', function () {
                if (window.innerWidth < 992 && menuOpen) closeMenu();
            });
        });

        /* Close on outside click */
        document.addEventListener('click', function (e) {
            if (menuOpen && a && !a.contains(e.target)) closeMenu();
        });

        /* Close on window resize to desktop */
        window.addEventListener('resize', function () {
            if (window.innerWidth >= 992 && menuOpen) {
                menuOpen = false;
                collapse.classList.remove('show', 'is-closing');
                toggler.classList.remove('is-open');
                if (a) a.classList.remove('menu-open');
            }
        });
    }

    /* ── Settings Dropdown — Fade In/Out ── */
    var d = document.querySelector('.settings-toggle-btn');
    var e = document.querySelector('.settings-dropdown');

    function openSettings() { e.classList.add('dropdown-open'); d.classList.add('active'); d.setAttribute('aria-expanded', 'true'); }
    function closeSettings() { e.classList.remove('dropdown-open'); d.classList.remove('active'); d.setAttribute('aria-expanded', 'false'); }

    if (d && e) {
        d.addEventListener('click', function (ev) {
            ev.preventDefault(); ev.stopPropagation();
            e.classList.contains('dropdown-open') ? closeSettings() : openSettings();
        });
        document.addEventListener('click', function (ev) {
            if (!d.contains(ev.target) && !e.contains(ev.target)) closeSettings();
        });
        e.addEventListener('click', function (ev) { ev.stopPropagation(); });
    }

    /* ── Theme Switcher ── */
    var i = document.getElementById('theme-toggle');
    var j = localStorage.getItem('theme') || 'light';
    var statusSpan = document.getElementById('theme-status');

    function updateThemeStatus(theme) {
        if (statusSpan) {
            statusSpan.textContent = theme === 'dark' ? 'Dark' : 'Light';
        }
    }

    if (j === 'dark') {
        document.body.classList.add('dark-theme');
        if (i) i.checked = true;
    }
    updateThemeStatus(j);

    if (i) {
        i.addEventListener('change', function () {
            if (i.checked) {
                document.body.classList.add('dark-theme');
                localStorage.setItem('theme', 'dark');
                updateThemeStatus('dark');
            }
            else {
                document.body.classList.remove('dark-theme');
                localStorage.setItem('theme', 'light');
                updateThemeStatus('light');
            }
        });
    }

    /* ══════════════════════════════════════════
       AWARD-LEVEL SCROLL & INTERACTION ENGINE
       ══════════════════════════════════════════ */

    /* ── Magnetic Custom Cursor ── */
    var cursorDot  = document.getElementById('cursor-dot');
    var cursorRing = document.getElementById('cursor-ring');
    var ringX = 0, ringY = 0, dotX = 0, dotY = 0;
    var mouseX = 0, mouseY = 0;

    if (cursorDot && cursorRing) {
        document.addEventListener('mousemove', function (e) {
            mouseX = e.clientX; mouseY = e.clientY;
            cursorDot.style.left  = mouseX + 'px';
            cursorDot.style.top   = mouseY + 'px';
        });

        (function cursorRaf() {
            ringX += (mouseX - ringX) * 0.13;
            ringY += (mouseY - ringY) * 0.13;
            cursorRing.style.left = ringX + 'px';
            cursorRing.style.top  = ringY + 'px';
            requestAnimationFrame(cursorRaf);
        }());

        document.querySelectorAll('a, button, .modern-card, .btn').forEach(function (el) {
            el.addEventListener('mouseenter', function () { cursorRing.classList.add('hovering'); });
            el.addEventListener('mouseleave', function () { cursorRing.classList.remove('hovering'); });
        });
    }

    /* ── Scroll Progress Bar ── */
    var progressBar = document.getElementById('scroll-progress');
    window.addEventListener('scroll', function () {
        if (!progressBar) return;
        var scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight);
        progressBar.style.width = (scrolled * 100) + '%';
    }, { passive: true });

    /* ── Text Splitter — letter-by-letter fly-in ── */
    document.querySelectorAll('[data-split]').forEach(function (el) {
        var text = el.textContent;
        el.textContent = '';
        text.split('').forEach(function (char, i) {
            var span = document.createElement('span');
            span.className = 'char';
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.transitionDelay = (i * 0.035) + 's';
            el.appendChild(span);
        });
    });

    /* ── Unified Scroll Observer ── */
    var scrollObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            var el = entry.target;

            /* standard reveal */
            el.classList.add('active');

            /* fire split-text if this element or its parent has [data-split] */
            var splitEl = el.querySelector('[data-split]') || (el.hasAttribute('data-split') ? el : null);
            if (splitEl) splitEl.classList.add('chars-visible');

            /* stagger direct .reveal-child elements */
            var delayMult = window.innerWidth < 768 ? 0.03 : 0.07;
            el.querySelectorAll('.reveal-child').forEach(function (child, i) {
                child.style.transitionDelay = (i * delayMult) + 's';
                child.classList.add('active');
            });

            scrollObserver.unobserve(el);
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

    document.querySelectorAll('.reveal').forEach(function (el) { scrollObserver.observe(el); });

    /* ── Directional reveals (left / right) ── */
    var dirObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('active');
            dirObserver.unobserve(entry.target);
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });

    document.querySelectorAll('.reveal-left, .reveal-right').forEach(function (el) {
        dirObserver.observe(el);
    });

    /* ── Section title text split trigger ── */
    var splitObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('chars-visible');
            splitObserver.unobserve(entry.target);
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('[data-split]').forEach(function (el) { splitObserver.observe(el); });

    /* ── Hero Parallax on scroll ── */
    var heroEl = document.querySelector('.hero-section .container');
    var isTouchDevice = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
    window.addEventListener('scroll', function () {
        if (!heroEl || isTouchDevice || window.innerWidth < 768) return;
        var sy = window.scrollY;
        if (sy < window.innerHeight) {
            /* preserve the CSS left-shift across breakpoints */
            var shiftX = window.innerWidth >= 1200 ? -80 : window.innerWidth >= 768 ? -45 : 0;
            heroEl.style.transform = 'translateX(' + shiftX + 'px) translateY(' + (sy * 0.22) + 'px)';
            heroEl.style.opacity   = 1 - (sy / window.innerHeight) * 0.6;
        }
    }, { passive: true });

    /* Reset scroll animations when scrolled all the way to the top */
    window.addEventListener('scroll', function () {
        if (window.scrollY < 10) {
            if (heroEl) {
                heroEl.style.opacity = 1;
            }
            document.querySelectorAll('.reveal.active').forEach(function (el) {
                el.classList.remove('active');
                el.querySelectorAll('.reveal-child').forEach(function (child) {
                    child.classList.remove('active');
                });
                scrollObserver.observe(el);
            });
            document.querySelectorAll('.reveal-left.active, .reveal-right.active').forEach(function (el) {
                el.classList.remove('active');
                dirObserver.observe(el);
            });
            document.querySelectorAll('[data-split].chars-visible').forEach(function (el) {
                el.classList.remove('chars-visible');
                splitObserver.observe(el);
            });
        }
    }, { passive: true });

    /* ── Animated counters ── */
    function animateCounter(el, target, suffix) {
        var start = 0;
        var duration = 1400;
        var startTime = null;
        function step(ts) {
            if (!startTime) startTime = ts;
            var progress = Math.min((ts - startTime) / duration, 1);
            var ease = 1 - Math.pow(1 - progress, 3);
            var isFloat = target % 1 !== 0;
            el.textContent = (isFloat
                ? (ease * target).toFixed(1)
                : Math.round(ease * target)) + suffix;
            if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    var counterObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            var el = entry.target;
            var val = el.dataset.count;
            var suffix = el.dataset.suffix || '';
            animateCounter(el, parseFloat(val), suffix);
            counterObserver.unobserve(el);
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('[data-count]').forEach(function (el) { counterObserver.observe(el); });



    /* ── Premium Momentum Scroll Engine ──
       Pure native scroll + velocity-tracked momentum overlay.
       No artificial lag — snappy on input, smooth on deceleration. ── */
    (function () {
        var scrollY      = window.scrollY;
        var targetY      = window.scrollY;
        var friction     = 0.075; /* lower = more momentum, higher = snappier */
        var rafId        = null;

        function isScrollDisabled() {
            var isTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
            var isSmallScreen = window.innerWidth < 1024;
            return isTouch && isSmallScreen;
        }

        /* Synchronize targetY with native scrolls (scrollbar drag, arrow keys) */
        window.addEventListener('scroll', function () {
            if (isScrollDisabled()) return;
            if (!rafId) {
                targetY = window.scrollY;
                scrollY = window.scrollY;
            }
        }, { passive: true });

        /* Prevent default wheel on desktop, drive targetY manually */
        window.addEventListener('wheel', function (e) {
            if (isScrollDisabled()) return;
            e.preventDefault();
            targetY += e.deltaY * 0.9;
            targetY  = Math.max(0, Math.min(targetY, document.body.scrollHeight - window.innerHeight));
            if (!rafId) tick();
        }, { passive: false });

        /* Smooth Anchor Scroll Integrated with Momentum Engine */
        document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
            anchor.addEventListener('click', function (e) {
                if (isScrollDisabled()) return;
                var targetId = this.getAttribute('href');
                if (targetId === '#') return;
                var targetEl = document.querySelector(targetId);
                if (!targetEl) return;
                e.preventDefault();
                
                var targetPos = targetEl.getBoundingClientRect().top + window.scrollY;
                var navHeight = window.innerWidth >= 992 ? 80 : 70; // adjust for responsive navbar height
                targetY = Math.max(0, Math.min(targetPos - navHeight, document.body.scrollHeight - window.innerHeight));
                
                if (!rafId) tick();
            });
        });

        function lerp(a, b, t) { return a + (b - a) * t; }

        function tick() {
            if (isScrollDisabled()) {
                rafId = null;
                return;
            }
            scrollY = lerp(scrollY, targetY, friction * 8);

            var diff = Math.abs(targetY - scrollY);
            if (diff < 0.3) {
                scrollY = targetY;
                window.scrollTo(0, scrollY);
                rafId = null;
                return;
            }

            window.scrollTo(0, scrollY);
            rafId = requestAnimationFrame(tick);
        }
    }());

    /* ── 3D Card Tilt Effect ── */
    var cards = document.querySelectorAll('.modern-card');
    cards.forEach(function (card) {
        card.addEventListener('mousemove', function (e) {
            var rect = card.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;
            
            var centerX = rect.width / 2;
            var centerY = rect.height / 2;
            
            var tiltX = (centerY - y) / centerY * 8;
            var tiltY = (x - centerX) / centerX * 8;
            
            card.style.transform = 'perspective(1000px) rotateX(' + tiltX + 'deg) rotateY(' + tiltY + 'deg) translateY(-5px)';
            card.style.transition = 'none';
        });
        
        card.addEventListener('mouseleave', function () {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
            card.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
        });
    });

    /* ── Preloader Animation ── */
    window.addEventListener('load', function () {
        var preloader = document.getElementById('preloader');
        if (preloader) {
            setTimeout(function () {
                preloader.classList.add('loaded');
                setTimeout(function () {
                    document.body.classList.add('preloader-done');
                }, 500);
            }, 1800);
        } else {
            document.body.classList.add('preloader-done');
        }
    });

    /* ── Contact Form — saves to localStorage ── */
    var r = document.getElementById('contact-form');
    if (r) {
        r.addEventListener('submit', function (s) {
            s.preventDefault();
            s.stopPropagation();

            if (r.checkValidity()) {
                var name    = document.getElementById('name').value.trim();
                var email   = document.getElementById('email').value.trim();
                var message = document.getElementById('message').value.trim();

                /* Save to localStorage */
                var submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
                submissions.push({
                    id:        Date.now(),
                    name:      name,
                    email:     email,
                    message:   message,
                    timestamp: new Date().toLocaleString()
                });
                localStorage.setItem('contactSubmissions', JSON.stringify(submissions));

                /* Animate button → loading */
                var btn = r.querySelector('button[type="submit"]');
                btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Saving...';
                btn.disabled = true;

                /* After short delay, show success state */
                setTimeout(function () {
                    r.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                    r.style.opacity    = '0';
                    r.style.transform  = 'translateY(10px)';

                    setTimeout(function () {
                        /* Replace form with success message */
                        var successEl = document.createElement('div');
                        successEl.id  = 'form-success';
                        successEl.style.cssText = [
                            'text-align:center',
                            'padding:3rem 2rem',
                            'opacity:0',
                            'transform:translateY(16px)',
                            'transition:opacity 0.5s cubic-bezier(0.22,1,0.36,1),transform 0.5s cubic-bezier(0.22,1,0.36,1)'
                        ].join(';');

                        successEl.innerHTML = [
                            '<div style="width:64px;height:64px;border-radius:50%;background:var(--accent);',
                            'display:flex;align-items:center;justify-content:center;margin:0 auto 1.5rem;',
                            'box-shadow:0 0 24px rgba(230,57,70,0.35)">',
                            '<i class="fa-solid fa-check" style="color:#fff;font-size:1.6rem"></i></div>',
                            '<h3 style="font-family:\'Space Grotesk\',sans-serif;font-weight:700;letter-spacing:-0.5px;margin-bottom:0.5rem">Message Received!</h3>',
                            '<p style="color:var(--text-muted);font-size:0.95rem;margin-bottom:1.5rem">',
                            'Thanks <strong style="color:var(--text-main)">' + name + '</strong>, I\'ll get back to you soon.</p>',
                            '<a href="https://docs.google.com/forms/d/e/1FAIpQLSdDcK1Eqq2I7DU5XZivsB33QCMqumLoWVTdE2Hcx1g67pgRZQ/viewform?usp=dialog" ',
                            'target="_blank" ',
                            'style="display:inline-flex;align-items:center;gap:0.5rem;padding:0.65rem 1.5rem;',
                            'background:var(--text-main);color:var(--bg-card);border-radius:50px;',
                            'font-size:0.8rem;font-weight:700;text-decoration:none;letter-spacing:0.5px;',
                            'transition:opacity 0.2s ease;margin-bottom:0;" ',
                            'onmouseover="this.style.opacity=\'0.8\'" onmouseout="this.style.opacity=\'1\'">',
                            '<i class="fa-brands fa-google" style="font-size:0.85rem"></i> Also fill Google Form',
                            '</a>'
                        ].join('');

                        r.parentNode.replaceChild(successEl, r);

                        requestAnimationFrame(function () {
                            successEl.style.opacity   = '1';
                            successEl.style.transform = 'translateY(0)';
                        });
                    }, 400);
                }, 800);
            } else {
                var nameVal = document.getElementById('name').value.trim();
                var emailVal = document.getElementById('email').value.trim();
                var messageVal = document.getElementById('message').value.trim();
                var emailEl = document.getElementById('email');

                var title = "System Alert";
                var desc = "Please fill out all required fields.";

                if (!nameVal) {
                    desc = "Identity required: The NAME field cannot be empty.";
                } else if (!emailVal) {
                    desc = "Link required: The EMAIL field cannot be empty.";
                } else if (emailEl && !emailEl.validity.valid) {
                    desc = "Protocol Error: Please enter a valid EMAIL address.";
                } else if (!messageVal) {
                    desc = "Transmission empty: The MESSAGE field cannot be empty.";
                }

                showFuturisticAlert(title, desc);
            }

            r.classList.add('was-validated');
        }, false);
    }

    function showFuturisticAlert(title, desc) {
        var oldAlert = document.getElementById('futuristic-alert');
        if (oldAlert) {
            oldAlert.remove();
        }

        var alertEl = document.createElement('div');
        alertEl.id = 'futuristic-alert';
        alertEl.className = 'futuristic-alert';
        alertEl.innerHTML = [
            '<div class="futuristic-alert-content">',
            '  <div class="futuristic-alert-title">' + title + '</div>',
            '  <div class="futuristic-alert-desc">' + desc + '</div>',
            '</div>',
            '<div class="futuristic-alert-scanline" id="futuristic-alert-scanline"></div>'
        ].join('');

        document.body.appendChild(alertEl);

        void alertEl.offsetWidth;
        alertEl.classList.add('show');

        var scanline = document.getElementById('futuristic-alert-scanline');
        var duration = 4000;
        var start = null;
        function animateScan(timestamp) {
            if (!start) start = timestamp;
            var progress = timestamp - start;
            var percentage = Math.min((progress / duration) * 100, 100);
            scanline.style.width = percentage + '%';
            if (progress < duration) {
                requestAnimationFrame(animateScan);
            } else {
                alertEl.classList.remove('show');
                setTimeout(function () {
                    alertEl.remove();
                }, 400);
            }
        }
        requestAnimationFrame(animateScan);
    }
});
