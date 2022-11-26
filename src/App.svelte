<script>
	import { Canvas, OrbitControls, Three } from '@threlte/core';
	import {
  BufferAttribute,
		Mesh,
		PerspectiveCamera,
		PlaneGeometry,
		RawShaderMaterial,
	} from 'three';
  import fragmentShader from './shaders/fragment';
  import vertexShader from './shaders/vertex';

	const material = new RawShaderMaterial({
		vertexShader: vertexShader,
		fragmentShader: fragmentShader,
		transparent: true,
	});

	const geometry = new PlaneGeometry(1, 1, 32, 32);

	const count = geometry.attributes.position.count;
	const randoms = new Float32Array(count);
	for (let i = 0; i < count; i++) {
		randoms[i] = Math.random();
	};

	geometry.setAttribute('aRandom', new BufferAttribute(randoms, 1));
</script>

<div>
	<Canvas>
		<Three
			type={PerspectiveCamera}
			makeDefault
			position={[10, 10, 10]}
			fov={24}
		>
			<OrbitControls />
		</Three>

		<Three type={Mesh} {geometry} {material} />
	</Canvas>
</div>

<style>
	div {
		height: 100%;
		width: 100%;
	}
</style>
