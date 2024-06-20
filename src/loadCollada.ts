import { Scene, LoadingManager } from 'three';
import { ColladaLoader } from './ColladaLoader';

export function loadCollada(url: string): Promise<Scene> {
  return new Promise((resolve, reject) => {
    let modelScene;
    const manager = new LoadingManager(() => {
      resolve(modelScene);
    });
    const loader = new ColladaLoader(manager);
    loader.load(url, collada => {
      if (!collada) return reject();
      modelScene = collada.scene;
      modelScene.rotateX(Math.PI / 2);
    }, null, () => {
      reject();
    });
  });
}