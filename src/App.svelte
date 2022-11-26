<script>
	import { Canvas, OrbitControls, Three } from '@threlte/core';
	import {
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
	});
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

		<Three type={Mesh} geometry={new PlaneGeometry(1, 1, 32, 32)} {material} />
	</Canvas>
</div>

<style>
	div {
		height: 100%;
		width: 100%;
	}
</style>
