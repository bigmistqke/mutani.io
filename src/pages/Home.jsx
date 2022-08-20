import Frame from "../components/Frame";
import { Link, Transition } from "../libs/router/Router";

function Home(props) {
  return (
    <Frame visible={props.visible}>
      <div class="grid grid-cols-4 grid-flow-cols gap-4 h-full w-full">
        <For each={["/about", "/projects", "/network"]}>
          {(key) => {
            const angle = Math.random() * Math.PI * 2;

            return (
              <Transition
                animate={{
                  x: Math.sin(angle) * 100,
                  y: Math.cos(angle) * 100,
                  opacity: [0, 1],
                  transition: { duration: 0.2 },
                }}
                exit={{
                  x: Math.sin(angle) * -100,
                  y: Math.cos(angle) * -100,
                  opacity: [1, 0],
                  transition: { duration: 1 },
                }}
                style={{
                  "margin-left": Math.sin(angle) * -100 + "px",
                  "margin-top": Math.cos(angle) * -100 + "px",
                }}
                visible={props.visible}
              >
                <Link href={`${key}`}>{key}</Link>
              </Transition>
            );
          }}
        </For>
      </div>
    </Frame>
  );
}
export default Home;
