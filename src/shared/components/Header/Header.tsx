import { FC } from 'react';
import {
  AppBarProps as MUIHeaderProps,
  AppBar as MUIHeader,
  Toolbar as MUIToolbar,
  useTheme,
} from '@mui/material';

import { Container } from '../Container/Container';
import { Box } from '../Box/Box';
import { Typography } from '../Typography/Typography';
import { Navigation, Props as NavigationProps } from './Navigation/Navigation';
import { createStyles } from './Header.style';
import { defaultNavigationItems } from './constants';

type Props = MUIHeaderProps & {
  title?: string;
  subTitle?: string;
  navigation?: NavigationProps;
};

const Header: FC<Props> = ({
  title = 'Title',
  subTitle = 'Sub title',
  navigation = { items: defaultNavigationItems },
  ...MUIProps
}) => {
  const theme = useTheme();
  const styles = createStyles({}, theme);

  return (
    <MUIHeader css={styles.root()} {...MUIProps}>
      <Container maxWidth={1274}>
        <MUIToolbar css={styles.toolbar()} variant="dense" disableGutters>
          <Box css={styles.titleLayout()}>
            <Typography css={styles.title()} variant="h5">
              {title}
            </Typography>
            <Typography css={styles.subTitle()} variant="caption">
              {subTitle}
            </Typography>
          </Box>
          <Box css={styles.navigation()}>
            <Navigation {...navigation} />
          </Box>
        </MUIToolbar>
      </Container>
    </MUIHeader>
  );
};

export type { Props };

export { Header };
