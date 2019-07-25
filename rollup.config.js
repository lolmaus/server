/* global process */
import path from "path";
import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import alias from "rollup-plugin-alias";
import pkg from "./package.json";

export default [
  {
    input: "lib/index.js",
    output: {
      file: pkg.browser,
      format: "umd",
      name: "MirageJS.Server"
    },
    plugins: [
      commonjs(),
      alias({
        "@miragejs/server": path.resolve(process.cwd(), "./")
      }),
      resolve(),
      babel({
        exclude: "node_modules/**",
        babelrc: false,
        comments: false,
        presets: [
          [
            "@babel/preset-env",
            {
              modules: false
            }
          ]
        ]
      })
    ]
  },
  {
    input: "lib/index.js",
    output: {
      file: pkg.main,
      format: "cjs",
      name: "MirageJS.Server"
    },
    external: ["lodash-es", "inflected", "rsvp"],
    plugins: [
      // commonjs(),
      alias({
        "@miragejs/server": path.resolve(process.cwd(), "./"),
        pretender: path.resolve(process.cwd(), "./shims/pretender-node.js")
      })
      // resolve(),
    ]
  }
];
