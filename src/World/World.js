import { createCamera } from './components/camera';
import { createScene } from './components/scene';
import { createCube } from './components/cube';
import { createLights } from './components/lights';
import { Rubikscube } from './components/Rubikscube';
import { AxesHelper } from 'three'; 

import { createControls } from './systems/controls';
import { createRenderer } from './systems/renderer';
import { Resizer } from './systems/Resizer';
import { Loop } from './systems/Loop';


let camera;
let scene;
let renderer;
let loop;
let rubikscube;

class World {
    constructor(container) {
        camera = createCamera();
        scene = createScene();
        renderer = createRenderer();
        rubikscube = new Rubikscube()
        loop = new Loop(camera, scene, renderer)
        container.append(renderer.domElement)
        const axesHelper = new AxesHelper( 5 );
        scene.add( axesHelper );

        const controls = createControls(camera, renderer.domElement)
        loop.updatables.push(controls)


        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                for (let k = 0; k < 3; k++) {
                    scene.add(rubikscube.pieces[i][j][k])
                }
            }
        }
        
        const light = createLights()
        scene.add(light)
        
        let n = 0
        this.rotate90 = () => {
            controls.enable = false
            controls.reset()
            for (let j = 0; j < 3; j++) {
                for (let k = 0; k < 3; k++) {
                    if (j === 1 && k === 1) continue;
                    rubikscube.pieces[2][1][1].attach(rubikscube.pieces[2][j][k]);
                }
            }
            let total = 0
            loop.updatables.push(rubikscube.pieces[2][1][1])
            rubikscube.pieces[2][1][1].tick = (delta) => {
                rubikscube.pieces[2][1][1].rotation.x += Math.PI * delta / 2
                total += Math.PI * delta / 2
        
                if (total >= Math.PI / 2) {
                    loop.updatables.splice(loop.updatables.indexOf(rubikscube.pieces[2][1][1]));
                    n++
                    rubikscube.pieces[2][1][1].rotation.x = n * Math.PI / 2
                    controls.enable = true
                }
            }

            // for (let j = 0; j < 3; j++) {
            //     for (let k = 0; k < 3; k++) {
            //         if (j === 1 && k === 1) continue;
            //         scene.attach((rubikscube.pieces[2][j][k]))
            //     }
            // }

        }

        const resizer = new Resizer(container, camera, renderer);
    }

    render() {
        renderer.render(scene, camera)
    }

    start() {
        loop.start()
    }

    stop() {
        loop.stop()
    }
}

export { World }