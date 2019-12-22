import * as THREE from "three";
import TrackballControls from "three-trackballcontrols";

export default function() {
  const canvas = document.getElementById("three") as HTMLCanvasElement;
  if (!canvas) return;

  let { clientWidth: width, clientHeight: height } = canvas;

  // renderer
  let renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true
  });
  renderer.setClearColor(0x111111);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  // camera

  let camera = new THREE.PerspectiveCamera(70, width / height, 1, 1000);
  camera.position.z = 100;

  // controls
  let controls = new TrackballControls(camera);
  controls.addEventListener("change", render);

  // scene

  let scene = new THREE.Scene();

  // lights
  const light1 = new THREE.AmbientLight(0xffffff, 0.5);
  const light2 = new THREE.DirectionalLight(0xffffff);

  light2.position.set(1, 1, 1);

  scene.add(light1);
  scene.add(light2);

  // window resize

  window.addEventListener(
    "resize",
    () => {
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      controls.handleResize();
    },
    false
  );

  addShapes();
  animate();
  render();

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
  }

  function render() {
    renderer.render(scene, camera);
  }
  function addShapes() {
    let geometry = new THREE.BoxGeometry(10, 10, 10);
    let material = new THREE.MeshNormalMaterial();
    let mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
  }
}
