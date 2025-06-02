import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

const canvas = document.getElementById('bg');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 50;

const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Galaxy star particle system
const geometry = new THREE.BufferGeometry();
const particles = 1300;
const positions = [];
const colors = [];

for (let i = 0; i < particles; i++) {
  const radius = Math.random() * 50;
  const angle = radius * 0.5 + Math.random() * 2 * Math.PI;
  const spiral = i % 2 === 0 ? 1 : -1;

  const x = Math.cos(angle) * radius * spiral;
  const y = (Math.random() - 0.5) * 20;
  const z = Math.sin(angle) * radius * spiral;

  positions.push(x, y, z);

  const color = new THREE.Color();
  color.setHSL(0.6 + Math.random() * 0.4, 1.0, 0.8); // soft blue-purple-pink range
  colors.push(color.r, color.g, color.b);
}

geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

// ✨ Use soft glowing, round particles
const material = new THREE.PointsMaterial({
  size: 1.2,
  sizeAttenuation: true,
  vertexColors: true,
  transparent: true,
  opacity: 0.8,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
});

// Make it round stars using sprite
const textureLoader = new THREE.TextureLoader();
textureLoader.load('https://threejs.org/examples/textures/sprites/disc.png', (texture) => {
  material.map = texture;
  material.alphaTest = 0.001;
  material.needsUpdate = true;
});

const galaxy = new THREE.Points(geometry, material);
scene.add(galaxy);

// Animate
function animate() {
  requestAnimationFrame(animate);
  galaxy.rotation.y += 0.001;
  galaxy.rotation.x += 0.0005;
  renderer.render(scene, camera);
}
animate();

// Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
