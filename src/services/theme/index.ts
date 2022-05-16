import { lightTheme, darkTheme } from './modes';
import { ThemeProvider } from './view/ThemeProvider/ThemeProvider';
import { themeReducer, select, selectCurrentMode } from './redux/themeSlice';

export {
  lightTheme,
  darkTheme,
  ThemeProvider,
  themeReducer,
  select,
  selectCurrentMode,
};
