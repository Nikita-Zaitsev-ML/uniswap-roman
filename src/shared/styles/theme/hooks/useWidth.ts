import { Breakpoint, useMediaQuery, useTheme } from '@mui/material';

type BreakpointOrNull = Breakpoint | null;

/**
 * Be careful when using: this only works when the breakpoints in the theme have not changed - it will break if the number of breakpoints is different from the base ones
 * More detailed - https://reactjs.org/docs/hooks-rules.html#only-call-hooks-at-the-top-level
 */
const useWidth = (): Breakpoint => {
  const theme = useTheme();
  const keys: readonly Breakpoint[] = [...theme.breakpoints.keys].reverse();

  return (
    keys.reduce((output: BreakpointOrNull, key: Breakpoint) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const matches = useMediaQuery(theme.breakpoints.up(key));
      const resultExists = output !== null;

      if (!resultExists && matches) {
        return key;
      }

      return output;
    }, null) || 'xs'
  );
};

export { useWidth };
