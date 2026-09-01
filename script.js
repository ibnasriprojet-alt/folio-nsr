/* ==========================================================================
   PORTFOLIO IBRAHIM NASRI — SCRIPT.JS
   Navbar | Menu mobile | Reveal au scroll | Formulaire | Modal PDF
   ========================================================================== */

(function () {
    'use strict';

    // ==================== DOM + INIT ====================
    document.body.classList.add('loaded');

    // ==================== NAVBAR SCROLL ====================
    const navbar = document.getElementById('navbar');
    function onScrollNav() {
        navbar.classList.toggle('scrolled', window.scrollY > 40);
    }
    window.addEventListener('scroll', onScrollNav, { passive: true });
    onScrollNav();

    // ==================== ACTIVE LINK (scroll spy) ====================
    const sections = ['accueil', 'competences', 'projets', 'contact'];
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    const spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(function (l) {
                    l.classList.toggle('active', l.getAttribute('data-section') === id);
                });
                mobileLinks.forEach(function (l) {
                    l.classList.toggle('active', l.getAttribute('data-section') === id);
                });
            }
        });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach(function (id) {
        const el = document.getElementById(id);
        if (el) spy.observe(el);
    });

    // ==================== MOBILE MENU ====================
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    function toggleMenu(force) {
        const open = typeof force === 'boolean' ? force : !mobileMenu.classList.contains('open');
        mobileMenu.classList.toggle('open', open);
        menuToggle.classList.toggle('open', open);
        document.body.style.overflow = open ? 'hidden' : '';
    }
    menuToggle.addEventListener('click', function () { toggleMenu(); });

    mobileMenu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () { toggleMenu(false); });
    });

    // close on escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            toggleMenu(false);
            closeModal();
        }
    });

    // ==================== REVEAL ON SCROLL ====================
    const revealEls = document.querySelectorAll('[data-reveal]');
    const revealObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(function (el) {
        // mild stagger
        revealObs.observe(el);
    });

    // hero items reveal immediately after load
    window.addEventListener('load', function () {
        setTimeout(function () {
            document.querySelectorAll('.hero [data-reveal]').forEach(function (el) {
                el.classList.add('revealed');
            });
        }, 300);
    });

    // ==================== FORM SUBMISSION ====================
    const form = document.getElementById('contactForm');
    const feedback = document.getElementById('formFeedback');

    function showFeedback(type, text) {
        feedback.textContent = text;
        feedback.className = 'form-feedback form-feedback--' + type;
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = form.querySelector('#name').value.trim();
        const email = form.querySelector('#email').value.trim();
        const subject = form.querySelector('#subject').value.trim();
        const message = form.querySelector('#message').value.trim();

        if (!name || !email || !subject || !message) {
            showFeedback('error', 'Veuillez remplir tous les champs.');
            return;
        }

        const submitBtn = form.querySelector('.btn-submit');
        const originalHTML = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Envoi en cours...</span>';
        submitBtn.disabled = true;
        showFeedback('', '');

        fetch(form.action || 'https://formspree.io/f/mjybnyza', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({ name: name, email: email, subject: subject, message: message })
        })
        .then(function (response) {
            if (!response.ok) throw new Error('Erreur serveur');
            showFeedback('success', 'Message envoyé avec succès !');
            submitBtn.innerHTML = '<span>Envoyé !</span>';
            form.reset();
            setTimeout(function () {
                submitBtn.innerHTML = originalHTML;
                submitBtn.disabled = false;
                showFeedback('', '');
            }, 3500);
        })
        .catch(function (err) {
            showFeedback('error', 'Erreur : ' + err.message + '. Réessayez.');
            submitBtn.innerHTML = '<span>Erreur</span>';
            setTimeout(function () {
                submitBtn.innerHTML = originalHTML;
                submitBtn.disabled = false;
            }, 3000);
        });
    });

    // ==================== PDF PREVIEW MODAL ====================
    const modal = document.getElementById('pdfModal');
    const modalClose = document.getElementById('modalClose');
    const pdfFrame = document.getElementById('pdfFrame');
    const modalTitle = document.getElementById('modalTitle');
    const modalDownload = document.getElementById('modalDownload');

    function openModal(file) {
        const fileName = file.replace('.pdf', '').replace(/_/g, ' ');
        pdfFrame.src = file;
        modalTitle.textContent = fileName;
        modalDownload.href = file;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    function closeModal() {
        if (!modal.classList.contains('active')) return;
        modal.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(function () { pdfFrame.src = ''; }, 300);
    }

    document.querySelectorAll('[data-preview]').forEach(function (btn) {
        btn.addEventListener('click', function () {
            const file = this.getAttribute('data-preview');
            if (file) openModal(file);
        });
    });

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', function (e) {
        if (e.target === modal) closeModal();
    });

    // ==================== TILT EFFECT (cards) ====================
    if (window.matchMedia('(pointer: fine)').matches) {
        document.querySelectorAll('.skill-card, .project-card').forEach(function (card) {
            card.addEventListener('mousemove', function (e) {
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width;
                const y = (e.clientY - rect.top) / rect.height;
                card.style.setProperty('--rx', ((y - 0.5) * -4) + 'deg');
                card.style.setProperty('--ry', ((x - 0.5) * 4) + 'deg');
            });
            card.addEventListener('mouseleave', function () {
                card.style.setProperty('--rx', '0deg');
                card.style.setProperty('--ry', '0deg');
            });
        });
    }

})();
