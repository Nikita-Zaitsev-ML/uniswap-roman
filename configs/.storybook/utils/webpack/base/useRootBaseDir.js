const path = require('path');

const useRootBaseDir = (config) => {
  config.resolve.modules = [
    ...(config.resolve.modules || []),
    path.resolve(__dirname, '../../../../../'),
  ];

  return config;
};

module.exports = { useRootBaseDir };
