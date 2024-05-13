import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
window.addEventListener("DOMContentLoaded", function () {
  const canvasContainer = document.getElementById("wooden-chip");
  const cameraFOV = 1; // Scene camera FOV in degrees
  const scene = new THREE.Scene();

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setSize(window.innerWidth / 3, window.innerHeight / 1.25);

  canvasContainer.appendChild(renderer.domElement);

  function getCamera() {
    const camera = new THREE.PerspectiveCamera(
      cameraFOV,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.set(0, 0, 0);
    return camera;
  }

  function loadModel() {
    var loader = new GLTFLoader().setPath("models/chipa/");
    loader.load("scene.gltf", function (gltf) {
      const model = gltf.scene;
      model.position.set(0, 0, -50);
      model.rotateX(55);

      scene.add(model);
    });
  }
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  var camera = getCamera();
  loadModel();
  animate();
});
