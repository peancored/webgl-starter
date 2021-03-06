import GLProgram from '../gl-program';
import { hexToRgb } from '../helpers';
import vertexSource from './shaders/vertex.glsl';
import fragmentSource from './shaders/fragment.glsl';

export default class Triangles extends GLProgram {
	constructor(gl) {
		super(gl);
		// prettier-ignore
		this.rawData = new Float32Array([
			-0.5, -0.5,
			-0.5, 0.5,
			0.5, 0.5,
			0.5, 0.5,
			0.5, -0.5,
			-0.5, -0.5,
		]);
	}

	createProgram() {
		super.createProgram(vertexSource, fragmentSource);
	}

	setupAttributes() {
		super.setupAttributes();

		this.attributes.positionAttributeLocation = this.gl.getAttribLocation(
			this.program,
			'a_position'
		);

		this.gl.vertexAttribPointer(
			this.attributes.positionAttributeLocation,
			2,
			this.gl.FLOAT,
			false,
			0,
			0
		);

		this.gl.enableVertexAttribArray(this.attributes.positionAttributeLocation);
	}

	setupUniforms() {
		super.setupUniforms();

		this.uniforms.colorLocation = this.gl.getUniformLocation(
			this.program,
			'u_color'
		);

		const colorRgb = hexToRgb('#ffffff');
		this.gl.uniform3f(
			this.uniforms.colorLocation,
			colorRgb.r,
			colorRgb.g,
			colorRgb.b
		);
	}

	draw() {
		super.draw();

		this.gl.bufferData(this.gl.ARRAY_BUFFER, this.rawData, this.gl.STATIC_DRAW);
		this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
	}
}
