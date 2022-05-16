import { Theme as MUITheme } from '@mui/material';

type Theme = MUITheme;

type Mode = Theme['palette']['mode'];

export type { Theme, Mode };
