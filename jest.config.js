let shared = {
  transformIgnorePatterns: ["<rootDir>/node_modules/(?!lodash-es)"],
  setupFilesAfterEnv: ["jest-extended"]
};

let server = {
  displayName: "server",
  testEnvironment: "node",
  moduleNameMapper: {
    pretender: "<rootDir>/shims/pretender-node.js"
  },
  ...shared
};

let client = {
  displayName: "client",
  testEnvironment: "jsdom",
  ...shared
};

let eslint = {
  displayName: "lint",
  runner: "jest-runner-eslint",
  testMatch: ["<rootDir>/__tests__/**/*.js", "<rootDir>/lib/**/*.js"]
};

module.exports = {
  projects: [eslint, client, server]
};
