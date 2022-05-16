import { FC } from 'react';
import { ThemeProvider as MUIThemeProvider } from '@mui/material';

import { useAppSelector } from 'src/app/hooks';
import { useSystemTheme } from 'src/shared/styles/theme';

import { selectCurrentMode } from '../../redux/themeSlice';
import { darkTheme, lightTheme } from '../../modes';

type Props = {};

const ThemeProvider: FC<Props> = ({ children }) => {
  const themeOptions = {
    system: useSystemTheme({ light: lightTheme, dark: darkTheme }),
    light: lightTheme,
    dark: darkTheme,
  };

  const currentMode = useAppSelector(selectCurrentMode);
  const theme = themeOptions[currentMode];

  return <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>;
};

export { ThemeProvider };
