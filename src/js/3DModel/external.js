import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/Addons.js";

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(702, 702);
renderer.setPixelRatio(window.devicePixelRatio);
var globalModel;
const color = new THREE.TextureLoader().load(
  "models/chipa/textures/chip-texture_COLOR.png"
);
color.wrapS = THREE.RepeatWrapping;
color.wrapT = THREE.RepeatWrapping;
color.repeat.set(200, 133);
color.offset.set(0, -0.2);
const bump = new THREE.TextureLoader().load(
  "chipa/textures/Текстура щепы_DISP.png"
);
bump.wrapS = THREE.RepeatWrapping;
bump.wrapT = THREE.RepeatWrapping;
bump.repeat.set(200, 200);
bump.offset.set(0, 0.1);
const ao = new THREE.TextureLoader().load(
  "models/chipa/textures/Текстура щепы_OCC.png"
);
ao.wrapS = THREE.RepeatWrapping;
ao.wrapT = THREE.RepeatWrapping;
ao.repeat.set(200, 200);
ao.offset.set(0, 0.1);
const material = new THREE.MeshStandardMaterial({
  map: color,
  aoMap: ao,
  aoMapIntensity: 0.5,
  bumpMap: bump,
  bumpScale: 15,
});

document.getElementById("wooden-chip").appendChild(renderer.domElement);

let mouseX = 0,
  mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;
document.addEventListener("mousemove", onDocumentMouseMove);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  5,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
camera.position.set(4, 5, 500);

const pointLight1 = new THREE.PointLight(0xffffff, 5000, 0, 1.45);
pointLight1.position.set(25, 250, 250);
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight(0xffffff, 5000, 0, 1.45);
pointLight2.position.set(-150, -25, 250);
scene.add(pointLight2);

const loader = new OBJLoader().setPath("models/");
loader.load(
  "chipa2_3.obj",
  (model) => {
    globalModel = model;

    globalModel.scale.set(3, 1.5, 2.5);
    globalModel.traverse((child) => {
      if (child.isMesh) {
        child.material = material;
      }
    });
    scene.add(model); // Добавить модель на сцену
  },
  (xhr) => {
    console.log(`loading ${(xhr.loaded / xhr.total) * 100}%`);
  },
  (error) => {
    console.error(error);
  }
);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  // renderer.setSize(window.innerWidth, window.innerHeight);
});
function onDocumentMouseMove(event) {
  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;
}
function animate() {
  requestAnimationFrame(animate);
  //camera.position.x += (mouseX - camera.position.x) * 0.5;
  //camera.position.y += (-mouseY - camera.position.y) * 0.05;

  globalModel.rotateY(mouseX * 0.000015);
  camera.lookAt(scene.position);
  renderer.render(scene, camera);
}

animate();
