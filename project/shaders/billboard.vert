#ifdef GL_ES
precision highp float;
#endif

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform sampler2D uSampler1;

uniform vec2 treePosition;

void main() {

    vTextureCoord = aTextureCoord;

    vec2 test = vec2(treePosition.x/400.0 + 0.5, treePosition.y/400.0 + 0.5);
    float height = texture2D(uSampler1, test).b;
    vec3 newPosition = aVertexPosition;
    if (treePosition.x >= 2.0) height *= 2.2;
    if ((treePosition.y == 3.9 || treePosition.y == 4.1) && (treePosition.x == 0.0)) height *= 0.85;
    newPosition.y += height * 11.8;

    gl_Position = uPMatrix * uMVMatrix * vec4(newPosition, 1.0);
}