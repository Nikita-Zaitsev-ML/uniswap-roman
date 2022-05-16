import { useAppDispatch } from 'src/app/hooks';
import { ThemeProvider, select } from 'src/services/theme';
import { ThemeChecker } from './components';

// FIXME: should be replaced by material UI storybook's addon
const withTheme = (Story) => {
  const dispatch = useAppDispatch();

  dispatch(
    select({
      currentMode: 'light',
    })
  );

  return (
    <ThemeProvider>
      <ThemeChecker />
      <Story />
    </ThemeProvider>
  );
};

export { withTheme };
