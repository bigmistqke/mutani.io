import lerp from "./lerp";


export default function wheel(el, value) {
  const { scrollTop, setScrollTop } = value();
  let isWheeling;

  const loop = () => {
    if (!isWheeling) return;
    let lerped = scrollTop()
      ? lerp(scrollTop(), el.scrollTop, 0.05)
      : el.scrollTop;

    if (scrollTop() && Math.abs(el.scrollTop - lerped) < 1) {
      isWheeling = false
    } else {
      setScrollTop(lerped);
      requestAnimationFrame(loop);
    }
  };

  el.addEventListener("wheel", (e) => {
    if (isWheeling) return;
    isWheeling = true;
    loop();
  });
}