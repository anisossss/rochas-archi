class Sketch {
  constructor(opts) {
    this.scene = new THREE.Scene();
    this.vertex = `varying vec2 vUv;void main() {vUv = uv;gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );}`;
    this.fragment = opts.fragment;
    this.uniforms = opts.uniforms;
    this.renderer = new THREE.WebGLRenderer();
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.duration = opts.duration || 1;
    this.debug = opts.debug || false;
    this.easing = opts.easing || "easeInOut";
    // this.clicker = document.getElementById("scroller");
    this.container = document.getElementById("slider");
    this.images = JSON.parse(this.container.getAttribute("data-images"));
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.container.appendChild(this.renderer.domElement);
    this.container.children[0].classList.add(
      "w-full",
      "h-full",
      "object-cover",
      "object-center"
    );
    this.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.001,
      1000
    );

    this.camera.position.set(0, 0, 2);
    this.time = 0;
    this.current = 0;
    this.textures = [];

    this.paused = true;
    this.initiate(() => {
      this.setupResize();
      this.settings();
      this.addObjects();
      this.resize();
      // this.clickEvent();
      this.play();
    });
  }

  initiate(cb) {
    const promises = [];
    let that = this;
    this.images.forEach((url, i) => {
      let promise = new Promise((resolve) => {
        that.textures[i] = new THREE.TextureLoader().load(url, resolve);
        that.textures[i].generateMipmaps = false;
        that.textures[i].minFilter = THREE.LinearFilter;
        that.textures[i].needsUpdate = true;
      });
      promises.push(promise);
    });

    Promise.all(promises).then(() => {
      cb();
    });
  }

  clickEvent() {
    this.clicker.addEventListener("click", () => {
      this.next();
    });
  }
  settings() {
    this.settings = { progress: 0.5 };
  }

  setupResize() {
    window.addEventListener("resize", this.resize.bind(this));
  }

  resize() {
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = this.width / this.height;

    // image cover
    this.imageAspect =
      this.textures[0].image.height / this.textures[0].image.width;
    let a1;
    let a2;
    if (this.height / this.width > this.imageAspect) {
      a1 = (this.width / this.height) * this.imageAspect;
      a2 = 1;
    } else {
      a1 = 1;
      a2 = this.height / this.width / this.imageAspect;
    }

    this.material.uniforms.resolution.value.x = this.width;
    this.material.uniforms.resolution.value.y = this.height;
    this.material.uniforms.resolution.value.z = a1;
    this.material.uniforms.resolution.value.w = a2;

    const dist = this.camera.position.z;
    const height = 1;
    this.camera.fov = 2 * (180 / Math.PI) * Math.atan(height / (2 * dist));
    this.plane.scale.x = this.camera.aspect;
    this.plane.scale.y = 1;

    this.camera.updateProjectionMatrix();
  }

  addObjects() {
    this.material = new THREE.ShaderMaterial({
      extensions: {
        derivatives: "#extension GL_OES_standard_derivatives : enable",
      },
      side: THREE.DoubleSide,
      uniforms: {
        time: { type: "f", value: 0 },
        progress: { type: "f", value: 0 },
        border: { type: "f", value: 0 },
        intensity: { type: "f", value: 0 },
        scale: { type: "f", value: 40 },
        scaleX: { type: "f", value: 40 },
        scaleY: { type: "f", value: 40 },
        seed: { type: "f", value: 0 },
        smoothness: { type: "f", value: 0 },
        transition: { type: "f", value: 40 },
        swipe: { type: "f", value: 0 },
        width: { type: "f", value: 0 },
        radius: { type: "f", value: 0 },
        texture1: { type: "f", value: this.textures[0] },
        texture2: { type: "f", value: this.textures[1] },
        resolution: { type: "v4", value: new THREE.Vector4() },
      },
      vertexShader: this.vertex,
      fragmentShader: this.fragment,
    });

    this.geometry = new THREE.PlaneGeometry(1, 1, 2, 2);
    this.plane = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.plane);
  }

  stop() {
    this.paused = true;
  }
  play() {
    this.paused = false;
    this.render();

    // Initialize progress bar direction and transition duration
    let isForward = true;
    let transitionDuration = 4;

    // Function to animate the progress bar
    const animateProgressBar = (isForward) => {
      transitionDuration = isForward ? 4 : 0.2;
      const progressElement = document.getElementById("progress");
      progressElement.style.transition = `width ${transitionDuration}s linear`;
      progressElement.style.width = isForward ? "100%" : "0%";
    };

    // this interval to cause the bar to reload to start value without delay
    setInterval(() => {
      if (!isForward) {
        const progressElement = document.getElementById("progress");
        progressElement.style.transition = "ease-in-out 4s";
        progressElement.style.width = "0%";
      }
    }, transitionDuration * 100);

    // Initial call to animateProgressBar to animate the progress bar forward
    animateProgressBar(isForward);

    this.interval = setInterval(() => {
      this.next();

      // Swap direction and reset progress bar every transition
      isForward = !isForward;

      const progressElement = document.getElementById("progress");
      progressElement.style.width = isForward ? "0%" : "100%";

      setTimeout(() => {
        animateProgressBar(isForward);
      }, 20);
    }, 4000);
  }

  stop() {
    this.paused = true;

    // Stops the image rotation
    clearInterval(this.interval);
  }
  prev() {
    if (this.isRunning) return;
    this.isRunning = true;
    let len = this.textures.length;
    let prevTexture = this.textures[(this.current - 1 + len) % len];
    this.material.uniforms.texture2.value = prevTexture;
    let tl = new TimelineMax();
    tl.to(this.material.uniforms.progress, this.duration, {
      value: 1,
      ease: Power2[this.easing],
      onComplete: () => {
        this.current = (this.current - 1 + len) % len;
        this.material.uniforms.texture1.value = prevTexture;
        this.material.uniforms.progress.value = 0;
        this.isRunning = false;
      },
    });
  }
  next() {
    if (this.isRunning) return;
    this.isRunning = true;
    let len = this.textures.length;
    let nextTexture = this.textures[(this.current + 1) % len];
    let sliderNav = document.getElementById("slider-nav");
    sliderNav.dataset.current = this.current + 1;

    // update slider counter
    document.getElementById("current-slider").textContent = (
      "0" +
      (this.current + 1)
    ).slice(-2);

    this.material.uniforms.texture2.value = nextTexture;
    let tl = new TimelineMax();
    tl.to(this.material.uniforms.progress, this.duration, {
      value: 1,
      ease: Power2[this.easing],
      onComplete: () => {
        this.current = (this.current + 1) % len;
        this.material.uniforms.texture1.value = nextTexture;
        this.material.uniforms.progress.value = 0;
        this.isRunning = false;
      },
    });
  }

  render() {
    if (this.paused) return;
    this.time += 0.05;
    this.material.uniforms.time.value = this.time;

    Object.keys(this.uniforms).forEach((item) => {
      this.material.uniforms[item].value = this.settings[item];
    });

    requestAnimationFrame(this.render.bind(this));
    this.renderer.render(this.scene, this.camera);
  }
}
