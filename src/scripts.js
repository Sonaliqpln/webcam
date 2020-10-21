import {
  Scene,
  Color,
  PerspectiveCamera,
  AmbientLight,
  DirectionalLight,
  PointLight,
  WebGLRenderer,
} from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export var scene, camera, render;
export var renderer;
const canvas = document.querySelector("#c");

var loader = new GLTFLoader().setPath("../3d-obj-loader/assets/");

window.addEventListener("resize", function () {
  var width = window.innerWidth;
  var height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

function init() {
  scene = new Scene();
  scene.background = new Color(0xdddddd);
  scene.background = null;

  camera = new PerspectiveCamera(
    40,
    window.innerWidth / window.innerHeight,
    1,
    5000
  );
  camera.rotation.y = (45 / 180) * Math.PI;
  camera.position.x = 800;
  camera.position.y = 100;
  camera.position.z = 1000;

  let hlight = new AmbientLight(0x404040, 100);
  scene.add(hlight);

  let directionalLight = new DirectionalLight(0xffffff, 100);
  directionalLight.position.set(0, 1, 0);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  let light = new PointLight(0xc4c4cc4, 10);
  light.position.set(0, 300, 500);
  scene.add(light);

  let light2 = new PointLight(0xc4c4cc4, 10);
  light.position.set(500, 100, 0);
  scene.add(light2);

  let light3 = new PointLight(0xc4c4cc4, 10);
  light.position.set(0, 100, -500);
  scene.add(light3);

  let light4 = new PointLight(0xc4c4cc4, 10);
  light.position.set(-5000, 300, 0);
  scene.add(light4);

  renderer = new WebGLRenderer({ canvas, alpha: true });
  var width = window.innerWidth; //1024; //640;
  var height = window.innerHeight; //768; //480;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);

  let controls = new OrbitControls(camera, renderer.domElement);

  loader.load("scene.gltf", function (gltf) {
    let car = gltf.scene.children[0];
    console.log("init -> gltf", gltf);
    car.scale.set(0.5, 0.5, 0.5);
    scene.add(gltf.scene);
    animate();
  });

  function render() {
    renderer.render(scene, camera);
  }
}

function animate() {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

init();
