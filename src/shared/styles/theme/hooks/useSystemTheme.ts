import { useMediaQuery } from '@mui/material';

import { lightTheme, darkTheme } from '../modes';

const useSystemTheme = ({
  noSsr = false,
  light = lightTheme,
  dark = darkTheme,
} = {}) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)', {
    noSsr,
  });

  return prefersDarkMode ? dark : light;
};

export { useSystemTheme };
