import { FC, ReactElement } from 'react';
import { Provider } from 'react-redux';
import { render, RenderOptions } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'whatwg-fetch';

import { makeStore } from 'src/app/store';
import { ThemeProvider } from 'src/services/theme';

// FIXME: use createWrapper from next-redux-wrapper
const Providers: FC = ({ children }) => {
  return (
    <Provider store={makeStore()}>
      <ThemeProvider>{children}</ThemeProvider>
    </Provider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: Providers, ...options });

export * from '@testing-library/react';

export * as userEvent from '@testing-library/user-event';

export { customRender as render };
