import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/shareshade.js', // UMD – pro browser `<script>`
      format: 'umd',
      name: 'ShareShade',
    },
    {
      file: 'dist/shareshade.module.js', // ESM – pro React/Vue
      format: 'es'
    }
  ],
  plugins: [terser()]
};