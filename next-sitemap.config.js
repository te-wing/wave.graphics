/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://wave.app.wing.osaka',
  generateRobotsTxt: true,
  // ... その他の設定
};