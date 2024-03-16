import * as THREE from "three";

const renderer = new THREE.WebGL1Renderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(0, 2, 5);
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({ color: "green" });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

function animate() {
  box.rotation.x += 0.01;
  box.rotation.y = 0.01;
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
