/* ==========================================================================
   THREE.JS — ROUTEUR 3D RÉALISTE + FOND ANIMÉ
   ========================================================================== */
(function () {
    'use strict';

    const isFine = window.matchMedia('(pointer: fine)').matches;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Only build full 3D on capable devices
    const container = document.getElementById('three-canvas');
    if (!container) return;
    if (!window.THREE) {
        container.innerHTML = '<div class="three-fallback mono">3D indisponible</div>';
        return;
    }

    let renderer, scene, camera, router, floor;
    let raycaster, mouse = new THREE.Vector2();
    let clock = new THREE.Clock();
    let targetRotY = 0, currentRotY = 0, targetRotX = 0, currentRotX = 0;
    let ledRefs = [];
    let floatBase = 0;
    let running = true;

    // ==================== SETUP ====================
    try {
        var width = container.clientWidth;
        var height = container.clientHeight;

        renderer = new THREE.WebGLRenderer({
            antialias: isFine,
            alpha: false
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(width, height);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.1;
        container.appendChild(renderer.domElement);

        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x07090e);
        // subtle fog for depth
        scene.fog = new THREE.Fog(0x07090e, 12, 26);

        camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
        camera.position.set(6.2, 3.6, 8.4);
        camera.lookAt(0, 0.9, 0);

        // ==================== LIGHTS ====================
        var hemi = new THREE.HemisphereLight(0x8fb4ff, 0x11141c, 0.45);
        scene.add(hemi);

        var key1 = new THREE.DirectionalLight(0xffffff, 1.1);
        key1.position.set(5, 8, 6);
        key1.castShadow = true;
        key1.shadow.mapSize.width = 1024;
        key1.shadow.mapSize.height = 1024;
        key1.shadow.camera.near = 0.5;
        key1.shadow.camera.far = 25;
        key1.shadow.camera.left = -8;
        key1.shadow.camera.right = 8;
        key1.shadow.camera.top = 8;
        key1.shadow.camera.bottom = -8;
        scene.add(key1);

        var key2 = new THREE.DirectionalLight(0x2f6bff, 0.5);
        key2.position.set(-6, 4, -5);
        scene.add(key2);

        // orange accent rim
        var rim = new THREE.DirectionalLight(0xff6a2f, 0.55);
        rim.position.set(-3, 2, 8);
        scene.add(rim);

        // warm fill from front
        var front = new THREE.PointLight(0xf0b585, 0.5, 20);
        front.position.set(0, 2, 7);
        scene.add(front);

        // ==================== MATERIALS ====================
        // brushed dark metal top
        var metalTop = new THREE.MeshStandardMaterial({
            color: 0x3a3f47,
            roughness: 0.45,
            metalness: 0.85,
            flatShading: false
        });
        // matte plastic body
        var plasticBody = new THREE.MeshStandardMaterial({
            color: 0x14161c,
            roughness: 0.55,
            metalness: 0.25
        });
        // glossy dark plastic (front face)
        var glossFront = new THREE.MeshStandardMaterial({
            color: 0x0b0d12,
            roughness: 0.18,
            metalness: 0.55
        });
        // antenna metal
        var antenMetal = new THREE.MeshStandardMaterial({
            color: 0x2c3038,
            roughness: 0.4,
            metalness: 0.9
        });
        // antenna plastic
        var antenPlast = new THREE.MeshStandardMaterial({
            color: 0x0a0c11,
            roughness: 0.6,
            metalness: 0.2
        });

        router = new THREE.Group();

        // ==================== CHASSIS ====================
        var body = box(3.4, 0.85, 1.9);
        body.material = plasticBody;
        body.position.y = 0.55;
        body.castShadow = true;
        body.receiveShadow = true;
        router.add(body);

        // glossy front band
        var frontBand = box(3.4, 0.5, 0.06);
        frontBand.material = glossFront;
        frontBand.position.set(0, 0.62, 0.96);
        router.add(frontBand);

        // vent slats top
        for (var i = 0; i < 12; i++) {
            var slat = box(0.06, 0.02, 1.4);
            slat.material = metalTop;
            slat.position.set(-0.6 + i * 0.11, 0.975, 0.05);
            router.add(slat);
        }

        // recessed top around vents
        var topLip = box(3.42, 0.03, 1.92);
        topLip.material = metalTop;
        topLip.position.y = 0.975;
        topLip.position.z = -0.02;
        router.add(topLip);

        // side panels (thin metal)
        var sideL = box(0.06, 0.85, 1.9);
        sideL.material = metalTop;
        sideL.position.set(-1.73, 0.55, 0);
        router.add(sideL);
        var sideR = box(0.06, 0.85, 1.9);
        sideR.material = metalTop;
        sideR.position.set(1.73, 0.55, 0);
        router.add(sideR);

        // ==================== FRONT PORTS (ethernet, crossover) ====================
        var portW = 0.34, portH = 0.16, gap = 0.42, startX = -1.1;
        for (var p = 0; p < 5; p++) {
            var slot = box(portW, portH, 0.05);
            slot.material = new THREE.MeshStandardMaterial({
                color: 0x05060a, roughness: 0.3, metalness: 0.6
            });
            slot.position.set(startX + p * gap, 0.62, 0.93);
            router.add(slot);

            // connector contacts inside
            var cnt = box(portW - 0.06, portH - 0.04, 0.02);
            cnt.material = new THREE.MeshStandardMaterial({
                color: 0xe8a94a, roughness: 0.3, metalness: 0.9, emissive: 0x7a4c12, emissiveIntensity: 0.3
            });
            cnt.position.set(startX + p * gap, 0.62, 0.9);
            router.add(cnt);
        }

        // ==================== LED STRIPS (front) ====================
        var ledMat = new THREE.MeshStandardMaterial({
            color: 0x2fae3a, roughness: 0.3, metalness: 0,
            emissive: 0x2fae3a, emissiveIntensity: 1.4
        });
        var ledY = 0.96;
        var ledPositions = [-1.5, -1.32, -1.14, -0.96, -0.78, 1.2, 1.38, 1.56];
        ledPositions.forEach(function (lx) {
            var led = box(0.07, 0.045, 0.01);
            led.material = ledMat.clone();
            led.position.set(lx, ledY, 0.97);
            led.ref = { m: led.material, phase: Math.random() * 6 };
            router.add(led);
            ledRefs.push(led);
        });

        // ==================== WIFI BUTTON / status ====================
        var wifiBtn = box(0.4, 0.14, 0.08);
        wifiBtn.material = new THREE.MeshStandardMaterial({
            color: 0x0a0c11, roughness: 0.5, metalness: 0.3
        });
        wifiBtn.position.set(0, 0.62, 0.94);
        router.add(wifiBtn);

        // ==================== ANTENNAS ====================
        function antenna(x, tilt) {
            var g = new THREE.Group();
            // base
            var base = cyl(0.05, 0.05, 0.22, 12);
            base.material = antenMetal;
            base.position.y = 0.86;
            base.castShadow = true;
            g.add(base);
            // stem
            var stem = cyl(0.032, 0.032, 0.8, 10);
            stem.material = new THREE.MeshStandardMaterial({
                color: 0x33373f, roughness: 0.35, metalness: 0.95
            });
            stem.position.y = 1.35;
            stem.castShadow = true;
            g.add(stem);
            // tip
            var tip = cyl(0.04, 0.02, 0.16, 10);
            tip.material = antenPlast;
            tip.position.y = 1.82;
            g.add(tip);
            // joint (tilted)
            g.position.set(x, 0.55, 0.9);
            g.rotation.x = tilt;
            router.add(g);
            return g;
        }
        antenna(-1.4, -0.15);
        antenna(0, -0.35);
        antenna(1.4, -0.15);

        // router shadow onto floor via group
        router.position.y = 0;

        scene.add(router);

        // ==================== FLOOR (reflective) ====================
        floor = new THREE.Mesh(
            new THREE.PlaneGeometry(30, 30),
            new THREE.MeshStandardMaterial({
                color: 0x07090e,
                roughness: 0.35,
                metalness: 0.6,
                envMapIntensity: 1
            })
        );
        floor.rotation.x = -Math.PI / 2;
        floor.position.y = -0.01;
        floor.receiveShadow = true;
        scene.add(floor);

        // ==================== ANIMATED GRID BACKDROP (floor ring glow) ====================
        var ringGeo = new THREE.RingGeometry(4.2, 4.32, 64);
        var ringMat = new THREE.MeshBasicMaterial({
            color: 0x2f6bff, transparent: true, opacity: 0.35, side: THREE.DoubleSide
        });
        var ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = -Math.PI / 2;
        ring.position.y = 0.001;
        scene.add(ring);

        var ring2Geo = new THREE.RingGeometry(5.6, 5.7, 64);
        var ring2 = new THREE.Mesh(ring2Geo, ringMat.clone());
        ring2.material.color.setHex(0xff6a2f);
        ring2.material.opacity = 0.22;
        ring2.rotation.x = -Math.PI / 2;
        ring2.position.y = 0.001;
        scene.add(ring2);

        // ==================== FLOATING DUST PARTICLES ====================
        var particleCount = reduceMotion ? 0 : 320;
        var dustGeo = new THREE.BufferGeometry();
        var positions = new Float32Array(particleCount * 3);
        for (var d = 0; d < particleCount; d++) {
            positions[d * 3] = (Math.random() - 0.5) * 22;
            positions[d * 3 + 1] = Math.random() * 9;
            positions[d * 3 + 2] = (Math.random() - 0.5) * 18 - 2;
        }
        dustGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        var dustMat = new THREE.PointsMaterial({
            color: 0x5d7cff, size: 0.035, transparent: true, opacity: 0.55
        });
        var dust = new THREE.Points(dustGeo, dustMat);
        scene.add(dust);

        // ==================== INTERACTION ====================
        raycaster = new THREE.Raycaster();

        if (isFine && !reduceMotion) {
            document.addEventListener('mousemove', function (e) {
                mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
                mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
            });
        }

        // drag to rotate
        var isDragging = false, prevX = 0;
        renderer.domElement.addEventListener('pointerdown', function (e) {
            isDragging = true; prevX = e.clientX;
            document.body.classList.add('is-dragging');
        });
        window.addEventListener('pointermove', function (e) {
            if (isDragging) {
                var dx = e.clientX - prevX;
                targetRotY += dx * 0.01;
                prevX = e.clientX;
            }
        });
        window.addEventListener('pointerup', function () {
            isDragging = false;
            document.body.classList.remove('is-dragging');
        });

        // ==================== RESIZE ====================
        function onResize() {
            var w = container.clientWidth;
            var h = container.clientHeight;
            if (!w || !h) return;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        }
        window.addEventListener('resize', onResize);

        // expose for scroll reactions
        window.__routerScene = { router: router };

        // ==================== ANIMATE ====================
        function animate() {
            if (!running) return;
            requestAnimationFrame(animate);

            var t = clock.getElapsedTime();
            floatBase += 0.004;

            // gentle idle float + rotation
            router.position.y = Math.sin(t * 1.2) * 0.02;
            router.rotation.y = currentRotY + Math.sin(t * 0.25) * 0.12;

            // parallax toward mouse
            if (isFine && !reduceMotion) {
                targetRotX = -mouse.y * 0.15;
                currentRotX = THREE.MathUtils.lerp(currentRotX, targetRotX, 0.05);
            }
            // smooth drag rotation
            currentRotY = THREE.MathUtils.lerp(currentRotY, targetRotY, isDragging ? 0.2 : 0.05);
            router.rotation.x = currentRotX + Math.sin(t * 0.4) * 0.04;

            // LEDs blink
            ledRefs.forEach(function (led) {
                var v = 0.5 + 0.5 * Math.sin(t * 2.4 + led.ref.phase);
                led.ref.m.emissiveIntensity = 0.6 + v * 1.4;
            });

            // rings pulse
            var s = 1 + Math.sin(t * 1.0) * 0.03;
            ring.scale.set(s, s, s);
            ring.material.opacity = 0.3 + Math.sin(t * 1.0) * 0.1;

            // dust drift
            if (dust) {
                dust.rotation.y += 0.0004;
            }

            // subtle camera breathing
            camera.position.y = 3.6 + Math.sin(t * 0.4) * 0.1;

            renderer.render(scene, camera);
        }

        // start + stop when off-screen
        var started = false;
        var io = new IntersectionObserver(function (entries) {
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

    } catch (err) {
        container.innerHTML = '<div class="three-fallback mono">3D en pause</div>';
        console.error('Three.js:', err);
    }

    // helpers
    function box(w, h, d) {
        return new THREE.Mesh(new THREE.BoxGeometry(w, h, d));
    }
    function cyl(rt, rb, h, seg) {
        return new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg));
    }

})();
