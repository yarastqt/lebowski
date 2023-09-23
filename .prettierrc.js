const { builtinModules } = require('module')

module.exports = {
  arrowParens: 'always',
  endOfLine: 'lf',
  printWidth: 100,
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  importOrder: [
    `^(${builtinModules.join('|')})$`,
    '<THIRD_PARTY_MODULES>',
    '^@',
    '^[.\\/](.(?!\\.css$))*$',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
}
