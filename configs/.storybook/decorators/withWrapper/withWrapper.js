import { useTheme } from '@mui/material';

import { Wrapper } from './components';

const withWrapper = (Story) => {
  const theme = useTheme();

  const background = theme.palette.background.default;

  return (
    <Wrapper background={background}>
      <Story />
    </Wrapper>
  );
};

export { withWrapper };
