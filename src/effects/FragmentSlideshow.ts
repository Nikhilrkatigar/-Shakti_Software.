import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import gsap from 'gsap';

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const horizontalBlurFragmentShader = `
varying vec2 vUv;
uniform sampler2D tDiffuse;
uniform vec2 uResolution;
uniform vec2 uDirection;
uniform float uStrength;

#define PI 3.141592653589793
#define SQRT2PI 2.50662827463

float gaussian(float x, float sigma) {
  return exp(-(x * x) / (2.0 * sigma * sigma)) / (SQRT2PI * sigma);
}

vec3 blur(vec2 uv, vec2 resolution, vec2 direction, float strength) {
  vec2 off1 = vec2(0.013846125, 0.013846125) * direction * strength;
  vec2 off2 = vec2(0.032434495, 0.032434495) * direction * strength;
  vec2 off3 = vec2(0.053898443, 0.053898443) * direction * strength;
  vec2 off4 = vec2(0.075531771, 0.075531771) * direction * strength;

  vec3 diffuseColor = texture2D(tDiffuse, uv).rgb * gaussian(0.0, 1.0);
  diffuseColor += (texture2D(tDiffuse, uv + off1 * resolution).rgb + texture2D(tDiffuse, uv - off1 * resolution).rgb) * gaussian(1.0, 1.0);
  diffuseColor += (texture2D(tDiffuse, uv + off2 * resolution).rgb + texture2D(tDiffuse, uv - off2 * resolution).rgb) * gaussian(2.0, 1.0);
  diffuseColor += (texture2D(tDiffuse, uv + off3 * resolution).rgb + texture2D(tDiffuse, uv - off3 * resolution).rgb) * gaussian(3.0, 1.0);
  diffuseColor += (texture2D(tDiffuse, uv + off4 * resolution).rgb + texture2D(tDiffuse, uv - off4 * resolution).rgb) * gaussian(4.0, 1.0);

  return diffuseColor;
}

void main() {
  vec3 color = blur(vUv, uResolution, uDirection, uStrength);
  gl_FragColor = vec4(color, 1.0);
}
`;

const fragmentRevealFragmentShader = `
varying vec2 vUv;
uniform sampler2D tDiffuse;
uniform sampler2D uTexture;
uniform float uProgress;
uniform float uType;
uniform float uTime;
uniform float uAspectRatio;

const float uvScale = 0.25;
const float edgeWidth = 0.05;

vec3 blendNormal(vec3 base, vec3 blend, float opacity) {
  return blend * opacity + base * (1.0 - opacity);
}

void main() {
  vec2 uv = vUv - 0.5;
  uv.x *= uAspectRatio;
  uv *= uvScale;

  float variation = sin(uv.x * 10.0 + uTime) * cos(uv.y * 10.0 + uTime) * 0.5 + 0.5;
  float progress = uProgress * (1.0 + edgeWidth) - edgeWidth + variation * 0.05;
  float edgeMix = smoothstep(progress, progress + edgeWidth, vUv.x);

  vec3 diffuseColor = texture2D(tDiffuse, vUv).rgb;
  vec3 textureColor = texture2D(uTexture, vUv).rgb;
  vec3 mixColor = blendNormal(textureColor, diffuseColor, edgeMix);

  gl_FragColor = vec4(mixColor, 1.0);
}
`;

interface Slide {
  mesh: THREE.Mesh;
  texture: THREE.Texture;
}

export class FragmentSlideshow {
  private scene: THREE.Scene;
  private camera: THREE.OrthographicCamera;
  private renderer: THREE.WebGLRenderer;
  private composer!: EffectComposer;
  private slides: Slide[] = [];
  private current = 0;
  private isAnimating = false;
  private horizontalBlurMaterial!: THREE.ShaderMaterial;
  private verticalCompositeMaterial!: THREE.ShaderMaterial;
  private container: HTMLElement;
  private autoInterval: ReturnType<typeof setInterval> | null = null;
  private animationId: number | null = null;

  constructor(container: HTMLElement, imageUrls: string[]) {
    this.container = container;

    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, -1000, 1000);
    this.camera.position.set(0, 0, 10);

