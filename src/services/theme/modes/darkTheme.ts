import { createTheme } from '@mui/material';

import { darkTheme as sharedDarkTheme } from 'src/shared/styles/theme';

import { sharedThemeOptions } from '../shared';

const darkTheme = createTheme(sharedDarkTheme, sharedThemeOptions, {});

export { darkTheme };
