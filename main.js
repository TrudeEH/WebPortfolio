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
const pointLight = new THREE.PointLight(0xffffff, 2000);
pointLight.position.set(0,0,0)
pointLight.castShadow = true;

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight)

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

//////////////////////
// CELESTIAL BODIES //
//////////////////////

class CelestialBody extends THREE.Mesh {
  constructor(size, color, orbitRadius, orbitSpeed = 0, orbitAngle = 0) {
      const geometry = new THREE.SphereGeometry(size, 24, 24);
      const material = new THREE.MeshStandardMaterial({color});
      super(geometry, material);
      this.orbitRadius = orbitRadius;
      this.orbitSpeed = orbitSpeed;
      this.orbitAngle = orbitAngle;
      this.castShadow = true;
      this.receiveShadow = true;
  }

  updatePosition(parentPosition = new THREE.Vector3(0, 0, 0)) {
      this.orbitAngle += this.orbitSpeed;
      this.position.x = parentPosition.x + this.orbitRadius * Math.cos(this.orbitAngle);
      this.position.z = parentPosition.z + this.orbitRadius * Math.sin(this.orbitAngle);
      // Optional: For elliptical orbits
      // this.position.y = parentPosition.y + this.orbitRadius * Math.cos(this.orbitAngle) / 2; 
  }
}

class Moon extends CelestialBody {
  constructor(planet, size, color, orbitRadius, orbitSpeed = 0, orbitAngle = 0) {
      super(size, color, orbitRadius, orbitSpeed, orbitAngle);
      this.planet = planet;
  }

  updatePosition() {
      super.updatePosition(this.planet.position);
  }
}

class Sun extends CelestialBody {
  constructor(size, color) {
    // Create the emissive material first
    const material = new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 1 // Adjust intensity as needed
    });

    super(size, color, 0, 0, 0); // Sun doesn't orbit
    this.castShadow = false;
    this.receiveShadow = false; 
    this.material = material;
  }
}


// Create celestial bodies
const sun = new Sun(3, 0xfcba03);
scene.add(sun);

const hardwareCore = new Sun(0.6, 0xFFFF8F); // PC repair - Phone repair - PC Building
scene.add(hardwareCore);

const systemsPlanet = new CelestialBody(0.7, 0x192cfa, 15, 0.015);
scene.add(systemsPlanet);

const unixMoon = new Moon(systemsPlanet, 0.1, 0xFFFFFF, 2, 0.05);
scene.add(unixMoon);

const linuxMoonMoon = new Moon(unixMoon, 0.05, 0xFFFFFF, 0.5, 0.1);
scene.add(linuxMoonMoon);

const otherMoon = new Moon(systemsPlanet, 0.1, 0xFFFFFF, 1.5, 0.05, 9.4);
scene.add(otherMoon);

const csPlanet = new CelestialBody(0.4, 0xFF040C, 8, 0.025, 40);
scene.add(csPlanet);

const cMoon = new Moon(csPlanet, 0.1, 0xFFFFFF, 1, 0.05, 9.4);
scene.add(cMoon);

const cs50Moon = new Moon(csPlanet, 0.1, 0xFFFFFF, 0.6, 0.07);
scene.add(cs50Moon);

const bashMoon = new Moon(csPlanet, 0.11, 0xFFFFFF, 1.5, 0.06, 2);
scene.add(bashMoon);

const pythonMoon = new Moon(csPlanet, 0.06, 0xFFFFFF, 1, 0.05, 1.3);
scene.add(pythonMoon);

const webPlanet = new CelestialBody(0.2, 0xFFF40C, 11, 0.02, 4);
scene.add(webPlanet);

const flaskMoon = new Moon(webPlanet, 0.08, 0xFFFFFF, 1, 0.05);
scene.add(flaskMoon);

const hugoMoon = new Moon(webPlanet, 0.1, 0xFFFFFF, 0.7, 0.07, 1.3);
scene.add(hugoMoon);

const gitDwarf = new CelestialBody(0.15, 0xFFFFF, 25, 0.02, 1.6);
scene.add(gitDwarf);

var target = null;

// ANIMATIONS
function animate() {
  requestAnimationFrame( animate );

  sun.rotation.x = 0.2;
  sun.rotation.y -= 0.01;
  sun.rotation.z = 0.2;
  systemsPlanet.updatePosition(); // Systems Programming
  unixMoon.updatePosition();        // All UNIX systems
  linuxMoonMoon.updatePosition();       // Linux
  otherMoon.updatePosition();       // Windows/BSDs
  csPlanet.updatePosition();      // Computer Science
  cMoon.updatePosition();           // C Lang
  cs50Moon.updatePosition();        // CS50 Course - Algos, etc...
  bashMoon.updatePosition();        // Scripting - Bash, etc...
  pythonMoon.updatePosition()       // Python Lang
  webPlanet.updatePosition();     // Web Dev: Core technologies - HTML/CSS/JS
  flaskMoon.updatePosition();       // Flask Python Lib
  hugoMoon.updatePosition();        // HUGO
  gitDwarf.updatePosition()       // GIT/GITHUB

  if (target != null) {
    camera.position.setZ(target.position.z + 4);
    camera.position.setY(target.position.y + 1);
    camera.position.setX(target.position.x + 2);
    let point = target.position;
    camera.lookAt( point );
  }

  if (target == sun) {
    sun.material.wireframe = true;
  }

  renderer.render ( scene, camera );
}

animate()

function endAnimation() {
  // Point the camera to the 'Unknown'. A new adventure awaits.
  // Add contact form here.
}

// DEBUG
// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)
