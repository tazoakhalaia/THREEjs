import * as THREE from "three";
import * as dat from "dat.gui";
import { Mesh } from "three";
import { GridHelper } from "three";
import { MeshStandardMaterial } from "three";
import { SphereGeometry } from "three";
import { PlaneGeometry } from "three";
import { BoxGeometry } from "three";
import { MeshBasicMaterial } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { AmbientLight } from "three";

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

const orbit = new OrbitControls(camera, renderer.domElement);
const gui = new dat.GUI();
const ambientLight = new AmbientLight(0x333333)
scene.add(ambientLight)

camera.position.set(-10, 30, 30);
orbit.update();
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const boxGeometry = new BoxGeometry();
const boxMaterial = new MeshBasicMaterial({
  color: "green",
});
const box = new Mesh(boxGeometry, boxMaterial);
scene.add(box);

const gridHelper = new GridHelper(30);
scene.add(gridHelper);

const planeGeometry = new PlaneGeometry(30, 30);
const planeMaterial = new MeshStandardMaterial({
  color: "white",
  side: THREE.DoubleSide,
});
const plane = new Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -0.5 * Math.PI;
scene.add(plane);

const sphereGeometry = new SphereGeometry(4, 50, 50);
const sphereMaterial = new MeshStandardMaterial({
  color: "blue",
  wireframe: false,
});
const sphere = new Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);

sphere.position.set(-10, 10, 0);

const options = {
  sphereColor: "#ffea00",
  wireframe: false,
  speed: 0.01

};

gui.addColor(options, "sphereColor").onChange(function (e) {
  sphere.material.color.set(e);
});
gui.add(options, "wireframe").onChange(function (e) {
  sphere.material.wireframe = e;
});

gui.add(options, 'speed', 0, 0.1)

let step = 0;

function animate() {
  box.rotation.x += 0.01;
  box.rotation.y = 0.01;

  step += options.speed;
  sphere.position.y = 10 * Math.abs(Math.sin(step));
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
