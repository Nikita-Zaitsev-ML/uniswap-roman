import { FC } from 'react';
import {
  InputAdornmentProps as MUIInputAdornmentProps,
  InputAdornment as MUIInputAdornment,
  useTheme,
} from '@mui/material';

import { createStyles } from './InputAdornment.style';

type Props = MUIInputAdornmentProps & {
  orientation: 'vertical' | 'horizontal';
};

const InputAdornment: FC<Props> = ({ orientation, ...MUIProps }) => {
  const theme = useTheme();
  const styles = createStyles({ orientation }, theme);

  return <MUIInputAdornment css={styles.root()} {...MUIProps} />;
};

export type { Props };

export { InputAdornment };
