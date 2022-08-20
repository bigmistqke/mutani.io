import { Link, Transition } from "../libs/router/Router";

export default function (props) {
  return (
    <>
      <For each={props.projects}>
        {(project) => (
          <Transition
            animate={{ x: 100, transition: { duration: 0.2 } }}
            exit={{ x: -100, transition: { duration: 1 } }}
            visible={props.visible}
            class="absolute top-0"
          >
            <Link href={`/projects/${project.name}`}>{project.name}</Link>
          </Transition>
        )}
      </For>
    </>
  );
}
