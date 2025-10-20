import terser from '@rollup/plugin-terser';
import pkg from './package.json' with { type: 'json' };


// eslint-disable-next-line no-undef
const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/main.js',
    format: 'esm',
    sourcemap: !production,
  },
  plugins: [
    production && terser({
      keep_classnames: true,
      format: {
        preamble: `/*! ${pkg.name} v${pkg.version} - ${pkg.author} - ${pkg.license} license */`,
      }
    })
  ]
}