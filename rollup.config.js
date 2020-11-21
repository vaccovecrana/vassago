import typescript from "@rollup/plugin-typescript"

export default {
  input: "./vg/index.ts",
  output: [{dir: "./dist", format: "es", sourcemap: "inline"}],
  plugins: [typescript({declaration: true, declarationDir: "./dist"})],
}
