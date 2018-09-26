module.exports = {
  // 基本路径
  baseUrl: "./",
  // 输出文件目录
  outputDir: "../IIS/mobile",
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: true,
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // pass custom options to pre-processor loaders. e.g. to pass options to
    // sass-loader, use { sass: { ... } }
    // css预设器配置项
    loaderOptions: {
      postcss: {
        "postcss-import": {},
        "postcss-url": {},
        "postcss-aspect-ratio-mini": {},
        "postcss-write-svg": {
          utf8: false
        },
        "postcss-cssnext": {},
        "postcss-px-to-viewport": {
          viewportWidth: 750, // (Number) The width of the viewport.
          // viewportHeight: 1334, // (Number) The height of the viewport.
          unitPrecision: 3, // (Number) The decimal numbers to allow the REM units to grow to.
          viewportUnit: 'vw', // (String) Expected units.
          selectorBlackList: ['.ignore', '.hairlines'], // (Array) The selectors to ignore and leave as px.
          minPixelValue: 1, // (Number) Set the minimum pixel value to replace.
          mediaQuery: false // (Boolean) Allow px to be converted in media queries.
        },
        "postcss-viewport-units": {},
        "cssnano": {
          preset: "advanced",
          autoprefixer: false,
          "postcss-zindex": false
        }
      }
    },
    // 启用 CSS modules for all css / pre-processor files.
    modules: false
  },
  // PWA 插件相关配置
  // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  pwa: {
    name: '材博汇',
    themeColor: '#FFFFFF',
    msTileColor: '#ffffff',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black'
  }
};