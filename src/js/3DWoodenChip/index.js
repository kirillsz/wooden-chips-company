import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
window.addEventListener("DOMContentLoaded", function () {
  const canvasContainer = document.getElementById("wooden-chip");
  const cameraFOV = 75; // Scene camera FOV in degrees
  const scene = new THREE.Scene();

  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(308, 328);
  canvasContainer.appendChild(renderer.domElement);

  function getCamera() {
    const camera = new THREE.PerspectiveCamera(
      cameraFOV,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 1);
    return camera;
  }
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  function loadModel() {
    var loader = new GLTFLoader();
    loader.load("models/wooden-chip.gltf", function (object) {
      const model = object.scene;

      scene.add(model);
    });
  }
  var camera = getCamera();
  loadModel();
  animate();
});
