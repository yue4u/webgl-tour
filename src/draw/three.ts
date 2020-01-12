import * as THREE from "three";

export default async function() {
  const canvas = document.getElementById("three") as HTMLCanvasElement;
  if (!canvas) return;

  let { clientWidth: width, clientHeight: height } = canvas;

  // renderer
  let renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true
  });
  renderer.setClearColor(0xffffff);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  // camera

  let camera = new THREE.PerspectiveCamera(70, width / height, 1, 1000);
  camera.position.z = -100;
  camera.position.x = -50;
  camera.position.y = -10;

  const TrackballControls = (await import("three-trackballcontrols")).default;

  // controls
  let controls = new TrackballControls(camera);
  controls.addEventListener("change", render);

  // scene

  let scene = new THREE.Scene();

  // lights
  const light1 = new THREE.AmbientLight(0xffffff, 0.5);
  const light2 = new THREE.DirectionalLight(0xffffff);

  light2.position.set(0, 100, -50);

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
    let distance = 30;
    let offset = 30;

    arr(10).forEach(i =>
      arr(10).forEach(j => {
        let geometry = new THREE.BoxGeometry(10, random(5, 100), 10);
        let color = new THREE.Color(`hsl(${random(1, 255)}, 50%, 50%)`);

        let material = new THREE.MeshLambertMaterial({ color });

        let mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = distance * i + offset;
        mesh.position.z = distance * j + offset;
        scene.add(mesh);
      })
    );
  }

  function arr(len: number) {
    return [...new Array(len).keys()];
  }
  function random(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }
}
