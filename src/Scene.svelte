<script>
	import { OrbitControls, Three, useFrame, useThrelte } from '@threlte/core';
	import {
		AdditiveBlending,
		BufferAttribute,
		BufferGeometry,
		Color,
		PerspectiveCamera,
		Points,
		ShaderMaterial,
	} from 'three';
	import fragmentShader from './shaders/fragment';
	import vertexShader from './shaders/vertex';

	const { renderer } = useThrelte();

	const params = {
		count: 200000,
		size: 100.0,
		radius: 5,
		branches: 3,
		spin: 1,
		randomness: 0.5,
		randomnessPower: 3,
		insideColor: '#ff6030',
		outsideColor: '#1b3984',
	}

	const geometry = new BufferGeometry();
	const positions = new Float32Array(params.count * 3);
	const colors = new Float32Array(params.count * 3);
	const scales = new Float32Array(params.count);

	const insideColor = new Color(params.insideColor);
	const outsideColor = new Color(params.outsideColor);

	for (let i = 0; i < params.count; i++) {
		const i3 = i * 3

		// Position
		const radius = Math.random() * params.radius

		const branchAngle = (i % params.branches) / params.branches * Math.PI * 2

		const randomX = Math.pow(Math.random(), params.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * params.randomness * radius
		const randomY = Math.pow(Math.random(), params.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * params.randomness * radius
		const randomZ = Math.pow(Math.random(), params.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * params.randomness * radius

		positions[i3    ] = Math.cos(branchAngle) * radius + randomX
		positions[i3 + 1] = randomY
		positions[i3 + 2] = Math.sin(branchAngle) * radius + randomZ

		// Color
		const mixedColor = insideColor.clone()
		mixedColor.lerp(outsideColor, radius / params.radius)

		colors[i3    ] = mixedColor.r
		colors[i3 + 1] = mixedColor.g
		colors[i3 + 2] = mixedColor.b

		// Scale
		scales[i] = Math.random();
	}

	geometry.setAttribute('position', new BufferAttribute(positions, 3));
	geometry.setAttribute('color', new BufferAttribute(colors, 3));
	geometry.setAttribute('aScale', new BufferAttribute(scales, 1));

	const material = new ShaderMaterial({
		depthWrite: false,
		blending: AdditiveBlending,
		vertexColors: true,
		vertexShader,
		fragmentShader,
		uniforms: {
			uSize: { value: params.size * renderer.getPixelRatio() },
		}
	});

	// useFrame(({ clock }) => {
	// 	material.uniforms.uTime.value = clock.getElapsedTime();
	// });
</script>

<Three type={PerspectiveCamera} makeDefault position={[10, 10, 10]} fov={24}>
	<OrbitControls />
</Three>

<Three type={Points} {geometry} {material} />
