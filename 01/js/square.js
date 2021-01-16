"use strict";

var gl;
var points;

window.onload = function init(){
	var canvas = document.getElementById( "square-canvas" );
	gl = WebGLUtils.setupWebGL( canvas );
	if( !gl ){
		alert( "WebGL isn't available" );
	}

	// Four Vertices
	var vertices = [
		-1.0, -0.5,// 左下 A
		 0.7, -0.5,// 右下 B
		 0.5,  0.8,// 右上 C
		-0.5,  1.0 // 左上 D
	];

	// Configure WebGL 背景颜色
	gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 0.0, 0.0, 0.0, 1.0 );

	// Load shaders and initialize attribute buffers
	var program = initShaders( gl, "vertex-shader", "fragment-shader" );
	gl.useProgram( program );

	// Load the data into the GPU
	var bufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertices ), gl.STATIC_DRAW );

	// Associate external shader variables with data buffer
	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );
	render();
}

function render(){
	gl.clear( gl.COLOR_BUFFER_BIT );
	gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
	//gl.drawArrays( gl.TRIANGLES, 0, 4 );
	//gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );
}