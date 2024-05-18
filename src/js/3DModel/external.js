import * as THREE from "three";
import { OBJLoader, OrbitControls } from "three/examples/jsm/Addons.js";

const CAMERA_DISTANCE = 550;
const CAMERA_FOV = 5;

let rendererSizeW = window.innerWidth;
let rendererSizeH = rendererSizeW;

desktop();
function desktop() {
  const mql = window.matchMedia("screen and (min-width: 1280px)");

  checkMedia(mql);
  mql.addEventListener("change", checkMedia);

  function checkMedia(mql) {
    if (mql.matches) {
      rendererSizeW = 523;
      rendererSizeH = 705;
    }
  }
}

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(rendererSizeW, rendererSizeH);
renderer.setPixelRatio(window.devicePixelRatio);

const color = new THREE.TextureLoader().load(
  "models/chipa/textures/chip-texture_COLOR.png"
);
color.wrapS = THREE.RepeatWrapping;
color.wrapT = THREE.RepeatWrapping;
color.repeat.set(200, 133);
color.offset.set(0, -0.2);
const bump = new THREE.TextureLoader().load(
  "models/chipa/textures/Текстура щепы_DISP.png"
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

const canvas = document.getElementById("wooden-chip");
canvas.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(CAMERA_FOV, 1, 1, 1000);
camera.position.set(4, 5, CAMERA_DISTANCE);

const fillLight = new THREE.PointLight(0xf2f8ff, 13000, 0, 1.45);
fillLight.position.set(250, -200, 400);
scene.add(fillLight);

const keyLight = new THREE.PointLight(0xfffbf2, 700, 0, 1.45);
keyLight.position.set(-15, 5, 50);
scene.add(keyLight);

const backLight = new THREE.PointLight(0xf2f8ff, 9000, 0, 1.45);
backLight.position.set(-200, 180, -70);
scene.add(backLight);

var globalModel;
const loader = new OBJLoader().setPath("models/");
loader.load(
  "chipa2_3.obj",
  (model) => {
    globalModel = model;
    globalModel.scale.set(2, 1.65, 2);
    globalModel.position.set(4, 4.25, 0);
    globalModel.traverse((child) => {
      if (child.isMesh) {
        child.material = material;
      }
    });
    scene.add(globalModel); // Добавить модель на сцену
  },
  (xhr) => {},
  (error) => {}
);

/* Mouse track */

let mouseX;
let mouseY;

let targetX;
let targetY;

// const windowHalfX = canvas.clientWidth / 2;
// const windowHalfY = canvas.clientHeight / 2;
// let targetRotation = new THREE.Vector2();
// let currentRotation = new THREE.Vector2();
// let rotationSpeed = 0.001;
// var prevStateX;
// var prevStateY;

window.addEventListener("resize", () => {
  function onResize() {
    camera.updateProjectionMatrix();

    //your other stuff ...
    renderer.setPixelRatio(window.devicePixelRatio);
  }
});
function animate() {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();
