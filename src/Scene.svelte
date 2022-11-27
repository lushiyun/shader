<script>
	import { OrbitControls, Three, useFrame } from '@threlte/core';
	import {
		Color,
		DoubleSide,
		Mesh,
		PerspectiveCamera,
		PlaneGeometry,
		ShaderMaterial,
		Vector2,
	} from 'three';
	import { degToRad } from 'three/src/math/MathUtils';
	import fragmentShader from './shaders/fragment';
	import vertexShader from './shaders/vertex';

	const material = new ShaderMaterial({
		vertexShader: vertexShader,
		fragmentShader: fragmentShader,
		side: DoubleSide,
		uniforms: {
			uTime: { value: 0 },

			uBigWavesElevation: { value: 0.2 },
			uBigWavesFrequency: { value: new Vector2(4.0, 1.0) },
			uBigWavesSpeed: { value: 0.75 },

			uSmallWavesElevation: { value: 0.15 },
			uSmallWavesFrequency: { value: 3.0 },
			uSmallWavesSpeed: { value: 0.2 },
			uSmallWavesIteration: { value: 4.0 },

			uDepthColor: { value: new Color('#186691') },
			uSurfaceColor: { value: new Color('#9bd8ff') },
			uColorOffset: { value: 0.08 },
			uColorMultiplier: { value: 5.0 },
		},
	});

	const geometry = new PlaneGeometry(2, 2, 128, 128);

	useFrame(({ clock }) => {
		material.uniforms.uTime.value = clock.getElapsedTime();
	});
</script>

<Three type={PerspectiveCamera} makeDefault position={[10, 10, 10]} fov={24}>
	<OrbitControls />
</Three>

<Three type={Mesh} {geometry} {material} rotation.x={degToRad(90)} />
