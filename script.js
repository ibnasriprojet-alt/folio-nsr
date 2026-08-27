/* ==========================================================================
   PORTFOLIO NASRI — SCRIPT.JS
   ========================================================================== */

(function () {
    'use strict';

    /* ================= Données ================= */
    const EMAIL = 'ibnasri.sio@gmail.com';

    const PROJECTS = [
        {
            title: 'Simulation Réseau Cisco', cat: 'Réseau & Routage', year: '2025', file: 'Simulation_Reseau_Cisco.pkt', pdf: 'Simulation Reseau Cisco.pdf',
            desc: 'Conception et simulation d\'un réseau d\'entreprise avec Cisco Packet Tracer : topologie, addressing et routage.'
        },
        {
            title: 'Serveur Debian LAMP', cat: 'Systèmes & Services', year: '2025', file: 'Rapport_Serveur_Debian_LAMP.pdf',
            desc: 'Déploiement complet d\'un serveur LAMP (Linux, Apache, MySQL, PHP) sur Debian. Configuration et sécurisation.'
        },
        {
            title: 'Virtualisation Proxmox', cat: 'Virtualisation', year: '2024', file: 'Rapport proxmox.pdf',
            desc: 'Virtualisation d\'infrastructure avec Proxmox VE : création de machines virtuelles, gestion du stockage et sauvegardes.'
        },
        {
            title: 'Rapport de Stage', cat: 'Stage SISR', year: '2024', file: 'Rapport de Stage def.pdf',
            desc: 'Stage en entreprise dans le domaine des systèmes d\'information et réseaux. Mise en pratique des compétences en formation.'
        }
    ];

    /* ================= Refs & état ================= */
    const $ = s => document.querySelector(s);
    const body = document.body;
    const FINE = matchMedia('(pointer:fine)').matches;
    const REDUCE = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (FINE) document.documentElement.classList.add('fine');

    const header = $('#header'), burger = $('#burger'), menu = $('#menu');
    const cursor = $('#cursor'), preview = $('#preview');
    const contact = $('#contact');
    let menuOpen = false, footerTop = contact.offsetTop;

    /* ================= Rendu : projets ================= */
    const arrowSVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M7 17L17 7M8 7h9v9"/></svg>';
    const astSVG = '<svg class="ast" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M3.3 7l17.4 10M3.3 17L20.7 7"/></svg>';

    $('#projectList').innerHTML = PROJECTS.map((p, i) => `
        <article class="project fade-up" style="--d:${i * 0.06}s" data-i="${i}" tabindex="0" role="button" aria-label="Ouvrir le projet ${p.title}">
            <span class="p-num mono">${String(i + 1).padStart(2, '0')}</span>
            <h3 class="p-title">${p.title}</h3>
            <span class="p-cat mono">${p.cat}</span>
            <span class="p-year mono">${p.year}</span>
            <span class="p-arrow">${arrowSVG}</span>
        </article>`).join('');

    /* ================= Rendu : marquee ================= */
    const SKILLS = ['Systèmes', 'Réseaux', 'Virtualisation', 'Scripting', 'Sécurité', 'Monitoring'];
    const seg = SKILLS.map(s => `<span class="mq-item">${s}${astSVG}</span>`).join('');
    $('#marqueeTrack').innerHTML = `<div class="marquee-seg">${seg}</div><div class="marquee-seg" aria-hidden="true">${seg}</div>`;

    /* ================= Navigation (bridging to sections) ================= */
    // Since this becomes a one-page scroll layout, section links scroll naturally.
    // Nav links just set the hamburger closes + smooth scroll handled by CSS.

    /* ================= Préloader ================= */
    const loader = $('#loader'), loaderCount = $('#loaderCount');
    function finishLoad() {
        loader.classList.add('done');
        body.classList.remove('no-scroll');
        setTimeout(() => loader.remove(), 1400);
        document.querySelectorAll('.hero .rl, .hero .fade-up, .header').forEach((el, i) =>
            setTimeout(() => el.classList.add('in'), i * 90));
    }
    if (REDUCE) { finishLoad(); }
    else {
        const t0 = performance.now(), dur = 1400;
        (function tick(t) {
            const p = Math.min(1, (t - t0) / dur);
            const e = p * p * (3 - 2 * p);
            loaderCount.textContent = Math.floor(e * 100);
            p < 1 ? requestAnimationFrame(tick) : setTimeout(finishLoad, 150);
        })(t0);
    }

    /* ================= Reveals au scroll ================= */
    const io = new IntersectionObserver(entries => {
        entries.forEach(en => {
            if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    document.querySelectorAll('[data-io], .fade-up:not(.header)').forEach(el => io.observe(el));

    /* ================= Menu mobile ================= */
    function toggleMenu(open) {
        menuOpen = open;
        body.classList.toggle('menu-open', open);
        menu.classList.toggle('open', open);
        burger.setAttribute('aria-expanded', open);
        menu.setAttribute('aria-hidden', !open);
    }
    burger.addEventListener('click', () => toggleMenu(!menuOpen));
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggleMenu(false)));

    /* ================= Accordéons ================= */
    document.querySelectorAll('.acc-head').forEach(head => {
        head.addEventListener('click', () => {
            const item = head.parentElement, opened = item.classList.contains('open');
            document.querySelectorAll('.acc-item.open').forEach(o => {
                o.classList.remove('open');
                o.querySelector('.acc-body').style.maxHeight = '0px';
                o.querySelector('.acc-head').setAttribute('aria-expanded', 'false');
            });
            if (!opened) {
                item.classList.add('open');
                const b = item.querySelector('.acc-body');
                b.style.maxHeight = b.scrollHeight + 'px';
                head.setAttribute('aria-expanded', 'true');
            }
        });
    });

    /* ================= Projets : ouverture ================= */
    // Opens a new tab to view the document (PDF) or downloads .pkt
    function openProject(i) {
        const p = PROJECTS[i];
        if (p.pdf) {
            window.open(p.pdf, '_blank');
        } else {
            const a = document.createElement('a');
            a.href = p.file;
            a.download = p.file;
            a.click();
        }
    }
    document.addEventListener('click', e => {
        const row = e.target.closest('.project');
        if (row) {
            e.preventDefault();
            openProject(+row.dataset.i);
        }
    });
    document.addEventListener('keydown', e => {
        const row = e.target.closest?.('.project');
        if (row && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); openProject(+row.dataset.i); }
        if (e.key === 'Escape') toggleMenu(false);
    });

    /* ================= Aperçu flottant ================= */
    // Build simple SVG thumbnails per project (title on accent)
    function svgThumb(title) {
        return `data:image/svg+xml,${encodeURIComponent(
            `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="800"><rect width="100%" height="100%" fill="%23181410"/><text x="40" y="60" font-family="Georgia" font-size="26" fill="%23E0491F">Portfolio NASRI</text><text x="40" y="720" font-family="Georgia" font-size="52" fill="%23F2EEE6">${title}</text></svg>`
        )}`;
    }
    preview.innerHTML = PROJECTS.map((p, i) =>
        `<img src="${svgThumb(p.title)}" alt="" data-i="${i}"/>`).join('');
    const pImgs = [...preview.querySelectorAll('img')];
    const list = $('#projectList');
    let pvOn = false, pvX = innerWidth / 2, pvY = innerHeight / 2, pvS = 0.85, pvO = 0;
    if (FINE) {
        list.addEventListener('mouseover', e => {
            const row = e.target.closest('.project');
            if (row) {
                pImgs.forEach((im, k) => im.classList.toggle('active', k === +row.dataset.i));
                pvOn = true;
            }
        });
        list.addEventListener('mouseleave', () => {
            pvOn = false;
            pImgs.forEach(im => im.classList.remove('active'));
        });
    }

    /* ================= Copie e-mail + toast ================= */
    const toast = $('#toast'), toastMsg = $('#toastMsg');
    let toastTimer;
    function showToast(msg) {
        toastMsg.textContent = msg;
        toast.classList.add('show');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
    }
    $('#copyEmail').addEventListener('click', async () => {
        try { await navigator.clipboard.writeText(EMAIL); }
        catch {
            const ta = document.createElement('textarea');
            ta.value = EMAIL; document.body.appendChild(ta);
            ta.select(); document.execCommand('copy'); ta.remove();
        }
        showToast('Adresse copiée dans le presse-papiers');
    });

    /* ================= Boucle rAF globale ================= */
    let mx = innerWidth / 2, my = innerHeight / 2, cx = mx, cy = my, pr = 0;
    window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

    function raf() {
        const sy = scrollY, vh = innerHeight;

        header.classList.toggle('scrolled', sy > 60);
        header.classList.toggle('on-dark', sy + 84 >= footerTop);

        if (FINE) {
            cx += (mx - cx) * 0.22; cy += (my - cy) * 0.22;
            cursor.style.transform = `translate(${cx}px,${cy}px)`;
            pvX += (mx - pvX) * 0.11; pvY += (my - pvY) * 0.11;
            pvS += ((pvOn ? 1 : 0.82) - pvS) * 0.12;
            pvO += ((pvOn ? 1 : 0) - pvO) * 0.14;
            pr += (Math.max(-9, Math.min(9, (mx - pvX) * 0.07)) - pr) * 0.12;
            preview.style.opacity = pvO.toFixed(3);
            preview.style.transform = `translate(${pvX}px,${pvY}px) translate(-50%,-50%) rotate(${pr.toFixed(2)}deg) scale(${pvS.toFixed(3)})`;
        }

        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Cursor "link" state
    document.addEventListener('mousemove', e => {
        cursor.classList.toggle('is-link', !!e.target.closest('a, button, .project'));
    });

    window.addEventListener('resize', () => { footerTop = contact.offsetTop; });
})();
