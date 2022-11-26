<script>
	import { OrbitControls, Three, useFrame, useTexture } from '@threlte/core';
	import {
		BufferAttribute,
		Color,
		Mesh,
		PerspectiveCamera,
		PlaneGeometry,
		ShaderMaterial,
		Vector2,
	} from 'three';
	import fragmentShader from './shaders/fragment';
	import vertexShader from './shaders/vertex';

	const texture = useTexture('./flag-french.jpg');

	const material = new ShaderMaterial({
		vertexShader: vertexShader,
		fragmentShader: fragmentShader,
		transparent: true,
		uniforms: {
			uFrequency: { value: new Vector2(10, 5) },
			uTime: { value: 0 },
			uColor: { value: new Color('orange') },
			uTexture: { value: texture },
		},
	});

	const geometry = new PlaneGeometry(1, 1, 32, 32);

	const count = geometry.attributes.position.count;
	const randoms = new Float32Array(count);
	for (let i = 0; i < count; i++) {
		randoms[i] = Math.random();
	}

	geometry.setAttribute('aRandom', new BufferAttribute(randoms, 1));

	useFrame(({ clock }) => {
		material.uniforms.uTime.value = clock.getElapsedTime();
	});
</script>

<Three type={PerspectiveCamera} makeDefault position={[10, 10, 10]} fov={24}>
	<OrbitControls />
</Three>

<Three type={Mesh} {geometry} {material} scale.y={2 / 3} />
