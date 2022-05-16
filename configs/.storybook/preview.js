import { initialize, mswDecorator } from 'msw-storybook-addon';

import {
  withGlobalStyles,
  withLayout,
  withRedux,
  withRouter,
  withTheme,
  withWrapper,
} from './decorators';
import { unoptimizedPropForNextJSImages } from './utils/nextJS';

const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: 'fullscreen',
};

initialize();

const decorators = [
  withLayout,
  withWrapper,
  withRouter,
  withGlobalStyles,
  withTheme,
  withRedux,
  mswDecorator,
];

unoptimizedPropForNextJSImages();

export { parameters, decorators };
