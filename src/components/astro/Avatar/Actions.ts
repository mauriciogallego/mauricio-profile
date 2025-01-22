import * as THREE from 'three';
import { gsap } from 'gsap';

const defaultAnimation = {
  ease: 'none',
};
const repeat = 4;

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
