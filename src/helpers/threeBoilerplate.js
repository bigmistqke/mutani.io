import * as THREE from "three";
import { createSignal } from "solid-js"

const [isDirty, setIsDirty] = createSignal();
let timeout;

export const dirty = () => {
  setIsDirty(true);
  if (timeout) clearTimeout(timeout);
  timeout = setTimeout(() => setIsDirty(false), 5)
}

export const initScene = (canvas) => {
  const width = canvas.parentElement.clientWidth;
  const height = canvas.parentElement.clientHeight;

  const scene = new THREE.Scene();

  const aspectRatio = width / height;
  const fieldOfView = 50;
  const nearPlane = 0.1;
  const farPlane = 10000;
  const camera = new THREE.PerspectiveCamera(
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane
  );
  camera.position.set(0, 0, 50);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  renderer.setClearAlpha(0);

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const light = new THREE.PointLight("lightgrey");
  light.position.set(50, 0, 30);
  scene.add(light);

  /*   const ambient = new THREE.AmbientLight("lightgrey");
    scene.add(ambient); */

  window.addEventListener("resize", () => {
    const width = canvas.parentElement.clientWidth;
    const height = canvas.parentElement.clientHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    dirty();
  });

  return { scene, renderer, camera };
};

export const initRender = ({ scene, renderer, camera }, callback) => {
  const render = () => {
    if (isDirty()) {
      // console.log('render');
      renderer.render(scene, camera);
      if (typeof callback === 'function')
        callback()
    }
    requestAnimationFrame(render);
  };
  dirty();
  render();
};

