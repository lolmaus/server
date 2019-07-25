// use this to figure out if we are running browser or node
// tests. if browser, we'll use pretender, if node pretender will
// be null.
let argv = require("minimist")(process.argv.slice(2));

module.exports = {
  moduleNameMapper:
    argv.env === "node"
      ? {
          pretender: "<rootDir>/shims/pretender-node.js"
        }
      : {},

  transformIgnorePatterns: ["<rootDir>/node_modules/(?!lodash-es)"],
  setupFilesAfterEnv: ["jest-extended"]
};
