// Inputs attributes
attribute vec3 position;
attribute vec2 uv;

uniform mat4 projection; 
// offset to the centre of the compass
uniform float offsetX;
uniform float offsetY;
// rotation matrix for the compass
uniform mat2 rotation;

varying vec2 vUv;

void main() {
    vUv = uv;
    // aspect ratio of the viewport
    float ratio = projection[1][1] / projection[0][0];
    vec2 pos2D = vec2(position.x - offsetX, position.z - offsetY);
    pos2D = pos2D * rotation;
    gl_Position = vec4( pos2D.x + offsetX, pos2D.y * ratio - offsetY, 0., 1.0);
}
