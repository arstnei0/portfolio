import { Component, createSignal, onMount } from "solid-js"
import * as t from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js"
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js"
import "./3D.sass"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"

export const ThreeDEffect: Component = () => {
	let canvas: HTMLCanvasElement = null as unknown as HTMLCanvasElement
	const [text, setText] = createSignal<t.Mesh<
		TextGeometry,
		t.MeshMatcapMaterial
	> | null>(null)

	onMount(() => {
		// Scene
		const scene = new t.Scene()

		/**
		 * Textures
		 */
		const textureLoader = new t.TextureLoader()
		const matcapTexture = textureLoader.load("texture.png")

		/**
		 * Fonts
		 */
		const fontLoader = new FontLoader()

		fontLoader.load("/font.json", (font) => {
			// Material
			const material = new t.MeshMatcapMaterial({ matcap: matcapTexture })

			// Text
			const textGeometry = new TextGeometry("Zihan", {
				font: font,
				size: 0.7,
				height: 0.2,
				curveSegments: 12,
				bevelEnabled: true,
				bevelThickness: 0.03,
				bevelSize: 0.02,
				bevelOffset: 0,
				bevelSegments: 5,
			})
			textGeometry.center()

			const text = new t.Mesh(textGeometry, material)
			scene.add(text)

			setText(text)
		})

		const loader = new GLTFLoader()

		/**
		 * Sizes
		 */
		const sizes = {
			width: 750,
			height: 300,
		}

		const light = new t.AmbientLight(0xfffff)
		scene.add(light)

		const spotLight = new t.SpotLight(0xffffff)
		spotLight.position.set(100, 1000, 100)

		scene.add(spotLight)

		/**
		 * Camera
		 */
		// Base camera
		const camera = new t.PerspectiveCamera(
			75,
			sizes.width / sizes.height,
			0.1,
			100
		)
		camera.position.x = 1
		camera.position.y = 0
		camera.position.z = 1.3
		scene.add(camera)

		// Controls
		const controls = new OrbitControls(camera, canvas)
		controls.enableDamping = true
		controls.enableZoom = false
		controls.rotateSpeed = 0.1
		controls.autoRotate = true
		controls.autoRotateSpeed = 1

		/**
		 * Renderer
		 */
		const renderer = new t.WebGLRenderer({
			canvas: canvas,
			alpha: true,
		})
		renderer.setSize(sizes.width, sizes.height)
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

		/**
		 * Animate
		 */
		const clock = new t.Clock()

		const tick = () => {
			const elapsedTime = clock.getElapsedTime()

			// Update controls
			controls.update()

			// Render
			renderer.render(scene, camera)

			// Call tick again on the next frame
			window.requestAnimationFrame(tick)
		}

		tick()
	})

	return (
		<>
			<canvas class="webgl" ref={canvas}></canvas>
		</>
	)
}
