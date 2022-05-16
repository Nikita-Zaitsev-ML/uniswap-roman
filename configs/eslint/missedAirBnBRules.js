module.exports = {
  // https://github.com/airbnb/javascript#destructuring--object
  'prefer-destructuring': [
    'error',
    {
      array: true,
      object: true,
    },
  ],

  // https://github.com/airbnb/javascript#functions--declarations
  'func-style': ['error', 'expression'],

  // https://github.com/airbnb/javascript#functions--defaults-last
  'default-param-last': ['error'],

  // https://github.com/airbnb/javascript#arrows--use-them
  'prefer-arrow-callback': [
    'error',
    { allowNamedFunctions: false, allowUnboundThis: false },
  ],

  // https://github.com/airbnb/javascript#arrows--implicit-return
  'arrow-body-style': ['error', 'as-needed'],

  /*
   * TODO: there should be a rule here, for example 'method-void-implicit-error'
   * https://github.com/airbnb/javascript#constructors--chaining
   */

  // https://github.com/airbnb/javascript#comments--multiline
  'multiline-comment-style': ['error', 'starred-block'],

  // https://github.com/airbnb/javascript#comments--singleline
  'line-comment-position': ['error', { position: 'above' }],
  'lines-around-comment': [
    'error',
    {
      beforeBlockComment: true,
      beforeLineComment: true,
      allowBlockStart: true,
      allowClassStart: true,
      allowObjectStart: true,
      allowArrayStart: true,
    },
  ],

  // https://github.com/airbnb/javascript#whitespace--chains
  'newline-per-chained-call': ['error', { ignoreChainWithDepth: 4 }],

  // https://github.com/airbnb/javascript#whitespace--after-blocks
  'padding-line-between-statements': [
    'error',
    { blankLine: 'always', prev: ['block-like'], next: '*' },
    { blankLine: 'always', prev: ['const', 'let'], next: ['block-like'] },
    { blankLine: 'always', prev: '*', next: ['return', 'break', 'debugger'] },
    { blankLine: 'always', prev: '*', next: 'export' },
    { blankLine: 'any', prev: ['case'], next: ['case', 'default'] },
  ],
};
