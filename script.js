/* ==========================================================================
   PORTFOLIO IBRAHIM NASRI — SCRIPT.JS
   Navbar | Menu mobile | Reveal au scroll | Formulaire | Modal PDF
   ========================================================================== */

(function () {
    'use strict';

    // ==================== DOM + INIT ====================
    document.body.classList.add('loaded');

    // ==================== TUBELIGHT NAVBAR ====================
    const navItems = document.querySelectorAll('.nav-item');
    const navInner = document.querySelector('.nav-inner');
    const navIndicator = document.getElementById('navIndicator');
    const navIndicatorGlow = document.getElementById('navIndicatorGlow');

    function updateIndicator(activeItem) {
        if (!activeItem || !navIndicator || !navIndicatorGlow || !navInner) return;
        const navRect = navInner.getBoundingClientRect();
        const itemRect = activeItem.getBoundingClientRect();

        const left = itemRect.left - navRect.left - 4;
        const width = itemRect.width;

        navIndicator.style.left = left + 'px';
        navIndicator.style.width = width + 'px';

        const glowCenterX = itemRect.left - navRect.left + itemRect.width / 2;
        navIndicatorGlow.style.left = glowCenterX + 'px';
    }

    // ==================== ACTIVE SECTION (scroll spy) ====================
    const sections = ['accueil', 'competences', 'projets', 'contact'];

    function setActive(id) {
        let activeItem = null;
        navItems.forEach(function (item) {
            const isActive = item.getAttribute('data-section') === id;
            item.classList.toggle('active', isActive);
            if (isActive) activeItem = item;
        });
        updateIndicator(activeItem);
    }

    const spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) setActive(entry.target.id);
        });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach(function (id) {
        const el = document.getElementById(id);
        if (el) spy.observe(el);
    });

    window.addEventListener('resize', function () {
        const active = document.querySelector('.nav-item.active');
        if (active) updateIndicator(active);
    });
    setTimeout(function () {
        const active = document.querySelector('.nav-item.active');
        if (active) updateIndicator(active);
    }, 60);

    // smooth anchor clicks (keep default behavior, just ensure active set)
    navItems.forEach(function (item) {
        item.addEventListener('click', function () {
            setActive(this.getAttribute('data-section'));
        });
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

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeModal();
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
