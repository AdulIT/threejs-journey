import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'

console.log(gsap)

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Time
// let time = Date.now()

gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 })
gsap.to(mesh.position, { duration: 1, delay: 2, x: 0 })

// Clock
// const clock = new THREE.Clock()

// Animation
const tick = () => {
    // Time
    // const time = Date.now()
    // console.log(time) // It'll be show the big number like 1672580906893, it's the amount of milleseconds, from the 1st january 1970's


    // const currentTime = Date.now()
    // const deltaTime = currentTime - time
    // time = currentTime

    // console.log(deltaTime)

    // Update objects
    // mesh.position.x += 0.01
    // mesh.position.x -= 0.01

    // mesh.rotation.y += 0.01 * deltaTime


    // Clock
    // const elapsedTime = clock.getElapsedTime()
    // console.log(elapsedTime) // It's not milliseconds, it's seconds

    // mesh.rotation.y = elapsedTime * Math.PI * 2 // If '=' == '+=' it will be show interesting result

    // Some funny staff
    // mesh.position.x = Math.sin(elapsedTime)
    // mesh.position.y = Math.cos(elapsedTime)
    // mesh.rotation.y = Math.PI * 2 * elapsedTime

    // Some funny staff by camera
    // camera.position.x = Math.sin(elapsedTime)
    // camera.position.y = Math.cos(elapsedTime)
    // camera.lookAt(mesh.position)
    
    // Render
    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
}

tick()