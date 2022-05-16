const useEmotionBabel = (config) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('babel-loader'),
    options: {
      presets: [
        ['react-app', { flow: false, typescript: true }],
        [
          '@babel/preset-react',
          { runtime: 'automatic', importSource: '@emotion/react' },
        ],
      ],
      plugins: ['@emotion/babel-plugin'],
    },
  });

  return config;
};

module.exports = { useEmotionBabel };
