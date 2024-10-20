varying float vElevation;

void main() {
  // vec3 color = min(vElevation, vElevation, vElevation);

  float aaa = vElevation + 0.4;
  gl_FragColor = vec4(aaa, aaa, aaa, 1.0);

  #include <colorspace_fragment>
}
