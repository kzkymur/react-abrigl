attribute vec3 position;
attribute vec4 color;
attribute vec2 textureCoord;
uniform mat4 mMatrix;
uniform mat4 tmpMatrix;
varying vec4 vColor;
varying vec2 vTexCoord;
void main(void){
	gl_Position = tmpMatrix * mMatrix * vec4(position, 1.0);
	vColor = color;
	vTexCoord = textureCoord;
}
