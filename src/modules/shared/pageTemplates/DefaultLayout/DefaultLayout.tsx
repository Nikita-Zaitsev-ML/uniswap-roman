import { FC, ReactElement } from 'react';
import { useTheme } from '@mui/material';

import { Box } from 'src/shared/components';

import { createStyles } from './DefaultLayout.style';

type Props = {
  header?: ReactElement;
};

const DefaultLayout: FC<Props> = ({ children, header }) => {
  const theme = useTheme();
  const styles = createStyles({ header }, theme);

  return (
    <Box css={styles.root()}>
      {header && <Box css={styles.header()}>{header}</Box>}
      {children}
    </Box>
  );
};

export type { Props };

export { DefaultLayout };
