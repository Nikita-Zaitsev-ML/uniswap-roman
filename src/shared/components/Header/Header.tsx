import { FC, ReactNode } from 'react';
import {
  AppBarProps as MUIHeaderProps,
  AppBar as MUIHeader,
  Toolbar as MUIToolbar,
  useTheme,
} from '@mui/material';

import { Box } from '../Box/Box';
import { Link } from '../Link/Link';
import { Navigation, Props as NavigationProps } from './Navigation/Navigation';
import { createStyles } from './Header.style';
import { defaultNavigationItems } from './constants';

type Props = MUIHeaderProps & {
  logo: ReactNode;
  navigation?: NavigationProps;
};

const Header: FC<Props> = ({
  navigation = { items: defaultNavigationItems },
  logo,
  ...MUIProps
}) => {
  const theme = useTheme();
  const styles = createStyles({}, theme);

  return (
    <MUIHeader css={styles.root()} {...MUIProps}>
      <MUIToolbar css={styles.toolbar()}>
        <Box css={styles.logo()}>
          <Link href="/" color="inherit">
            {logo}
          </Link>
        </Box>
        <Box css={styles.navigation()}>
          <Navigation {...navigation} />
        </Box>
        <Box css={styles.settings()}></Box>
      </MUIToolbar>
    </MUIHeader>
  );
};

export type { Props };

export { Header };
