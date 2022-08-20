export default function (el, value) {
  const { setPointer, dirty } = value();

  el.addEventListener("mousemove", (e) => {
    setPointer((pointer) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = - (e.clientY / window.innerHeight) * 2 + 1;
      return pointer;
    })
    dirty();
  });
}