import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import gsap from 'gsap';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { AudioLoader, TextureLoader } from 'three'
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );



// Materials

const material = new THREE.MeshBasicMaterial()
material.color = new THREE.Color(0xff0000)

// Mesh
/*
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)
*/

function loadObject(url){
    var gltfLoader = new GLTFLoader();
    return new Promise((resolve, reject) => {
        gltfLoader.load(url, data => resolve(data), null, reject);
      });
}

var currObjectNew = null;

loadObject("untitled.gltf").then((result) =>{

    newCanvas.addEventListener("click", function() {
        console.log(textureToShow);
        var loader = new TextureLoader();
        loader.load(arr[textureToShow], function(tex) {
         // Once the texture has loaded
         // Asign it to the material
         result.scene.traverse(function (node) {
            if (node.isMesh) {
                node.material.map = tex;
            }
        })
         // Update the next texture to show
         textureToShow++;
         // Have we got to the end of the textures array
         if(textureToShow > arr.length-1) {
          textureToShow = 0;
         }
        }); 
        
    });
    textLoader();
    console.log(newObjects);
    currObjectNew = result.scene;

    var newTexture = new THREE.TextureLoader().load('background.png');
    result.scene.traverse(function (node) {
        if (node.isMesh) {
            node.material.map = newTexture;
        }
    })

    result.scene.position.set(0,-0.25,0);
    addText1(result.scene);

    time_line.to(result.scene.position, {z: -1, duration: 0.1});
    time_line.to(result.scene.rotation, {x: 0.75, duration: 1});
    time_line.to(result.scene.scale, {x: 0.1, y:0.1, z: 0.1, duration: 0.1})
    moveSpiral(result.scene);


    moveSpinBack(result.scene);
    addText('the', -0.5, 0, -2.5, 0, 0, 0)
    addText('         coffee             ', -0.5, 0, -2.5, 0, 0, 0)
    addText('          \n of   ', -0.5, 0, -2.5, 0, 0, 0)
    addText('          \n        today', -0.5, 0, -2.5, 0, 0, 0)
    time_line.to(camera.position, {y: -1, z: 1.25, duration: 1});
    time_line.to(camera.position, {y: 0, z: 2.5, duration: 1});
    /*
    const loader = new THREE.CubeTextureLoader();
    const texture = loader.load([
      'https://r105.threejsfundamentals.org/threejs/resources/images/cubemaps/computer-history-museum/pos-x.jpg',
      'https://r105.threejsfundamentals.org/threejs/resources/images/cubemaps/computer-history-museum/neg-x.jpg',
      'https://r105.threejsfundamentals.org/threejs/resources/images/cubemaps/computer-history-museum/pos-y.jpg',
      'https://r105.threejsfundamentals.org/threejs/resources/images/cubemaps/computer-history-museum/neg-y.jpg',
      'https://r105.threejsfundamentals.org/threejs/resources/images/cubemaps/computer-history-museum/pos-z.jpg',
      'https://r105.threejsfundamentals.org/threejs/resources/images/cubemaps/computer-history-museum/neg-z.jpg',
    ]);
    scene.background = texture;
    */

})
var time_line = gsap.timeline();

var newObjects = []
var newLineObjects = []

function textLoader(){
    const listWords = ["durable", "thermally resistant", "customizable"];
    const listObjects = [];
    const listLineObjects = [];
    for(let i = 0; i<listWords.length; i++){
        const fontLoad = new FontLoader();
        fontLoad.load('helvetiker_regular.typeface.json', function (font) {
            const color = 0xffffff;

            const matDark = new THREE.LineBasicMaterial( {
                color: color,
                side: THREE.DoubleSide
            } );
    
            const matLite = new THREE.MeshBasicMaterial( {
                color: color,
                transparent: true,
                opacity: 0.4,
                side: THREE.DoubleSide
            } );
    
            const message = listWords[i];
    
            const shapes = font.generateShapes( message, 0.2);
    
            const geometry = new THREE.ShapeGeometry( shapes );
    
            geometry.computeBoundingBox();
    
            const xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );
    
            geometry.translate( xMid, 0, 0 );
    
            // make shape ( N.B. edge view not visible )
    
            const text = new THREE.Mesh( geometry, matLite );
            text.position.z = 1;
            scene.add( text );
    
            // make line shape ( N.B. edge view remains visible )
    
            const holeShapes = [];
    
            for ( let i = 0; i < shapes.length; i ++ ) {
    
                const shape = shapes[ i ];
    
                if ( shape.holes && shape.holes.length > 0 ) {
    
                    for ( let j = 0; j < shape.holes.length; j ++ ) {
    
                        const hole = shape.holes[ j ];
                        holeShapes.push( hole );
    
                    }
    
                }
    
            }
    
            shapes.push.apply( shapes, holeShapes );
    
            const lineText = new THREE.Object3D();
    
            for ( let i = 0; i < shapes.length; i ++ ) {
    
                const shape = shapes[ i ];
    
                const points = shape.getPoints();
                const geometry = new THREE.BufferGeometry().setFromPoints( points );
    
                geometry.translate( xMid, 0, 0 );
    
                const lineMesh = new THREE.Line( geometry, matDark );
                lineText.add( lineMesh );
    
            }
            scene.add(lineText);

            text.scale.set(0,0,0);
            lineText.scale.set(0,0,0);

            listObjects[i] = text;
            listLineObjects[i] = lineText;
        })
    }
    newObjects = listObjects;
    newLineObjects = listLineObjects;
    
}

