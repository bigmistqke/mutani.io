import s from "./Frame.module.css";
import { createEffect, createSignal } from "solid-js";
export default function (props) {
  let [hidden, setHidden] = createSignal(props.visible);
  let timeout;

  createEffect(() => {
    if (timeout) clearTimeout(timeout);
    if (!props.visible) {
      timeout = setTimeout(() => {
        if (props.visible) return;
        setHidden(true);
      }, props.delay || 1000);
    } else {
      setHidden(false);
    }
  });

  return (
    <div
      class={`${s.frame} ${props.class ? props.class : ""}`}
      style={{
        ...props.style,
        "z-index": props.visible ? 10 : 0,
        display: hidden() ? "none" : "",
      }}
    >
      {props.children}
    </div>
  );
}
