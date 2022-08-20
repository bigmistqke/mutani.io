import { createEffect } from "solid-js";
import { Link, Transition } from "../libs/router/Router";
import Frame from "../components/Frame";
import s from "./Projects.module.css";
import { createSignal } from "solid-js";
import { onMount } from "solid-js";
import { dirty, initRender, initScene } from "../helpers/threeBoilerplate";
import * as THREE from "three";
import wheel from "../helpers/wheel";
import mousepointer from "../helpers/mousepointer";

export default function (props) {
  const [scrollTop, setScrollTop] = createSignal(0);
  const [hover, setHover] = createSignal();

  const [pointer, setPointer] = createSignal(new THREE.Vector2());

  let scroll, canvas, three;

  let init, carousel;

  const raycaster = new THREE.Raycaster();

  createEffect(() => {
    dirty();
    if (init || !props.projects || !canvas || !scroll) return;
    init = true;

    const three = initScene(canvas);
    const { scene, camera, renderer } = three;

    scroll.scrollTop = scroll.children[0].offsetHeight / 2;
    setScrollTop(scroll.scrollTop);

    carousel = makeCarousel(props.projects);
    scene.add(carousel);

    initRender({ scene, camera, renderer }, () => {
      carousel.children[0].children.forEach((plane) => {
        plane.lookAt(camera.position);
      });

      raycaster.setFromCamera(pointer(), camera);

      const intersects = raycaster.intersectObjects(scene.children);
      setHover(intersects[0]?.object.name);
    });

    dirty();
  });

  createEffect(() => {
    const offset = scrollTop() / 1000;
    if (!carousel || !scrollTop()) return;
    carousel.children[0].rotation.x = offset;
    dirty();
  });

  const fade = () => (!props.visible ? "opacity-0" : "opacity-100");

  return (
    <Frame visible={props.visible} route="projects">
      <canvas
        ref={canvas}
        class={`${fade()} absolute z-10 transition-opacity duration-250`}
      />
      <div
        class={`${fade()} w-full h-full transition-opacity z-0 duration-1000 bg-gradient-radial from-green-200 to-black `}
      />

      <Show when={hover()}>
        <div class="absolute skew-x-12  text-white drop-shadow-xl bottom-0 m-5 z-20 bg-white p-5 bg-gradient-to-b from-green-200  via-black to-green-200">
          {hover()}
        </div>
      </Show>

      <div
        ref={scroll}
        class="z-20 absolute h-full w-full overflow-y-auto overflow-x-hidden top-0"
        use:wheel={{ scrollTop, setScrollTop }}
        use:mousepointer={{ setPointer, dirty }}
      >
        <div style={{ height: "10000000px" }}></div>
      </div>
    </Frame>
  );
}

const animationProps = {
  animate: { opacity: [0, 1], transition: { duration: 0.2 } },
  exit: { opacity: [1, 0], transition: { duration: 1 } },
};

const makePlane = (url) => {
  const geometry = new THREE.PlaneGeometry(15, 15);
  const texture = new THREE.TextureLoader().load(url, dirty);
  const material = new THREE.MeshBasicMaterial({ map: texture });
  return new THREE.Mesh(geometry, material);
};

const makeCarousel = (projects) => {
  const carousel = new THREE.Group();
  for (let i = 0; i < 9; i++) {
    const project = projects[i % projects.length];
    const thumbnail = project.thumbnail.sizes.thumbnail.url;
    const plane = makePlane(thumbnail);
    plane.name = project.title;
    const offset = ((Math.PI * 2) / 9) * i;
    const ratio = 20;
    plane.position.z = Math.sin(offset) * ratio;
    plane.position.y = Math.cos(offset) * ratio;
    carousel.add(plane);
  }
  const container = new THREE.Mesh();
  container.rotation.y = -0.5;
  container.position.y = -10;
  container.position.x = 10;

  container.add(carousel);
  return container;
};
