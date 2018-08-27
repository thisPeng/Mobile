module.exports = {
  // 基本路径
  baseUrl: "./",
  // 输出文件目录
  outputDir: "../IIS/mobile",
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  // webpack配置
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: () => {},
  configureWebpack: () => {},
  // vue-loader 配置项
  // https://vue-loader.vuejs.org/en/options.html
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
  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  parallel: require("os").cpus().length > 1,
  // PWA 插件相关配置
  // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  pwa: {
    name: '材博汇',
    themeColor: '#00a0e9',
    msTileColor: '#ffffff',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: 'src/registerServiceWorker.js',
      // ...other Workbox options...
    }
  },
  // webpack-dev-server 相关配置
  devServer: {
    open: process.platform === "darwin",
    host: "0.0.0.0",
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: null // 设置代理
    // before: app => {}
  },
  // 第三方插件配置
  pluginOptions: {
    'autoprefixer': {
      browsers: ['Android >= 4.0', 'iOS >= 7']
    }
  }
};