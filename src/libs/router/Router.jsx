import { Presence } from "@motionone/solid";
import { createSignal } from "solid-js";
import { Motion } from "@motionone/solid";

import s from "./Router.module.css";

import fals from "fals";
import { compare } from "../transforms/compare";

export const [path, setPath] = createSignal();

window.addEventListener("popstate", () =>
  setPath(window.location.pathname.slice(1).split("/"))
);

export const initRouter = () =>
  setPath(window.location.pathname.slice(1).split("/"));

const stringToPath = (string) => string.slice(1).split("/");

export const Route = (props) => (
  <Dynamic
    component={props.component}
    {...checkRoute(props.route)}
    {...props}
  />
);

export const checkRoute = (string) => {
  const parameters = {};

  const visible = compare(path(), stringToPath(string), (a, b) => {
    if (b.startsWith(":")) {
      parameters[b.slice(1)] = a;
      return true;
    }
    if (b === "*") {
      return true;
    }
    return a === b;
  });
  return { parameters, visible };
};

export const Transition = (props) => {
  return (
    <Presence exitBeforeEnter>
      <Show when={props.visible}>
        <Motion
          animate={props.animate}
          exit={props.exit}
          transition={props.transition}
          style={{ ...props.style }}
          class={`${s.transition} ${props.class || ""}`}
        >
          {props.children}
        </Motion>
      </Show>
    </Presence>
  );
};

export const Link = (props) => {
  const navigate = () => {
    if (fals(props.href)) return;
    if (path() && path().join("/") === props.href.slice(1)) return;
    setPath(props.href.slice(1).split("/"));
    history.pushState({}, null, props.href);
  };
  return (
    <button onClick={navigate} class={props.class} style={props.style}>
      {props.children}
    </button>
  );
};
