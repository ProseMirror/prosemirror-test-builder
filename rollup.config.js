module.exports = {
  input: "./src/index.js",
  output: [{
    file: 'dist/index.js',
    format: 'cjs',
    sourcemap: true,
    exports: "auto"
  }, {
    file: 'dist/index.es.js',
    format: 'es',
    sourcemap: true,
    exports: "auto"
  }],
  plugins: [require('@rollup/plugin-buble')()],
  external(id) { return id[0] != "." && !require("path").isAbsolute(id) }
}
