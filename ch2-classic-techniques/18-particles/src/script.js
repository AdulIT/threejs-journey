import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const particleTexture = textureLoader.load('/textures/particles/14.png')

/**
 * Particles
 */
// for (let i = 0; i < 50; i++)
// {
//     const particlesGeometry = new THREE.BufferGeometry()
//     const particlesMaterial = new THREE.PointsMaterial({
//         size: 0.02,
//         sizeAttenuation: true
//     })

//     const vertices = new Float32Array( [
//         Math.random() * (-5.0), Math.random() * (-5.0),  Math.random() * (-5.0),
//         Math.random() * (-5.0), Math.random() * (-5.0),  Math.random() * (-5.0),
//         Math.random() * (-5.0), Math.random() * (-5.0),  Math.random() * (-5.0),

//         Math.random() * (-5.0), Math.random() * (-5.0),  Math.random() * (-5.0),
//         Math.random() * (-5.0), Math.random() * (-5.0),  Math.random() * (-5.0),
//         Math.random() * (-5.0), Math.random() * (-5.0),  Math.random() * (-5.0)
//     ] );

//     particlesGeometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
//     // particles.position.x = (Math.random() - 0.5) * 20
//     // particles.position.y = (Math.random() - 0.5) * 20
//     // particles.position.z = (Math.random() - 0.5) * 20
//     const particles = new THREE.Points(particlesGeometry, particlesMaterial)
//     scene.add(particles)
// }

// Geometry
const particlesGeometry = new THREE.BufferGeometry()
const count = 20000

const positions = new Float32Array(count * 3)
const colors = new Float32Array(count * 3)

for (let i = 0; i < count * 3; i++)
{
    positions[i] = (Math.random() - 0.5) * 10
    colors[i] = Math.random()
}

particlesGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(positions, 3)
)
particlesGeometry.setAttribute(
    'color',
    new THREE.BufferAttribute(colors, 3)
)


// Materials
const particlesMaterial = new THREE.PointsMaterial()
particlesMaterial.size = 0.1
particlesMaterial.sizeAttenuation = true
particlesMaterial.color = new THREE.Color('#ffdecc')
particlesMaterial.alphaMap = particleTexture
particlesMaterial.transparent = true
// particlesMaterial.alphaTest = 0.001
// particlesMaterial.depthTest = false
particlesMaterial.depthWrite = false
particlesMaterial.blending = THREE.AdditiveBlending
particlesMaterial.vertexColors = true

// Points
const particles = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(particles)


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
camera.position.z = 3
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

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update partiles
    // particles.rotation.y = elapsedTime * 0.2

    for (let i = 0; i < count; i++)
    {
        const i3 = i * 3
        const x = particlesGeometry.attributes.position.array[i3]
        particlesGeometry.attributes.position.array[i3 + 1] = Math.sin(elapsedTime + x)
        // console.log(particlesGeometry.attributes.position.array)
    }

    particlesGeometry.attributes.position.needsUpdate = true

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()