import { createTheme } from '@mui/material';

import { lightTheme as sharedLightTheme } from 'src/shared/styles/theme';

import { sharedThemeOptions } from '../shared';

const lightTheme = createTheme(sharedLightTheme, sharedThemeOptions, {});

export { lightTheme };
