import { AmbientLight, Box3, OrthographicCamera, Scene, WebGLRenderer } from 'three';
import { loadCollada } from './loadCollada';

export async function loadCanvas(url: string) {
  const s = await loadCollada(url);
  const box = new Box3().setFromObject(s);
  const w = box.max.x - box.min.x;
  const h = box.max.y - box.min.y;

  const scene = new Scene();

  scene.add(new AmbientLight(0xffffff));
  const camera = new OrthographicCamera(box.min.x, box.max.x, box.max.y, box.min.y, 0.01, 10000);
  camera.zoom = 1;
  camera.position.set(0, 0, 1)

  const renderer = new WebGLRenderer();
  renderer.setClearColor(0xff0000, 1);
  renderer.autoClear = true;
  const m = Math.max(w, h);
  const r = ~~(4096 / m)
  renderer.setSize(w * r, h * r);
  scene.add(s);
  renderer.render(scene, camera);
  return {
    image: renderer.domElement,
    x: box.min.x * 100,
    y: -box.max.y * 100,
    width: w * 100,
    height: h * 100,
  };
}
