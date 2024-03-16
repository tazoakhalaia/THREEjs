import * as THREE from "three";
import { Mesh } from "three";
import { GridHelper } from "three";
import { PlaneGeometry } from "three";
import { BoxGeometry } from "three";
import { MeshBasicMaterial } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

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

const orbit = new OrbitControls(camera,renderer.domElement);

camera.position.set(-10, 30, 30);
orbit.update()
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const boxGeometry = new BoxGeometry();
const boxMaterial = new MeshBasicMaterial({ color: "green" });
const box = new Mesh(boxGeometry, boxMaterial);
scene.add(box);

const gridHelper = new GridHelper()
scene.add(gridHelper)

const planeGeometry = new PlaneGeometry(30,30)
const planeMaterial = new MeshBasicMaterial({color:'white'})
const plane = new Mesh(planeGeometry,planeMaterial)
scene.add(plane)

function animate() {
  box.rotation.x += 0.01;
  box.rotation.y = 0.01;
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
