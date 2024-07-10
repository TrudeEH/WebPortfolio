import './style.css'

import * as THREE from 'three';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;
camera.position.setZ(30);
camera.position.setY(30);
let point = new THREE.Vector3( 0, 0, 0 );
camera.lookAt( point );
renderer.render( scene, camera );


// LIGHTS
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0,0,0)
pointLight.intensity = 2000;
pointLight.castShadow = true;

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight)

// SUN
const sunGeometry = new THREE.SphereGeometry( 3, 24, 24 );
const sunMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xfcba03, 
    emissive: 0xfcba03, // Add emissive color for bloom effect
    emissiveIntensity: 1 // Adjust intensity as needed
});
const sun = new THREE.Mesh( sunGeometry, sunMaterial );
scene.add(sun);



// PLANETS 
let planetorbitRadius = 15; // Distance from the sun
let planetorbitAngle = 0; // Starting angle
let planetorbitSpeed = 0.015;

const planetGeometry = new THREE.SphereGeometry( 1, 24, 24 );
const planetMaterial = new THREE.MeshStandardMaterial( { color: 0x192cfa } );
const planet = new THREE.Mesh( planetGeometry, planetMaterial );
planet.castShadow = true;
planet.receiveShadow = true;
scene.add(planet);


// MOONS
let moonorbitRadius = 2.5; // Distance from the planet
let moonorbitAngle = 200; // Starting angle
let moonorbitSpeed = 0.05;

const moonGeometry = new THREE.SphereGeometry( 0.4, 24, 24 );
const moonMaterial = new THREE.MeshStandardMaterial( { color: 0xFFFFFF } );
const moon = new THREE.Mesh( moonGeometry, moonMaterial );
moon.castShadow = true;
moon.receiveShadow = true;
scene.add(moon);

// STARS
function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial( { color: 0xffffff })
    const star = new THREE.Mesh( geometry, material );

    let [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 300 ) );

    // Ensure minimum distance from camera
    while (
        Math.sqrt(x * x + y * y + z * z) < 50 // Adjust minimum distance as needed
    ) {
        [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(300));
    }

    star.position.set(x, y, z);

    scene.add(star)
}
Array(400).fill().forEach(addStar)


// DEBUG
// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)


function animate() {
    requestAnimationFrame( animate );

    // Calculate new planet position
    planetorbitAngle += planetorbitSpeed; // Adjust for orbit speed
    planet.position.x = planetorbitRadius * Math.cos(planetorbitAngle);
    planet.position.z = planetorbitRadius * Math.sin(planetorbitAngle);
    planet.position.y = planetorbitRadius * Math.cos(planetorbitAngle) / 2;

    // Calculate new moon position
    moonorbitAngle += moonorbitSpeed; // Adjust for orbit speed
    moon.position.x = planet.position.x + ( moonorbitRadius * Math.cos(moonorbitAngle) );
    moon.position.z = planet.position.z +( moonorbitRadius * Math.sin(moonorbitAngle) );
    moon.position.y = planet.position.y +( moonorbitRadius * Math.cos(moonorbitAngle) / 2 );

    renderer.render ( scene, camera );
}

animate()