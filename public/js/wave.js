var img = document.querySelector("#displacementFilter feTurbulence");
var frames = 0;
var rad = Math.PI / 180;

function AnimateBaseFrequency() {
  bfx = 0.01;
  bfy = 0.01;
  frames += 0.3;
  bfx += 0.03 * Math.cos(frames * rad);
  bfy += 0.03 * Math.cos(frames * rad);

  bf = bfx.toString() + " " + bfy.toString();
  img.setAttributeNS(null, "baseFrequency", bf);

  window.requestAnimationFrame(AnimateBaseFrequency);
}

window.requestAnimationFrame(AnimateBaseFrequency);
