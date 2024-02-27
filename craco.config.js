const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Configurar la variable para que redireccione a ./src
      webpackConfig.resolve.alias['@components'] = path.resolve(__dirname, 'src/views/app/components/shared/index.js');
      webpackConfig.resolve.alias['@addon'] = path.resolve(__dirname, 'src/views/app/pages/Addon');
      webpackConfig.resolve.alias['@'] = path.resolve(__dirname, 'src');
      return webpackConfig;
    },
  },
  style: {
    modules: {
      localIdentName: '[local]_[hash:base64:5]',
    },
  },
};