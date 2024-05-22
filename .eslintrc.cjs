/* eslint-env node */
module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
  ],
  "parser": "vue-eslint-parser",
  "parserOptions": {
    ecmaVersion: 'latest',
    "ecmaFeatures": {
      "jsx": true,
      "tsx": true
    }
  },
  rules:{
    "no-irregular-whitespace": "off",
  }
}
