varying vec2 vUv;

/** map containing normal map + w as depth adjustment */
uniform sampler2D compassPng;

void main(void) {
    vec4 texColor = texture2D(compassPng, vUv);
    if (texColor.xyz == vec3(0.,0.,0.)) discard; else gl_FragColor = texColor;
    // gl_FragColor = vec4(1.,1.,1.,1.); // texture2D(compassPng, vUv);
}