function addText(textInput, locationX, locationY, locationZ, rotationX, rotationY, rotationZ){

    const fontLoader = new FontLoader();
    fontLoader.load( 'helvetiker_regular.typeface.json', function ( font ) {

        const color = 0xffffff;

        const matDark = new THREE.LineBasicMaterial( {
            color: color,
            side: THREE.DoubleSide
        } );

        const matLite = new THREE.MeshBasicMaterial( {
            color: color,
            transparent: true,
            opacity: 0.4,
            side: THREE.DoubleSide
        } );

        const message = textInput;

        const shapes = font.generateShapes( message, 0.2);

        const geometry = new THREE.ShapeGeometry( shapes );

        geometry.computeBoundingBox();

        const xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );

        geometry.translate( xMid, 0, 0 );

        // make shape ( N.B. edge view not visible )

        const text = new THREE.Mesh( geometry, matLite );
        scene.add( text );

        // make line shape ( N.B. edge view remains visible )

        const holeShapes = [];

        for ( let i = 0; i < shapes.length; i ++ ) {

            const shape = shapes[ i ];

            if ( shape.holes && shape.holes.length > 0 ) {

                for ( let j = 0; j < shape.holes.length; j ++ ) {

                    const hole = shape.holes[ j ];
                    holeShapes.push( hole );

                }

            }

        }

        shapes.push.apply( shapes, holeShapes );

        const lineText = new THREE.Object3D();

        for ( let i = 0; i < shapes.length; i ++ ) {

            const shape = shapes[ i ];

            const points = shape.getPoints();
            const geometry = new THREE.BufferGeometry().setFromPoints( points );

            geometry.translate( xMid, 0, 0 );

            const lineMesh = new THREE.Line( geometry, matDark );
            lineText.add( lineMesh );

        }
        lineText.scale.set(0,0,0);
        text.scale.set(0,0,0);
        time_line.to(text.scale, {x: 1, y: 1, z: 1, duration: 1});
        time_line.to(lineText.scale, {x: 1, y: 1, z: 1, duration: 0.1});
        lineText.position.set(locationX, locationY, locationZ);
        text.position.set(locationX,locationY,locationZ + 0.25);
        scene.add( lineText );

        //render();

    } ); //end load function

}

function moveSpiral(currModel){
    var t = 200;
    var incTime = 0.1;
    var a = 0.01;
    var b = 0.01;
    while(t >= 200 && t < 240){
        var newX = a*Math.exp(b*t)*Math.cos(t);
        var newZ = a*Math.exp(b*t)*Math.sin(t);
        time_line.to(currModel.position, {x: newX, z: newZ, duration: incTime});
        console.log(newX);
        t += 1;
    }
}

function addText1(currModel){
    addText('starbucks', 0, -1, 0.5, 0, 0, 0);
    currModel.scale.set(0.05,0.05,0.05);
    scene.add(currModel);
    bounceObject(currModel, currModel.position.y);
    time_line.to(currModel.position, {x: 0, y: -1, z: 0, duration:0.1})
    scene.background = new THREE.Color( 0xDAF7A6);
    //gui.add(currModel.rotation, 'x').min(0).max(9);

}

