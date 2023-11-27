window.onload = function () {
  var img = document.querySelector("#turbulence");
  var frames = 0;
  var rad = Math.PI / 180;

  function animateBaseFrequency() {
    var bfx = 0.01;
    var bfy = 0.1;

    frames += 0.025;
    bfx += 0.001 * Math.cos(frames * rad);
    bfy += 0.005 * Math.sin(frames * rad);

    var bf = bfx.toString() + " " + bfy.toString();
    img.setAttributeNS(null, "baseFrequency", bf);

    window.requestAnimationFrame(animateBaseFrequency);
  }

  window.requestAnimationFrame(animateBaseFrequency);
};
