module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true
  },
  extends: "airbnb-base",
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    "linebreak-style": 0,
    "func-names": 0,
    "arrow-parens": 0,
    "no-plusplus": 0,
    "global-require": 0
  }
};
