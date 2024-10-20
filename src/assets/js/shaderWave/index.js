import * as THREE from "three";
import waterVertexShader from "./shader/water/vertex.glsl";
import waterFragmentShader from "./shader/water/fragment.glsl";

const globalInfo = {
  canvas: document.querySelector("#canvas"),
  width: innerWidth,
  height: innerHeight,
};

// scene
const scene = new THREE.Scene();

// camera
const camera = new THREE.PerspectiveCamera(75, globalInfo.width / globalInfo.height, 0.1, 1000);
camera.position.x = -1.75;
camera.position.y = 1.15;
camera.position.z = 1.5;
camera.lookAt(new THREE.Vector3(0));
scene.add(camera);

// renderer
const renderer = new THREE.WebGLRenderer({
  canvas: globalInfo.canvas,
});
renderer.setSize(globalInfo.width, globalInfo.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const geo = new THREE.PlaneGeometry(2, 2, 128, 128);
const mate = new THREE.ShaderMaterial({
  vertexShader: waterVertexShader,
  fragmentShader: waterFragmentShader,
  uniforms: {
    uTime: { value: 0 },
    uBigWavesElevation: {
      value: 0.2,
    },
    uBigWavesFrequency: { value: new THREE.Vector2(4, 1.5) },
    uBigWavesSpeed: { value: 2 },
  },
  side: THREE.DoubleSide,
  // wireframe: true,
});
const mesh = new THREE.Mesh(geo, mate);
mesh.rotation.x = -Math.PI * 0.5;
scene.add(mesh);

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  mate.uniforms.uTime.value = elapsedTime;

  renderer.render(scene, camera);

  requestAnimationFrame(tick);
};

tick();