    this.renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false });
    this.renderer.setSize(container.offsetWidth || window.innerWidth, container.offsetHeight || window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.setClearColor(new THREE.Color(0xF8F4EF));

    container.appendChild(this.renderer.domElement);
    this.renderer.domElement.style.width = '100%';
    this.renderer.domElement.style.height = '100%';
    this.renderer.domElement.style.display = 'block';

    this.initComposer();
    this.initSlides(imageUrls);
    this.startAutoAdvance();

    window.addEventListener('resize', () => this.onResize());
    this.animate();
  }

  private initComposer() {
    this.composer = new EffectComposer(this.renderer);
    const renderPass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(renderPass);
  }

  private initSlides(imageUrls: string[]) {
    const geometry = new THREE.PlaneGeometry(1, 1);
    const loader = new THREE.TextureLoader();

    imageUrls.forEach((url) => {
      const tex = loader.load(url);
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;

      const material = new THREE.MeshBasicMaterial({ map: tex, transparent: false });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.scale.set(window.innerWidth, window.innerHeight, 1);
      mesh.position.set(0, 0, 0);
      mesh.visible = false;

      this.scene.add(mesh);
      this.slides.push({ mesh, texture: tex });
    });

    if (this.slides.length > 0) {
      this.slides[0].mesh.visible = true;
      this.initMaterials(this.slides[0].texture);
    }
  }

  private initMaterials(initialTexture: THREE.Texture) {
    const w = window.innerWidth;
    const h = window.innerHeight;

    this.horizontalBlurMaterial = new THREE.ShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: horizontalBlurFragmentShader,
      uniforms: {
        tDiffuse: { value: null },
        uResolution: { value: new THREE.Vector2(1 / w, 1 / h) },
        uDirection: { value: new THREE.Vector2(1.0, 0.0) },
        uStrength: { value: 1.0 },
      },
    });

    this.verticalCompositeMaterial = new THREE.ShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentRevealFragmentShader,
      uniforms: {
        tDiffuse: { value: null },
        uTexture: { value: initialTexture },
        uProgress: { value: 0 },
        uType: { value: 0 },
        uTime: { value: 0 },
        uAspectRatio: { value: w / h },
      },
    });

    const horizontalBlurPass = new ShaderPass(this.horizontalBlurMaterial, 'tDiffuse');
    const verticalCompositePass = new ShaderPass(this.verticalCompositeMaterial, 'tDiffuse');

    this.composer.addPass(horizontalBlurPass);
    this.composer.addPass(verticalCompositePass);
  }

  private startAutoAdvance() {
    this.autoInterval = setInterval(() => this.nextSlide(), 6000);
  }

  goToSlide(index: number) {
    if (this.isAnimating || index === this.current) return;
    if (this.autoInterval) clearInterval(this.autoInterval);

    this.isAnimating = true;
    const nextIndex = index % this.slides.length;

    this.slides[nextIndex].mesh.visible = true;
    const fromTex = this.slides[this.current].texture;
    const toTex = this.slides[nextIndex].texture;

    this.verticalCompositeMaterial.uniforms.uTexture.value = fromTex;
    this.horizontalBlurMaterial.uniforms.tDiffuse.value = toTex;

    const progress = { value: 0 };
    const tl = gsap.timeline({
      defaults: { duration: 1.7, ease: 'power2.inOut' },
      onComplete: () => {
        this.slides[this.current].mesh.visible = false;
        this.current = nextIndex;
        this.verticalCompositeMaterial.uniforms.uTexture.value = toTex;
        this.verticalCompositeMaterial.uniforms.uProgress.value = 0;
        this.verticalCompositeMaterial.uniforms.uTime.value = 0;
        this.isAnimating = false;
      },
    });

    tl.to(progress, {
      value: 1,
      onUpdate: () => {
        this.verticalCompositeMaterial.uniforms.uProgress.value = progress.value;
      },
    }, 0);

    tl.to({}, {
      duration: 1.7,
      onUpdate: () => {
        this.verticalCompositeMaterial.uniforms.uTime.value += 0.005;
      },
    }, 0);

    this.startAutoAdvance();
  }

  nextSlide() {
    if (this.isAnimating) return;
    this.goToSlide((this.current + 1) % this.slides.length);
  }

  getCurrentSlide() {
    return this.current;
  }

  private onResize() {
    const w = window.innerWidth;
    const h = window.innerHeight;

    this.renderer.setSize(w, h);
    this.composer.setSize(w, h);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.slides.forEach((s) => {
      s.mesh.scale.set(w, h, 1);
    });

    if (this.horizontalBlurMaterial) {
      this.horizontalBlurMaterial.uniforms.uResolution.value.set(1 / w, 1 / h);
    }
    if (this.verticalCompositeMaterial) {
      this.verticalCompositeMaterial.uniforms.uAspectRatio.value = w / h;
    }
  }

  private animate() {
    this.animationId = requestAnimationFrame(() => this.animate());
    this.composer.render();
  }

  dispose() {
    if (this.autoInterval) clearInterval(this.autoInterval);
    if (this.animationId) cancelAnimationFrame(this.animationId);
    this.renderer.dispose();
    this.slides.forEach((s) => {
      s.mesh.geometry.dispose();
      (s.mesh.material as THREE.MeshBasicMaterial).dispose();
      s.texture.dispose();
    });
    if (this.container.contains(this.renderer.domElement)) {
      this.container.removeChild(this.renderer.domElement);
    }
  }
}
