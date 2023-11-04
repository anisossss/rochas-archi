let sketch = new Sketch({
  duration: 1.5,
  debug: false,
  easing: "easeIn",
  uniforms: {
    width: { value: 0.5, type: "f", min: 0, max: 10 },
  },
  fragment: `
		uniform float time;
		uniform float progress;
		uniform sampler2D texture1;
		uniform sampler2D texture2;
		uniform vec4 resolution;

		varying vec2 vUv;
		varying vec4 vPosition;


		void main()	{
			vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);
			vec2 p = vec2(vUv.x, newUV.y);
			float x = progress;
x = smoothstep(.0, 1.0, (x * 2.0 + p.x - 1.0));
			vec4 f = mix(
				texture2D(texture1, (p-.5)*(1.-x)+.5), 
				texture2D(texture2, (p-.5)*x+.5), 
				x);
			gl_FragColor = f;
		}
	`,
});
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");
const slider = document.getElementById("slider");
let currentImageIndex = 0;
const images = [
  "/pictures/salon2.jpg",
  "/pictures/chambre_coucher3.jpg",
  "/pictures/salon.jpg",
  "/pictures/chambre_coucher1.jpg",
  "/pictures/salon_vue1.jpg",
  "/pictures/salon_vue3.jpg",
];

// Function to update the displayed image
function updateImage() {
  slider.style.backgroundImage = `url(${images[currentImageIndex]})`;
}

// Event listener for the previous button
prevButton.addEventListener("click", () => {
  currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
  updateImage();
});

// Event listener for the next button
nextButton.addEventListener("click", () => {
  currentImageIndex = (currentImageIndex + 1) % images.length;
  updateImage();
});

// Initialize the image
updateImage();
