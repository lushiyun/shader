const fragmentShader = `
	precision mediump float;

	varying float vRandom;

	void main() {
		gl_FragColor = vec4(vRandom, vRandom * 0.5, 1.0, 1.0);
	}
`;

export default fragmentShader;