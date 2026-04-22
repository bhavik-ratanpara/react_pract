// 1. SMOOTH SCROLL SETUP (Lenis)
const lenis = new Lenis({ duration: 1.5, smooth: true });
function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);

// 2. THREE.JS SCENE SETUP
const container = document.getElementById('webgl-container');
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 0, 8); // Camera position

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
container.appendChild(renderer.domElement);

// Lights
const ambient = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambient);
const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
dirLight.position.set(5, 5, 5);
scene.add(dirLight);

// 3. LOAD YOUR .GLB FILE
const loader = new THREE.GLTFLoader();
let model = null;

// 👇 PATH TO YOUR FILE: models/food.glb
loader.load('./models/mesh.glb', (gltf) => {
    model = gltf.scene;
    scene.add(model);

    // --- AUTO CENTERING & SCALING ---
    // This ensures your model is visible regardless of its original size
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 3 / maxDim; // Scale to fit roughly 3 units

    model.scale.setScalar(scale);
    model.position.sub(center.multiplyScalar(scale)); // Center it
    // ----------------------------------

    console.log("✅ Model Loaded!");

    // Start GSAP animation ONLY after model is loaded
    initScrollAnimations();
});

// 4. GSAP ANIMATIONS
gsap.registerPlugin(ScrollTrigger);

function initScrollAnimations() {
    // Text Fade In
    gsap.utils.toArray('.content').forEach(el => {
        gsap.to(el, {
            opacity: 1, y: 0, duration: 1,
            scrollTrigger: { trigger: el, start: "top 75%" }
        });
    });

    // Model 3D Movement
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5 // Smoothness factor
        }
    });

    // Phase 1: Rotate and Zoom slightly
    tl.to(model.rotation, { y: Math.PI, x: 0.2, duration: 2 })

        // Phase 2: Move to side (Right)
        .to(model.position, { x: -2.5, z: 2, duration: 2 }, "-=1") // -=1 overlaps animations
        .to(model.rotation, { y: Math.PI * 1.5, duration: 2 }, "<")

        // Phase 3: Move to other side (Left) and flip
        .to(model.position, { x: 2.5, z: 0, duration: 2 })
        .to(model.rotation, { z: Math.PI / 4, y: Math.PI * 2.5, duration: 2 }, "<");
}

// 5. RENDER LOOP
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

// Handle Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});