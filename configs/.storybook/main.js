const { flow } = require('lodash');

const { useRootBaseDir } = require('./utils/webpack/base');
const { useSVGr, useEmotionBabel } = require('./utils/webpack/rules');

module.exports = {
  stories: ['../../**/*.stories.mdx', '../../**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  framework: '@storybook/react',
  core: {
    builder: 'webpack5',
  },
  features: {
    // for mui's problem: https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#emotion11-quasi-compatibility
    emotionAlias: false,
  },
  webpackFinal: async (config) => {
    const modifyConfig = flow([useRootBaseDir, useSVGr, useEmotionBabel]);

    return modifyConfig(config);
  },
};
