console.log("Three.js cargado:", typeof THREE);

// --------------------------------------------------------
//  Escena
// --------------------------------------------------------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x20232a);

// --------------------------------------------------------
//  Cámara (perspectiva) y “órbita” manual
// --------------------------------------------------------
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const orbitTarget = new THREE.Vector3(0, 1, 0);
let radius = 12;
let theta = -Math.PI / 4;  // ángulo horizontal
let phi = Math.PI / 3;     // ángulo vertical (desde arriba)

function updateCameraFromSpherical() {
  const x = orbitTarget.x + radius * Math.sin(phi) * Math.cos(theta);
  const y = orbitTarget.y + radius * Math.cos(phi);
  const z = orbitTarget.z + radius * Math.sin(phi) * Math.sin(theta);

  camera.position.set(x, y, z);
  camera.lookAt(orbitTarget);
}

updateCameraFromSpherical();

// --------------------------------------------------------
//  Renderizador
// --------------------------------------------------------
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// --------------------------------------------------------
//  Texturas
// --------------------------------------------------------
const textureLoader = new THREE.TextureLoader();
const floorTexture = textureLoader.load("./textures/floor.jpg");
floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(4, 4);

const boxTexture = textureLoader.load("./textures/box.jpg");

const sphereTexture = textureLoader.load("./textures/sphere.jpg");

const coneTexture = textureLoader.load("./textures/cone.jpeg");

const torusTexture = textureLoader.load("./textures/torus.jpg");

// --------------------------------------------------------
//  Piso con textura
// --------------------------------------------------------
const floorGeo = new THREE.PlaneGeometry(20, 20);
const floorMat = new THREE.MeshStandardMaterial({ map: floorTexture });
const floor = new THREE.Mesh(floorGeo, floorMat);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);

// --------------------------------------------------------
//  Formas geométricas básicas
// --------------------------------------------------------
const objects = [];

// Cubo con textura
const boxGeo = new THREE.BoxGeometry(1.5, 1.5, 1.5);
const boxMat = new THREE.MeshStandardMaterial({ map: boxTexture });
const box = new THREE.Mesh(boxGeo, boxMat);
// Cubo (base de la escultura)
box.position.set(0, 0.8, 0);
box.castShadow = true;
box.receiveShadow = true;
scene.add(box);
objects.push(box);

// Esfera
const sphereGeo = new THREE.SphereGeometry(1, 32, 32);
const sphereMat = new THREE.MeshStandardMaterial({ map: sphereTexture });
const sphere = new THREE.Mesh(sphereGeo, sphereMat);
// Esfera (sobre el cubo, movimiento vertical)
sphere.position.set(0, 2.56, 0);
sphere.castShadow = true;
sphere.receiveShadow = true;
scene.add(sphere);
objects.push(sphere);

// Cono
const coneGeo = new THREE.ConeGeometry(1, 2, 32);
const coneMat = new THREE.MeshStandardMaterial({ map: coneTexture });
const cone = new THREE.Mesh(coneGeo, coneMat);
// Cono (punta superior)
cone.position.set(0, 4.55, 0);
cone.castShadow = true;
cone.receiveShadow = true;
scene.add(cone);
objects.push(cone);

// Toro (donut)
const torusGeo = new THREE.TorusGeometry(1, 0.3, 16, 64);
const torusMat = new THREE.MeshStandardMaterial({ map: torusTexture });
const torus = new THREE.Mesh(torusGeo, torusMat);
// Toro (aro que rodea la esfera)
torus.position.set(0, 6.8, 0);
torus.castShadow = true;
torus.receiveShadow = true;
scene.add(torus);
objects.push(torus);

// --------------------------------------------------------
//  Iluminación
// --------------------------------------------------------
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
dirLight.position.set(5, 10, 3);
dirLight.castShadow = true;
dirLight.shadow.mapSize.set(1024, 1024);
scene.add(dirLight);

// --------------------------------------------------------
//  Controles de órbita MANUALES (mouse + rueda)
// --------------------------------------------------------
let isDragging = false;
let prevX = 0;
let prevY = 0;

const rotSpeed = 0.005;
const zoomSpeed = 0.002;

renderer.domElement.addEventListener("mousedown", (event) => {
  isDragging = true;
  prevX = event.clientX;
  prevY = event.clientY;
});

window.addEventListener("mouseup", () => {
  isDragging = false;
});

window.addEventListener("mousemove", (event) => {
  if (!isDragging) return;

  const deltaX = event.clientX - prevX;
  const deltaY = event.clientY - prevY;
  prevX = event.clientX;
  prevY = event.clientY;

  theta -= deltaX * rotSpeed;
  phi -= deltaY * rotSpeed;

  // limitar ángulo vertical para no pasar por los polos
  const epsilon = 0.1;
  phi = Math.max(epsilon, Math.min(Math.PI - epsilon, phi));

  updateCameraFromSpherical();
});

// Zoom con rueda
renderer.domElement.addEventListener("wheel", (event) => {
  event.preventDefault();
  radius += event.deltaY * zoomSpeed;
  radius = Math.max(5, Math.min(40, radius)); // límites de zoom
  updateCameraFromSpherical();
}, { passive: false });

// --------------------------------------------------------
//  Vistas con teclas [1] y [2]
// --------------------------------------------------------
function setFrontView() {
  radius = 12;
  theta = -Math.PI / 4;
  phi = Math.PI / 3;
  updateCameraFromSpherical();
}

function setTopView() {
  radius = 15;
  theta = 0;
  phi = 0.3; // casi cenital
  updateCameraFromSpherical();
}

// Vista inicial
setFrontView();

window.addEventListener("keydown", (event) => {
  if (event.key === "1") {
    setFrontView();
  } else if (event.key === "2") {
    setTopView();
  }
});

// --------------------------------------------------------
//  Animación
// --------------------------------------------------------
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
  
    const t = clock.getElapsedTime();
  
    // Movimiento de rotacio de la esfera
    sphere.rotation.x += 0.025;
  
    // Toro rotando encima del cono
    torus.rotation.x += 0.0;
    torus.rotation.y += -0.02;
  

  
    // Cubo girando lentamente (base cinética)
    box.rotation.y += 0.005;
  
    // Cono rotando como un "pivote" superior
    cone.rotation.y -= -0.01;
  
    // Render + cámara
    renderer.render(scene, camera);
  }
  

animate();
