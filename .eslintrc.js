// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    "no-unused-vars": [1, {
      // 允许声明未使用变量
      "vars": "local",
      // 参数不检查
      "args": "none"
    }],
    // 关闭语句强制分号结尾
    "semi": 0,
    // 文中空行最多不能超过2行,文末空行不超过1行
    "no-multiple-empty-lines": [1, {max: 2, maxEOF: 1}],
    // 函数定义时括号前面要不要有空格
    "space-before-function-paren": 0,
    // 关闭块级注释前后需要空格
    "spaced-comment": 0
  }
}
