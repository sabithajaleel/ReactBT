const CracoLessPlugin = require('craco-less');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');

module.exports = {
  webpack: {
    plugins: [new AntdDayjsWebpackPlugin()],
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#002D14',
              '@font-size-base': '16px',
              '@font-family': "'Roboto', sans-serif",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
