/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://wave.graphics',
  generateRobotsTxt: true,
  // ... その他の設定
};
