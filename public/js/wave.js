class WaveDistortion {
  constructor(imgSrc) {
    this.canvas = null;
    this.gl = null;
    this.attributes = {};
    this.uniforms = {};
    this.speed = 0;
    this.setSpeed(0.00001);
    this.time = 0;
    this.loadImage(imgSrc, this.init.bind(this));
  }

  init(img) {
    this.initWebGL();
    const program = this.createProgram("vs", "fs");
    if (!program) return;

    const position = [];
    const numSegments = 30;
    const radius = 1;
    for (let i = 0; i < numSegments; i++) {
      const theta = (i / numSegments) * Math.PI * 2;
      const x = Math.cos(theta) * radius;
      const y = Math.sin(theta) * radius;
      position.push(x, y, 0);
    }
    const positionCount = position.length / 3;

    this.createAttribute(
      {
        position: {
          stride: 3,
          value: position,
        },
      },
      program
    );

    this.setAttribute("position");

    this.createUniform(
      {
        time: {
          type: "1f",
        },
        texture: {
          type: "1i",
        },
      },
      program
    );

    this.setImg(img);
    this.gl.lineWidth(0);

    this.start(
      (time) => {
        this.time = time;
        this.setUniform("time", time / this.speed);
      },
      "TRIANGLE_STRIP",
      positionCount
    );
  }

  initWebGL() {
    this.canvas = document.createElement("canvas");
    this.gl = this.canvas.getContext("webgl");
    document.body.appendChild(this.canvas);
  }

  setSpeed(speed) {
    speed = speed <= 0 ? 0.00000001 : speed;
    speed = 100 / speed;
    this.speed = speed;
  }

  setImg(img) {
    console.log(img);
    this.createTexture(img);
    this.setUniform("texture", 0);
    this.clearColor(0, 0, 0, 1);
    this.initSize(img.width, img.height);
  }

  createShader(id) {
    const scriptElement = document.getElementById(id);
    const shader = (() => {
      switch (scriptElement.type) {
        case "x-shader/x-vertex":
          return this.gl.createShader(this.gl.VERTEX_SHADER);
        case "x-shader/x-fragment":
          return this.gl.createShader(this.gl.FRAGMENT_SHADER);
        default:
          return;
      }
    })();

    this.gl.shaderSource(shader, scriptElement.textContent);
    this.gl.compileShader(shader);

    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      console.error(this.gl.getShaderInfoLog(shader));
      return;
    }

    return shader;
  }

  createProgram(vsId, fsId) {
    const program = this.gl.createProgram();
    this.gl.attachShader(program, this.createShader(vsId));
    this.gl.attachShader(program, this.createShader(fsId));
    this.gl.linkProgram(program);

    if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
      console.error(this.gl.getProgramInfoLog(program));
      return;
    }

    this.gl.useProgram(program);
    return program;
  }

  createAttribute(data, program) {
    Object.keys(data).forEach((key) => {
      const { stride, value } = data[key];
      this.attributes[key] = {
        location: this.gl.getAttribLocation(program, key),
        stride,
        vbo: this.createVbo(value),
      };
    });
  }

  createVbo(data) {
    const vbo = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vbo);
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array(data),
      this.gl.STATIC_DRAW
    );
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
    return vbo;
  }

  setAttribute(name) {
    const { vbo, location, stride } = this.attributes[name];

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vbo);
    this.gl.enableVertexAttribArray(location);
    this.gl.vertexAttribPointer(location, stride, this.gl.FLOAT, false, 0, 0);
  }

  createUniform(data, program) {
    Object.keys(data).forEach((key) => {
      const uniform = data[key];
      this.uniforms[key] = {
        location: this.gl.getUniformLocation(program, key),
        type: `uniform${uniform.type}`,
      };
    });
  }

  setUniform(name, value) {
    const uniform = this.uniforms[name];
    if (!uniform) return;

    this.gl[uniform.type](uniform.location, value);
  }

  bindTexture(texture) {
    this.gl.activeTexture(this.gl.TEXTURE0);
    this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
    this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_WRAP_S,
      this.gl.CLAMP_TO_EDGE
    );
    this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_WRAP_T,
      this.gl.CLAMP_TO_EDGE
    );
  }

  createTexture(img) {
    const texture = this.gl.createTexture();
    this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
    this.gl.texImage2D(
      this.gl.TEXTURE_2D,
      0,
      this.gl.RGBA,
      this.gl.RGBA,
      this.gl.UNSIGNED_BYTE,
      img
    );
    this.gl.generateMipmap(this.gl.TEXTURE_2D);
    this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_MIN_FILTER,
      this.gl.LINEAR
    );
    this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_MAG_FILTER,
      this.gl.LINEAR
    );
    this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_WRAP_S,
      this.gl.CLAMP_TO_EDGE
    );
    this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_WRAP_T,
      this.gl.CLAMP_TO_EDGE
    );
    this.gl.bindTexture(this.gl.TEXTURE_2D, null);

    this.gl.activeTexture(this.gl.TEXTURE0);
    this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
  }

  clearColor(...args) {
    this.gl.clearColor(...args);
  }

  loadImage(src, callback) {
    const img = new Image();
    img.addEventListener("load", () => {
      callback(img);
    });
    img.crossOrigin = "anonymous";
    img.src = src;
  }

  setSize(width = window.innerWidth, height = window.innerHeight) {
    const windowRatio = window.innerWidth / window.innerHeight;
    const imgRatio = width / height;

    if (imgRatio >= windowRatio) {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerWidth / imgRatio;
    } else {
      this.canvas.height = window.innerHeight;
      this.canvas.width = window.innerHeight * imgRatio;
    }

    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);

    this.setUniform("resolution", [this.canvas.width, this.canvas.height]);
  }

  initSize(width, height) {
    this.setSize(width, height);
    window.addEventListener("resize", () => {
      this.setSize(width, height);
    });
  }

  start(draw, mode, count) {
    let that = this;
    function render(time) {
      that.gl.clear(that.gl.COLOR_BUFFER_BIT | that.gl.DEPTH_BUFFER_BIT);
      draw(time);
      that.gl.drawArrays(that.gl[mode], 0, count);
      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
  }
}

const effect = new WaveDistortion("/pictures/immeuble/embc1.webp");

effect.setSpeed(0.5);

effect.start(
  (time) => {
    effect.time = time;
    effect.setUniform("time", time / effect.speed);
  },
  "LINE_LOOP",
  positionCount
);
