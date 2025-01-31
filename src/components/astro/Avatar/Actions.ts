import * as THREE from 'three';
import { gsap } from 'gsap';

const defaultAnimation = {
  ease: 'none',
};
const repeat = 4;

export function resizeAvatar() {
  const { innerWidth, innerHeight } = window;

  let height = innerHeight / 2;
  let width = innerWidth / 1.1;

  if (innerWidth > 640) {
    height = innerHeight / 2;
    width = innerWidth / 3;
  }

  if (innerWidth > 768) {
    height = innerHeight / 1.5;
    width = innerWidth / 3;
  }

  if (innerWidth > 1024) {
    height = innerHeight / 1.5;
    width = innerWidth / 4;
  }

  return { width, height };
}

export function initialPosition(bones: Map<string, THREE.Bone>) {
  const rightForeArm = bones.get('RightForeArm');
  const rightArm = bones.get('RightArm');
  const leftArm = bones.get('LeftArm');
  const leftForeArm = bones.get('LeftForeArm');
  if (rightForeArm && rightArm && leftArm && leftForeArm) {
    // Use GSAP to animate to the initial position
    gsap.to(rightForeArm.rotation, {
      x: Math.PI / 5,
      z: -Math.PI / 6,
      ease: 'none',
    });

    gsap.to(rightArm.rotation, {
      x: Math.PI / 3,
      y: 0,
      z: 0,
      ease: 'none',
    });

    gsap.to(leftArm.rotation, {
      x: Math.PI / 2.5,
      y: Math.PI / 6,
      z: 0,
      ease: 'none',
    });

    gsap.to(leftForeArm.rotation, {
      x: Math.PI / 5,
      z: 0,
      y: 0,
      ease: 'none',
    });
  }
}

export function playAnimations(bones: Map<string, THREE.Bone>) {
  const rightArmBone = bones.get('RightArm');
  const rightForeArmBone = bones.get('RightForeArm');
  const rightHand = bones.get('RightHand');
  const torsoBone = bones.get('Spine2');
  const headBone = bones.get('Head');

  if (rightArmBone && headBone && rightForeArmBone && rightHand && torsoBone) {
    const timeline = gsap.timeline({ repeat: 5, yoyo: true });

    timeline
      .add(
        gsap.to(torsoBone.rotation, {
          y: Math.PI / 18, // Slight body twist
          duration: 1.2,
          yoyo: true,
          repeat,
          ease: 'power2.inOut',
        }),
        0,
      )
      .add(
        gsap.to(headBone.rotation, {
          y: -Math.PI / 12, // Slight head tilt
          duration: 1.2,
          yoyo: true,
          repeat,
          ease: 'power2.inOut',
        }),
        0,
      )
      .add(
        gsap.to(rightArmBone.rotation, {
          ...defaultAnimation,
          x: Math.PI / 10, // Raise RightArm slightly
          y: -Math.PI / 10, // Raise RightArm slightly
          z: -Math.PI / 7, // Raise RightArm slightly
        }),
        0,
      )
      .add(
        gsap.to(rightForeArmBone.rotation, {
          ...defaultAnimation,
          x: Math.PI / 3,
          z: -Math.PI / 2,
          y: Math.PI / 4,
        }),
        0,
      )
      .add(
        gsap.to(rightArmBone.rotation, {
          ...defaultAnimation,
          x: Math.PI / 3, // Raise RightArm slightly
          y: Math.PI / 12, // Raise RightArm slightly
          z: -Math.PI / 8,
        }),
        0.5,
      )
      .add(
        gsap.to(rightForeArmBone.rotation, {
          ...defaultAnimation,
          x: -Math.PI / 10,
        }),
        0.5,
      )
      .add(
        gsap.to(rightForeArmBone.rotation, {
          ...defaultAnimation,
          duration: 1.2,
          z: -Math.PI / 2.5,
          yoyo: true,
          repeat,
        }),
        1,
      )
      .add(
        gsap.to(rightHand.rotation, {
          ...defaultAnimation,
          z: Math.PI / 5,
          duration: 1.2,
          yoyo: true,
          repeat,
        }),
        1,
      );
  }
}

export function initRender() {
  // Initialize Renderer
  const { width, height } = resizeAvatar();

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    preserveDrawingBuffer: true,
  });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0xfffff, 0); // Light gray background
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping; // Apply Linear tone mapping
  renderer.toneMappingExposure = 1.9; // Adjust exposure

  return renderer;
}

export function initScene() {
  // Initialize Scene
  const scene = new THREE.Scene();
  scene.background = null;

  return scene;
}

export function initCamera() {
  const { width, height } = resizeAvatar();
  // Initialize Camera
  const camera = new THREE.PerspectiveCamera(75, width / height, 1, 1000);

  camera.position.set(1, 4.9, 11);
  camera.aspect = width / height;
  camera.lookAt(-1, 1, 0);
  camera.updateProjectionMatrix();

  return camera;
}

export function initSpotLights() {
  // SpotLight for focused lighting
  const spotLight = new THREE.SpotLight(0xffffff, 1.5);
  spotLight.position.set(10, 15, 10);
  spotLight.castShadow = true;
  spotLight.shadow.radius = 4;
  spotLight.shadow.mapSize.set(2048, 2048);

  // Bright ambient light for overall illumination
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);

  // Add a key light (main light source)
  const keyLight = new THREE.DirectionalLight(0xffffff, 1.0);
  keyLight.shadow.mapSize.width = 2048;
  keyLight.intensity = 1.2; // Brighter key light
  keyLight.shadow.mapSize.height = 2048;
  keyLight.shadow.radius = 8;
  keyLight.position.set(10, 10, 10);
  keyLight.castShadow = true;

  // Add a fill light (softens shadows)
  const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
  fillLight.position.set(-10, 5, 5);
  fillLight.intensity = 0.6; // Balanced fill light

  // Add a back light (adds depth)
  const backLight = new THREE.DirectionalLight(0xffffff, 0.3);
  backLight.position.set(0, 10, -10);

  const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.5); // Adjust intensity as needed
  hemisphereLight.position.set(0, 20, 0);

  const lightProbe = new THREE.LightProbe();
  lightProbe.intensity = 0.5;

  const specularLight = new THREE.SpotLight(0xffffff, 0.3);
  specularLight.position.set(5, 10, 5);

  return [
    specularLight,
    lightProbe,
    hemisphereLight,
    backLight,
    fillLight,
    keyLight,
    ambientLight,
    spotLight,
  ];
}
