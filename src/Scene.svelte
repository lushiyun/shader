<script>
	import { OrbitControls, Three } from '@threlte/core';
	import {
		DoubleSide,
		Mesh,
		PerspectiveCamera,
		PlaneGeometry,
		ShaderMaterial,
	} from 'three';
	import fragmentShader from './shaders/fragment';
	import vertexShader from './shaders/vertex';

	const material = new ShaderMaterial({
		vertexShader: vertexShader,
		fragmentShader: fragmentShader,
		transparent: true,
		side: DoubleSide,
	});

	const geometry = new PlaneGeometry(1, 1, 32, 32);

	console.log(geometry.attributes);
</script>

<Three type={PerspectiveCamera} makeDefault position={[1, -1, 3]} fov={24}>
	<OrbitControls />
</Three>

<Three type={Mesh} {geometry} {material} />
