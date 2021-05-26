module.exports = {
  devServer: {
    watchOptions: {
      ignored: ['node_modules'],
    },
    proxy: {
      '/api': {
        // 此处的写法，目的是为了 将 /api 替换成 http://xxxxx
        target: 'https://sp0.baidu.com', //目标源
        changeOrigin: true, //换源
        ws: true, //WebSocket
        secure: true, //不检查https
        pathRewrite: {
          //路径重写
          '^/api': '',
        },
      },
    },
    //关闭esLint警告（根据个人喜好选择）
    overlay: {
      warnings: false,
      error: false,
    },
  },
  // 关闭lintOnSave
  lintOnSave: false,
};
