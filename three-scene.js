/* ==========================================================================
   THREE.JS — ROUTEUR 3D RÉALISTE « STUDIO PHOTO »
   Environnement map + éclairage studio + géométrie arrondie + reflets
   ========================================================================== */
(function () {
    'use strict';

    const isFine = window.matchMedia('(pointer: fine)').matches;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const container = document.getElementById('three-canvas');
    if (!container) return;
    if (!window.THREE) {
        container.innerHTML = '<div class="three-fallback mono">3D indisponible</div>';
        return;
    }

    let renderer, scene, camera, router, pmrem;
    let mouse = new THREE.Vector2();
    let clock = new THREE.Clock();
    let smoothRY = 0, targetRY = 0;
    let dragTargetRY = 0;
    let ledRefs = [];
    let running = true, started = false;

    // ==================== ROUNDED BOX ====================
    // core box + 4 rounded vertical edges (cylinders) for a soft, real look
    function roundedBox(w, h, d, r, seg) {
        seg = seg || 10;
        r = Math.min(r, w / 2, d / 2);
        let g = new THREE.Group();
        let m = function (geo) { return new THREE.Mesh(geo); };

        // core
        let core = m(new THREE.BoxGeometry(w - r * 2, h, d - r * 2));
        g.add(core);

        // 4 rounded vertical edges
        let edge = new THREE.CylinderGeometry(r, r, h, seg);
        [
            [w / 2 - r, 0, d / 2 - r], [-w / 2 + r, 0, d / 2 - r],
            [w / 2 - r, 0, -d / 2 + r], [-w / 2 + r, 0, -d / 2 + r]
        ].forEach(function (c) {
            let cyl = m(edge);
            cyl.position.set(c[0], 0, c[1]);
            g.add(cyl);
        });

        // top & bottom plates
        let top = m(new THREE.BoxGeometry(w, 0.001, d));
        top.position.y = h / 2;
        g.add(top);
        let bottom = m(new THREE.BoxGeometry(w, 0.001, d));
        bottom.position.y = -h / 2;
        g.add(bottom);

        return g;
    }

    let boxGeom = function (w, h, d) { return new THREE.BoxGeometry(w, h, d); };
    function mesh(geo) { return new THREE.Mesh(geo); }

    try {
        let W = container.clientWidth, H = container.clientHeight;

        renderer = new THREE.WebGLRenderer({ antialias: isFine, alpha: false });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(W, H);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.25;
        container.appendChild(renderer.domElement);

        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x0a0d14);

        camera = new THREE.PerspectiveCamera(38, W / H, 0.1, 100);
        camera.position.set(5.4, 3.2, 7.4);
        camera.lookAt(0, 0.55, 0);

        // ==================== MATERIALS (PBR) ====================
        const glossyTop = new THREE.MeshPhysicalMaterial({
            color: 0x111318, roughness: 0.14, metalness: 0.1, clearcoat: 1, clearcoatRoughness: 0.05
        });
        const matteBody = new THREE.MeshPhysicalMaterial({
            color: 0x171a21, roughness: 0.6, metalness: 0.05
        });
        const brushedMetal = new THREE.MeshStandardMaterial({
            color: 0x2c3138, roughness: 0.32, metalness: 0.9
        });
        const darkPlastic = new THREE.MeshStandardMaterial({
            color: 0x0c0e13, roughness: 0.45, metalness: 0.2
        });
        const accentOrange = new THREE.MeshStandardMaterial({
            color: 0xff6a2f, roughness: 0.4, metalness: 0.1
        });

        router = new THREE.Group();

        // ==================== CHASSIS ====================
        // Main body (slightly tapered look via glossy top slab + matte base)
        let body = roundedBox(3.3, 0.5, 1.95, 0.12, 12);
        body.traverse(function (o) { if (o.isMesh) o.material = matteBody; });
        body.position.y = 0.35;
        body.castShadow = true;
        router.add(body);

        // Glossy rounded top plate
        let topPlate = roundedBox(3.34, 0.16, 1.99, 0.14, 14);
        topPlate.traverse(function (o) { if (o.isMesh) o.material = glossyTop; });
        topPlate.position.y = 0.68;
        topPlate.castShadow = true;
        router.add(topPlate);

        // vents on top (subtle dark slots)
        for (let i = 0; i < 10; i++) {
            let slot = boxGeom(0.05, 0.012, 1.2);
            let s = mesh(slot);
            s.material = new THREE.MeshStandardMaterial({ color: 0x05060a, roughness: 0.4, metalness: 0.3 });
            s.position.set(-0.55 + i * 0.122, 0.765, -0.1);
            s.rotation.x = 0;
            router.add(s);
        }

        // brushed metal band around the base
        let band = boxGeom(3.34, 0.1, 1.99);
        let b = mesh(band);
        b.material = brushedMetal;
        b.position.y = 0.12;
        router.add(b);

        // ==================== FRONT PORTS (RJ45 + USB) ====================
        let portW = 0.30, portH = 0.13, gap = 0.46, startX = -0.9;
        for (let p = 0; p < 5; p++) {
            // dark inset
            let inset = mesh(boxGeom(portW, portH, 0.06));
            inset.material = new THREE.MeshStandardMaterial({ color: 0x04050a, roughness: 0.35, metalness: 0.5 });
            inset.position.set(startX + p * gap, 0.42, 0.985);
            router.add(inset);
            // contacts
            let cnt = mesh(boxGeom(portW - 0.06, portH - 0.03, 0.02));
            cnt.material = new THREE.MeshStandardMaterial({ color: 0xd9a03a, roughness: 0.3, metalness: 1, emissive: 0x40260a, emissiveIntensity: 0.25 });
            cnt.position.set(startX + p * gap, 0.42, 0.955);
            router.add(cnt);
        }

        // USB port (wider, right)
        let usbInset = mesh(boxGeom(0.36, 0.11, 0.05));
        usbInset.material = darkPlastic;
        usbInset.position.set(1.25, 0.42, 0.985);
        router.add(usbInset);

        // ==================== LED STRIP (front) ====================
        const ledMat = new THREE.MeshStandardMaterial({
            color: 0x2fae3a, roughness: 0.2, metalness: 0, emissive: 0x2fae3a, emissiveIntensity: 1.2
        });
        const ledYs = 0.84;
        const ledXs = [-1.6, -1.42, -1.24, -1.06, -0.88, -0.7, 1.55, 1.7];
        ledXs.forEach(function (lx) {
            let led = mesh(boxGeom(0.055, 0.035, 0.012));
            led.material = ledMat.clone();
            led.position.set(lx, ledYs, 0.99);
            led.ref = { m: led.material, phase: Math.random() * 6 };
            router.add(led);
            ledRefs.push(led);
        });

        // status label bar
        let status = mesh(boxGeom(1.5, 0.02, 0.01));
        status.material = accentOrange;
        status.position.set(1.1, 0.84, 0.99);
        status.material.emissive = new THREE.Color(0xff6a2f);
        status.material.emissiveIntensity = 0.5;
        router.add(status);

        // ==================== ANTENNAS ====================
        function antenna(x, z, tilt, len) {
            let g = new THREE.Group();
            // base joint
            let base = mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.2, 16));
            base.material = brushedMetal;
            base.position.y = 0.18;
            g.add(base);
            // stem (tapered)
            let stem = mesh(new THREE.CylinderGeometry(0.026, 0.036, len, 14));
            stem.material = new THREE.MeshStandardMaterial({ color: 0x20242c, roughness: 0.4, metalness: 0.6 });
            stem.position.y = 0.2 + len / 2;
            stem.castShadow = true;
            g.add(stem);
            // glossy tip
            let tip = mesh(new THREE.CylinderGeometry(0.012, 0.022, 0.1, 12));
            tip.material = glossyTop;
            tip.position.y = 0.2 + len + 0.05;
            g.add(tip);
            g.position.set(x, 0.35, z);
            g.rotation.x = tilt;
            router.add(g);
            return g;
        }
        antenna(-1.15, 0.98, 0.1, 1.35);
        antenna(0.0, 0.98, -0.28, 1.5);
        antenna(1.15, 0.98, 0.1, 1.35);

        scene.add(router);

        // ==================== FLOOR (reflective) ====================
        const floor = new THREE.Mesh(
            new THREE.PlaneGeometry(50, 50),
            new THREE.MeshPhysicalMaterial({
                color: 0x07090e, roughness: 0.25, metalness: 0.7,
                envMapIntensity: 1.2
            })
        );
        floor.rotation.x = -Math.PI / 2;
        floor.position.y = 0;
        floor.receiveShadow = true;
        scene.add(floor);

        // ==================== ENVIRONMENT MAP (studio reflections) ====================
        // Build a procedural "photo studio" so metal/plastic get real reflections.
        pmrem = new THREE.PMREMGenerator(renderer);

        function buildEnvironment() {
            const envScene = new THREE.Scene();
            // soft white studio gradient backdrop
            const back = new THREE.Mesh(
                new THREE.PlaneGeometry(40, 40),
                new THREE.MeshBasicMaterial({ color: 0x22304a, side: THREE.BackSide })
            );
            envScene.add(back);
            // big softboxes (emissive white panels)
            const softMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
            function softbox(x, y, z, sx, sy, ry) {
                const p = new THREE.Mesh(new THREE.PlaneGeometry(sx, sy), softMat);
                p.position.set(x, y, z);
                p.rotation.y = ry;
                envScene.add(p);
            }
            softbox(-6, 5, 2, 5, 5, 0.5);   // left key
            softbox(6, 5, 2, 5, 5, -0.5);   // right fill
            softbox(0, 8, -4, 7, 5, Math.PI); // top/back bounce
            softbox(0, 3, 9, 8, 4, 0);      // front soft
            // warm accent bounce
            const warmMat = new THREE.MeshBasicMaterial({ color: 0xff6a2f });
            const warm = new THREE.Mesh(new THREE.PlaneGeometry(3, 3), warmMat);
            warm.position.set(2, 1.5, 5);
            warm.rotation.y = -0.4;
            envScene.add(warm);

            const rt = pmrem.fromScene(envScene, 0.05);
            scene.environment = rt.texture;
            envScene.dispose();
        }
        buildEnvironment();

        // ==================== STUDIO LIGHTS ====================
        const hemi = new THREE.HemisphereLight(0x8fb4ff, 0x10131c, 0.35);
        scene.add(hemi);

        const key = new THREE.DirectionalLight(0xfff4e0, 1.6);
        key.position.set(4, 6, 5);
        key.castShadow = true;
        key.shadow.mapSize.set(1024, 1024);
        key.shadow.camera.near = 0.5;
        key.shadow.camera.far = 25;
        key.shadow.camera.left = -6;
        key.shadow.camera.right = 6;
        key.shadow.camera.top = 6;
        key.shadow.camera.bottom = -6;
        key.shadow.bias = -0.0005;
        scene.add(key);

        const rimL = new THREE.DirectionalLight(0x9fb8ff, 0.7);
        rimL.position.set(-5, 3, -4);
        scene.add(rimL);

        const accent = new THREE.DirectionalLight(0xff8a4d, 0.4);
        accent.position.set(3, 1, 6);
        scene.add(accent);

        const front = new THREE.DirectionalLight(0xffffff, 0.35);
        front.position.set(0, 1.5, 7);
        scene.add(front);

        // ==================== GROUND RING GLOW ====================
        const ring = new THREE.Mesh(
            new THREE.RingGeometry(3.6, 3.9, 80),
            new THREE.MeshBasicMaterial({ color: 0x2f6bff, transparent: true, opacity: 0.28, side: THREE.DoubleSide })
        );
        ring.rotation.x = -Math.PI / 2;
        ring.position.y = 0.02;
        scene.add(ring);
        const ring2 = new THREE.Mesh(
            new THREE.RingGeometry(4.6, 4.7, 80),
            new THREE.MeshBasicMaterial({ color: 0xff6a2f, transparent: true, opacity: 0.2, side: THREE.DoubleSide })
        );
        ring2.rotation.x = -Math.PI / 2;
        ring2.position.y = 0.02;
        scene.add(ring2);

        // ==================== DUST PARTICLES ====================
        let dust = null;
        if (!reduceMotion) {
            const n = 200;
            const pos = new Float32Array(n * 3);
            for (let i = 0; i < n; i++) {
                pos[i * 3] = (Math.random() - 0.5) * 20;
                pos[i * 3 + 1] = Math.random() * 8;
                pos[i * 3 + 2] = (Math.random() - 0.5) * 16 - 2;
            }
            const dg = new THREE.BufferGeometry();
            dg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
            dust = new THREE.Points(dg, new THREE.PointsMaterial({
                color: 0x7d95ff, size: 0.03, transparent: true, opacity: 0.5
            }));
            scene.add(dust);
        }

        // ==================== INTERACTION ====================
        // parallax toward cursor
        if (isFine && !reduceMotion) {
            window.addEventListener('mousemove', function (e) {
                mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
                mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
            });
        }

        // drag to rotate
        let isDragging = false, prevX = 0;
        renderer.domElement.addEventListener('pointerdown', function (e) {
            isDragging = true; prevX = e.clientX;
            document.body.classList.add('is-dragging');
        });
        window.addEventListener('pointermove', function (e) {
            if (isDragging) {
                dragTargetRY += (e.clientX - prevX) * 0.015;
                prevX = e.clientX;
            }
        });
        window.addEventListener('pointerup', function () {
            isDragging = false;
            document.body.classList.remove('is-dragging');
        });

        // ==================== RESIZE ====================
        function onResize() {
            let w = container.clientWidth, h = container.clientHeight;
            if (!w || !h) return;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        }
        window.addEventListener('resize', onResize);

        // ==================== ANIMATE ====================
        function animate() {
            if (!running) return;
            requestAnimationFrame(animate);
            const t = clock.getElapsedTime();

            // idle float + auto slow rotation
            router.position.y = Math.sin(t * 1.1) * 0.025;
            const autoRot = isDragging ? 0 : Math.sin(t * 0.2) * 0.1;

            targetRY = dragTargetRY;
            smoothRY += (targetRY - smoothRY) * (isDragging ? 0.18 : 0.04);
            router.rotation.y = smoothRY + autoRot;

            // subtle product-level tilt from cursor (kept level, realistic)
            router.rotation.x = isFine && !reduceMotion ? -mouse.y * 0.045 : 0;

            // LEDs pulse
            ledRefs.forEach(function (led) {
                const v = 0.5 + 0.5 * Math.sin(t * 3 + led.ref.phase);
                led.ref.m.emissiveIntensity = 0.7 + v * 1.6;
            });

            // rings pulse
            const s = 1 + Math.sin(t * 0.9) * 0.04;
            ring.scale.set(s, s, s);
            ring.material.opacity = 0.22 + Math.sin(t * 0.9) * 0.08;
            ring2.material.opacity = 0.16 + Math.sin(t * 0.7 + 2) * 0.06;

            if (dust) dust.rotation.y += 0.0003;

            // gentle camera breathing
            camera.position.y = 3.2 + Math.sin(t * 0.35) * 0.08;

            renderer.render(scene, camera);
        }

        // ==================== STAR/STOP WHEN VISIBLE ====================
        const io = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                running = e.isIntersecting;
                if (e.isIntersecting && !started) {
                    started = true;
                    animate();
                } else if (!e.isIntersecting) {
                    started = false;
                }
            });
        }, { threshold: 0.01 });
        io.observe(container);

        // fallback start if observer never fires
        setTimeout(function () {
            if (!started && running) { started = true; animate(); }
        }, 400);

    } catch (err) {
        container.innerHTML = '<div class="three-fallback mono">3D en pause</div>';
        console.error('Three.js:', err);
    }
})();
