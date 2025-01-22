import * as THREE from 'three';

export interface SceneState {
  renderer: THREE.WebGLRenderer | null;
  scene: THREE.Scene | null;
  camera: THREE.PerspectiveCamera | null;
  animateId: number | null;
  bones: Map<string, THREE.Bone>;
}