function bounceObject(currModel, startY){
    let acceleration = 2;
    var top_position_y = startY + 0.05;
    let bottom_position_y = startY -0.05;
    let bounce_distance = top_position_y - bottom_position_y;

    let time_step = 0.001;
    let time_counter = Math.sqrt(bounce_distance * 2 / acceleration);
    let initial_speed = acceleration * time_counter;
    var newPos = top_position_y;

    let currPos = 0;

    let down = true;

    let amount = 0;

    if (currModel.position.y < bottom_position_y) {
        time_counter = 0;
    }
    var counter = 0;
    while(counter < 10){
        if(newPos > bottom_position_y){
            if(!down){
                down = !down;
                time_counter = 0;
                counter += 1;
            }
            acceleration = 2;
            newPos = bottom_position_y + initial_speed * time_counter - 0.5 * acceleration * time_counter * time_counter;
        }
        else if(newPos < top_position_y){
            if(down){
                down = !down;
                time_counter = 0;
                counter += 1;
            }
            acceleration = -2;
            newPos = bottom_position_y - initial_speed * time_counter - 0.5 * acceleration * time_counter * time_counter;
        }        
        time_line.to(currModel.position, {y: newPos, duration: time_step})  
        time_counter += time_step;
        //console.log(newPos + " At time " + time_counter);
        amount += time_step;
    }
    /*
    var currGLoader = new GLTFLoader();
    return new Promise((resolve, reject) => {
        currGLoader.load('subway_surfers_coin/scene.gltf', data => resolve(data), null, reject);
      });
      */
}

function moveSpinBack(currModel){

    var rotateX = 0;
    var incX = 6.24/304;
    var m = 0;
    var t = 0;
    var incZ = -1/152;
    var currZ = currModel.position.z;
    var initY = currModel.position.y;
    time_line.to(currModel.rotation, {x: 0, duration: 0.01});
    var incTime = 0.001;
    while(m < 304){
        var quadNum = -10*(t-0.5)*(t-0.5) + 2.5 + initY;
        time_line.to(currModel.rotation, {x: rotateX + incX, duration: incTime});
        time_line.to(currModel.position, {y: quadNum, z: currZ + incZ, duration: incTime})
        rotateX = (rotateX + incX)%9;
        m+=1;
        t-=incZ/2;
        currZ += incZ;
    }
    time_line.to(currModel.scale, {x: 0.08, y:0.08, z:0.08, duration: 0.5});
    time_line.to(currModel.scale, {x: 0.05, y:0.05, z:0.05, duration: 0.5});
    time_line.to(currModel.position, {x: 0, y:-1, z:0, duration: 0.5});
    time_line.to(camera.position, {z:2, duration: 0.5});
    /** 
     * Back flip in parabola to the back for conclusion and zoom in for effect
    */

}


// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.8)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

const clock = new THREE.Clock()
//const arrayCodes = [0xFFC300]
const arrayCodes = [0xDAF7A6, 0xFFC300, 0xFF5733, 0xC70039, 0x900C3F, 0x581845]

var counter = 0;

var arr = ["background.png", "new.jpg", "newCoffee.jpg"]

var newCanvas = document.getElementsByTagName("canvas")[0];

var textureToShow = 0;

var listener = new THREE.AudioListener();
camera.add( listener );

// create a global audio source
var sound = new THREE.Audio( listener );

var audioLoader = new AudioLoader();

document.addEventListener("click", function(){
    audioLoader.load("jungle.mp3", (buffer) => {
    var audio = new THREE.Audio(listener);
    audio.setBuffer(buffer);
    audio.setVolume(0.5)
    audio.play()
    
      scene.add(audio);
    });
    });



const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    //sphere.rotation.y = .5 * elapsedTime
    if(counter %10 == 0 && elapsedTime < 10){
        scene.background = new THREE.Color(arrayCodes[Math.floor(Math.random() * 6)])
    }
    else if(elapsedTime >=10){
        scene.background = new THREE.Color(0xC70039);
    }
    counter += 1;
    /*

    time_line.to(scene, {background: new THREE.Color( 0xFFC300 ), duration: 2})
    time_line.to(scene, {background: new THREE.Color( 0xFF5733  ), duration: 2})
    time_line.to(scene, {background: new THREE.Color( 0xC70039  ), duration: 2})
    time_line.to(scene, {background: new THREE.Color( 0x900C3F  ), duration: 2})
    time_line.to(scene, {background: new THREE.Color( 0x581845 ), duration: 2})
    */
    // Update Orbital Controls
     controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()