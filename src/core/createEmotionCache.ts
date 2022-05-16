import createCache from '@emotion/cache';

/*
 * prepend: true moves MUI styles to the top of the <head> so they're loaded first.
 * It allows developers to easily override MUI styles with other styling solutions, like CSS modules.
 * Tip: prepend should be false cause of <meta charset="utf-8"> should be in the first 1024 bytes
 */
const createEmotionCache = () => {
  return createCache({ key: 'css', prepend: false });
};

export { createEmotionCache };
