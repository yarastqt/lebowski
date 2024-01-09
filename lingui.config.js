/** @type {import('@lingui/conf').LinguiConfig} */
module.exports = {
  locales: ['en', 'ru'],
  sourceLocale: 'en',
  catalogs: [
    {
      path: 'src/shared/i18n/locales/{locale}/messages',
      include: ['src'],
    },
  ],
  compileNamespace: 'ts',
  format: 'po',
}
