const useSVGr = (config) => {
  const assetsRuleIndex = config.module.rules.findIndex((rule) =>
    rule.test.toString().includes('svg')
  );
  const defaultAssetsRule = config.module.rules[assetsRuleIndex];
  const assetsRuleWithoutSVG = {
    ...defaultAssetsRule,
    test: new RegExp(
      defaultAssetsRule.test.toString().replace('svg|', '').slice(1, -1)
    ),
  };

  config.module.rules.splice(assetsRuleIndex, 1, assetsRuleWithoutSVG);
  config.module.rules.push({
    test: /.svg$/,
    use: ['@svgr/webpack'],
  });

  return config;
};

module.exports = { useSVGr };
