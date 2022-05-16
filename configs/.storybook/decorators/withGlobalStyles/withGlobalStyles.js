import { CssBaseline } from '@mui/material';
import '@csstools/normalize.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import 'src/shared/styles/base/base.css';

import './base.css';

const withGlobalStyles = (Story) => {
  return (
    <>
      <CssBaseline />
      <Story />
    </>
  );
};

export { withGlobalStyles };
