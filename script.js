/* ==========================================================================
   PORTFOLIO IBRAHIM NASRI — SCRIPT.JS
   SPA Routing | Theme Toggle | Scroll Reveal | Micro-interactions
   ========================================================================== */

(function () {
    'use strict';

    // ==================== DOM CACHE ====================
    const body = document.body;
    const html = document.documentElement;
    const navItems = document.querySelectorAll('.nav-item');
    const pages = document.querySelectorAll('.page');
    const themeToggle = document.getElementById('themeToggle');
    const navLinks = document.querySelectorAll('[data-nav]');
    const navIndicator = document.getElementById('navIndicator');
    const navIndicatorGlow = document.getElementById('navIndicatorGlow');
    const navInner = document.querySelector('.nav-inner');

    // ==================== NAV INDICATOR ====================
    function updateIndicator(activeItem) {
        if (!activeItem || !navIndicator || !navInner) return;

        var navRect = navInner.getBoundingClientRect();
        var itemRect = activeItem.getBoundingClientRect();

        var left = itemRect.left - navRect.left - 4;
        var width = itemRect.width;

        navIndicator.style.left = left + 'px';
        navIndicator.style.width = width + 'px';

        // Glow follows the lamp bar position (top center of item)
        var glowCenterX = itemRect.left - navRect.left + itemRect.width / 2;
        navIndicatorGlow.style.left = glowCenterX + 'px';
    }

    // ==================== SPA ROUTING ====================
    function navigateTo(sectionId) {
        // Hide all pages
        pages.forEach(function (page) {
            page.classList.remove('page--active');
            page.classList.remove('page-enter');
        });

        // Show target page
        var target = document.getElementById(sectionId);
        if (target) {
            target.classList.add('page--active');
            target.classList.add('page-enter');
            window.scrollTo({ top: 0, behavior: 'instant' });

            // Reveal all scroll-reveal elements on the new page with stagger
            var reveals = target.querySelectorAll('.scroll-reveal');
            reveals.forEach(function (el, i) {
                el.classList.remove('revealed');
                setTimeout(function () {
                    el.classList.add('revealed');
                }, 80 + i * 100);
            });
        }

        // Update nav active state
        var activeItem = null;
        navItems.forEach(function (item) {
            item.classList.remove('active');
            if (item.getAttribute('data-section') === sectionId) {
                item.classList.add('active');
                activeItem = item;
            }
        });

        // Move indicator
        updateIndicator(activeItem);

        // Update URL hash
        if (history.replaceState) {
            history.replaceState(null, null, '#' + sectionId);
        }
    }

    // Nav click handlers
    navItems.forEach(function (item) {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            var sectionId = this.getAttribute('data-section');
            navigateTo(sectionId);
        });
    });

    // In-page link handlers (hero buttons)
    navLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            var href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                navigateTo(href.substring(1));
            }
        });
    });

    // Handle hash on load
    function handleInitialRoute() {
        var hash = window.location.hash.replace('#', '');
        if (hash && document.getElementById(hash)) {
            navigateTo(hash);
        } else {
            navigateTo('accueil');
        }
    }

    // ==================== THEME TOGGLE ====================
    function getPreferredTheme() {
        var stored = localStorage.getItem('theme');
        if (stored) return stored;
        return 'dark'; // Default dark
    }

    function setTheme(theme) {
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }

    themeToggle.addEventListener('click', function () {
        var current = html.getAttribute('data-theme');
        var next = current === 'dark' ? 'light' : 'dark';
        setTheme(next);
    });

    // Initialize theme
    setTheme(getPreferredTheme());

    // ==================== SCROLL REVEAL ====================
    function initScrollReveal(container) {
        var elements = (container || body).querySelectorAll('.scroll-reveal:not(.revealed)');

        if ('IntersectionObserver' in window) {
            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.12,
                rootMargin: '0px 0px -40px 0px'
            });

            elements.forEach(function (el) {
                observer.observe(el);
            });
        } else {
            // Fallback: show everything
            elements.forEach(function (el) {
                el.classList.add('revealed');
            });
        }
    }

    // ==================== MAGNETIC BUTTON EFFECT ====================
    function initMagneticButtons() {
        var buttons = document.querySelectorAll('.btn-glass');

        buttons.forEach(function (btn) {
            btn.addEventListener('mousemove', function (e) {
                var rect = btn.getBoundingClientRect();
                var x = e.clientX - rect.left - rect.width / 2;
                var y = e.clientY - rect.top - rect.height / 2;

                btn.style.transform = 'translate(' + (x * 0.15) + 'px, ' + (y * 0.15) + 'px)';
            });

            btn.addEventListener('mouseleave', function () {
                btn.style.transform = 'translate(0, 0)';
            });
        });
    }

    // ==================== TILT CARD EFFECT ====================
    function initTiltCards() {
        var cards = document.querySelectorAll('.glass-card');

        cards.forEach(function (card) {
            card.addEventListener('mousemove', function (e) {
                var rect = card.getBoundingClientRect();
                var x = (e.clientX - rect.left) / rect.width;
                var y = (e.clientY - rect.top) / rect.height;

                var rotateX = (y - 0.5) * -2;
                var rotateY = (x - 0.5) * 2;

                card.style.transform = 'perspective(800px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
            });

            card.addEventListener('mouseleave', function () {
                card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
            });
        });
    }

    // ==================== SMOOTH INPUT FOCUS ====================
    function initFormEffects() {
        var inputs = document.querySelectorAll('.form-input');

        inputs.forEach(function (input) {
            input.addEventListener('focus', function () {
                this.parentElement.classList.add('focused');
            });

            input.addEventListener('blur', function () {
                this.parentElement.classList.remove('focused');
            });
        });
    }

    // ==================== FORM SUBMISSION ====================
    function initFormSubmission() {
        var form = document.querySelector('.contact-form');
        if (!form) return;

        // Create feedback message element
        var feedback = document.createElement('div');
        feedback.className = 'form-feedback';
        form.appendChild(feedback);

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            var submitBtn = form.querySelector('.btn-submit');
            var originalHTML = submitBtn.innerHTML;
            var name = form.querySelector('#name').value.trim();
            var email = form.querySelector('#email').value.trim();
            var subject = form.querySelector('#subject').value.trim();
            var message = form.querySelector('#message').value.trim();

            if (!name || !email || !subject || !message) {
                feedback.textContent = 'Veuillez remplir tous les champs.';
                feedback.className = 'form-feedback form-feedback--error';
                return;
            }

            submitBtn.innerHTML = '<span>Envoi en cours...</span>';
            submitBtn.disabled = true;
            feedback.textContent = '';
            feedback.className = 'form-feedback';

            var payload = {
                name: name,
                email: email,
                subject: subject,
                message: message
            };

            fetch(form.action, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            .then(function (response) {
                if (response.ok) {
                    feedback.textContent = 'Message envoyé avec succès !';
                    feedback.className = 'form-feedback form-feedback--success';
                    submitBtn.innerHTML = '<span>Envoyé !</span>';
                    submitBtn.style.background = '#5a7a5a';
                    form.reset();
                    setTimeout(function () {
                        submitBtn.innerHTML = originalHTML;
                        submitBtn.style.background = '';
                        submitBtn.disabled = false;
                    }, 3000);
                } else {
                    return response.json().then(function (data) {
                        throw new Error(data.error || 'Erreur serveur');
                    });
                }
            })
            .catch(function (err) {
                feedback.textContent = 'Erreur : ' + err.message + '. Réessayez.';
                feedback.className = 'form-feedback form-feedback--error';
                submitBtn.innerHTML = '<span>Erreur</span>';
                submitBtn.style.background = '#7a5a5a';
                setTimeout(function () {
                    submitBtn.innerHTML = originalHTML;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
            });
        });
    }

    // ==================== PDF PREVIEW MODAL ====================
    function initPdfModal() {
        var modal = document.getElementById('pdfModal');
        var modalClose = document.getElementById('modalClose');
        var pdfFrame = document.getElementById('pdfFrame');
        var modalTitle = document.getElementById('modalTitle');
        var modalDownload = document.getElementById('modalDownload');
        var previewBtns = document.querySelectorAll('[data-preview]');

        if (!modal) return;

        previewBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                var file = this.getAttribute('data-preview');
                var fileName = file.replace('.pdf', '').replace(/_/g, ' ');
                pdfFrame.src = file;
                modalTitle.textContent = fileName;
                modalDownload.href = file;
                modal.classList.add('active');
                body.style.overflow = 'hidden';
            });
        });

        function closeModal() {
            modal.classList.remove('active');
            body.style.overflow = '';
            setTimeout(function () {
                pdfFrame.src = '';
            }, 300);
        }

        modalClose.addEventListener('click', closeModal);

        modal.addEventListener('click', function (e) {
            if (e.target === modal) closeModal();
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }

    // ==================== COUNTER ANIMATION ====================
    function animateCounters() {
        var counters = document.querySelectorAll('[data-count]');
        counters.forEach(function (counter) {
            var target = parseInt(counter.getAttribute('data-count'), 10);
            var duration = 1500;
            var start = 0;
            var startTime = null;

            function step(timestamp) {
                if (!startTime) startTime = timestamp;
                var progress = Math.min((timestamp - startTime) / duration, 1);
                var eased = 1 - Math.pow(1 - progress, 3);
                counter.textContent = Math.floor(eased * target);
                if (progress < 1) {
                    requestAnimationFrame(step);
                }
            }

            requestAnimationFrame(step);
        });
    }

    // ==================== KEYBOARD NAVIGATION ====================
    function initKeyboardNav() {
        document.addEventListener('keydown', function (e) {
            var sections = ['accueil', 'competences', 'projets', 'contact'];
            var current = html.getAttribute('data-active-section') || 'accueil';
            var idx = sections.indexOf(current);

            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                var nextIdx = (idx + 1) % sections.length;
                navigateTo(sections[nextIdx]);
                html.setAttribute('data-active-section', sections[nextIdx]);
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                var prevIdx = (idx - 1 + sections.length) % sections.length;
                navigateTo(sections[prevIdx]);
                html.setAttribute('data-active-section', sections[prevIdx]);
            }
        });
    }

    // ==================== INIT ====================
    function init() {
        handleInitialRoute();
        initScrollReveal();
        initMagneticButtons();
        initTiltCards();
        initFormEffects();
        initFormSubmission();
        initPdfModal();
        initKeyboardNav();

        // Update indicator on resize
        window.addEventListener('resize', function () {
            var active = document.querySelector('.nav-item.active');
            if (active) updateIndicator(active);
        });

        // Initial indicator position
        setTimeout(function () {
            var active = document.querySelector('.nav-item.active');
            if (active) updateIndicator(active);
        }, 50);
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
