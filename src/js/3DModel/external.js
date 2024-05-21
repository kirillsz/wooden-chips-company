import {
  WebGLRenderer,
  RepeatWrapping,
  TextureLoader,
  MeshStandardMaterial,
  Scene,
  PerspectiveCamera,
  PointLight,
} from "three";
import { OBJLoader } from "three/examples/jsm/Addons.js";

const CAMERA_DISTANCE = 550;
const CAMERA_FOV = 5;

let rotationSlowCoefficient = 0.05;

let rendererSizeW = window.innerWidth;
let rendererSizeH = rendererSizeW;

let targetRotation = 0;
let targetRotationOnPointerDown = 0;

let pointerX = 0;
let pointerXOnPointerDown = 0;

let windowHalfX = window.innerWidth / 2;

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
const renderer = new WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(rendererSizeW, rendererSizeH);
renderer.setPixelRatio(window.devicePixelRatio);

const color = new TextureLoader().load(
  "models/chipa/textures/chip-texture_COLOR.png"
);
color.wrapS = color.wrapT = RepeatWrapping;
color.repeat.set(9, 7);
const bump = new TextureLoader().load(
  "models/chipa/textures/Текстура щепы_DISP.png"
);
bump.wrapS = RepeatWrapping;
bump.wrapT = RepeatWrapping;
bump.repeat.set(12, 7);
//bump.offset.set(0, 0.1);
const ao = new TextureLoader().load(
  "models/chipa/textures/Текстура щепы_OCC.png"
);
ao.wrapS = RepeatWrapping;
ao.wrapT = RepeatWrapping;
ao.repeat.set(12, 7);
//ao.offset.set(0, 0.1);
const material = new MeshStandardMaterial({
  map: color,
  aoMap: ao,
  aoMapIntensity: 1,
  bumpMap: bump,
});

const canvas = document.getElementById("wooden-chip");
canvas.appendChild(renderer.domElement);
renderer.domElement.classList.add("advantages__3d__model");
canvas.addEventListener("pointerdown", onPointerDown);

const scene = new Scene();

const camera = new PerspectiveCamera(CAMERA_FOV, 1, 1, 750);
camera.position.set(4, 5, CAMERA_DISTANCE);

const fillLight = new PointLight(0xf2f8ff, 11000, 0, 1.55);
fillLight.position.set(250, -200, 400);
scene.add(fillLight);

const keyLight = new PointLight(0xfffbf2, 700, 0, 1.45);
keyLight.position.set(-15, 5, 50);
scene.add(keyLight);

const backLight = new PointLight(0xf2f8ff, 9000, 0, 1.45);
backLight.position.set(-200, 180, -70);
scene.add(backLight);

var globalModel;
const loader = new OBJLoader().setPath("models/");
loader.load("shepa_2.5.obj", (model) => {
  globalModel = model;
  globalModel.scale.set(2, 1.65, 2);
  globalModel.position.set(4, 4.25, 0);
  globalModel.traverse((child) => {
    if (child.isMesh) {
      child.material = material;
    }
  });
  scene.add(globalModel); // Добавить модель на сцену
});

function onPointerDown(event) {
  if (event.isPrimary === false) return;

  event.preventDefault();

  renderer.domElement.classList.add("is_dragging");
  document.body.classList.add("is_dragging");

  pointerXOnPointerDown = event.clientX - windowHalfX;
  targetRotationOnPointerDown = targetRotation;

  document.addEventListener("pointermove", onPointerMove);
  document.addEventListener("pointerup", onPointerUp);
}

function onPointerMove(event) {
  if (event.isPrimary === false) return;

  event.preventDefault();

  pointerX = event.clientX - windowHalfX;

  targetRotation =
    targetRotationOnPointerDown + (pointerX - pointerXOnPointerDown) * 0.02;
}

function onPointerUp() {
  if (event.isPrimary === false) return;

  renderer.domElement.classList.remove("is_dragging");
  document.body.classList.remove("is_dragging");

  document.removeEventListener("pointermove", onPointerMove);
  document.removeEventListener("pointerup", onPointerUp);
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

animate();

function render() {
  if (globalModel) {
    globalModel.rotation.y +=
      (targetRotation - globalModel.rotation.y) * rotationSlowCoefficient;
  }
  renderer.render(scene, camera);
}
window.addEventListener("resize", () => {
  function onResize() {
    camera.updateProjectionMatrix();

    //your other stuff ...
    renderer.setPixelRatio(window.devicePixelRatio);
  }
});
