import { FC } from 'react';
import {
  LinearProgressProps as MUILinearProgressProps,
  LinearProgress as MUILinearProgress,
  useTheme,
} from '@mui/material';

import { createStyles } from './LinearProgress.style';

type Props = MUILinearProgressProps & {
  position?: 'fixed-top';
};

const LinearProgress: FC<Props> = ({ position, ...MUIProps }) => {
  const theme = useTheme();
  const styles = createStyles({ position }, theme);

  return <MUILinearProgress css={styles.root()} {...MUIProps} />;
};

export type { Props };

export { LinearProgress };
