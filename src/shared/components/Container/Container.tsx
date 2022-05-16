import { FC } from 'react';
import {
  ContainerProps as MUIContainerProps,
  Container as MUIContainer,
  useTheme,
} from '@mui/material';

import { createStyles } from './Container.style';

type Props = Omit<MUIContainerProps, 'maxWidth'> & {
  maxWidth?: MUIContainerProps['maxWidth'] | number;
};

const Container: FC<Props> = ({ maxWidth = false, ...MUIProps }) => {
  const theme = useTheme();
  const styles = createStyles({ maxWidth }, theme);

  return <MUIContainer css={styles.root()} maxWidth={false} {...MUIProps} />;
};

export type { Props };

export { Container };
