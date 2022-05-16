import { FC } from 'react';
import {
  AvatarProps as MUIAvatarProps,
  Avatar as MUIAvatar,
  useTheme,
} from '@mui/material';

import { createStyles } from './Avatar.style';
import { Box } from '../Box/Box';
import { userNameToAvatar } from './utils/userNameToAvatar';

type Props = MUIAvatarProps & {
  hasImage: boolean;
  hasBorder?: boolean;
  userName: string;
  src?: string;
};

const Avatar: FC<Props> = ({
  hasImage,
  hasBorder = true,
  userName,
  src = './image/avatar.svg',
  ...MUIProps
}) => {
  const theme = useTheme();
  const styles = createStyles({ hasBorder }, theme);

  return (
    <>
      {!hasImage && (
        <Box css={styles.root()}>
          <Box css={styles.inner()}>
            <MUIAvatar css={styles.avatar()} {...MUIProps}>
              {userNameToAvatar(userName)}
            </MUIAvatar>
          </Box>
        </Box>
      )}

      {hasImage && (
        <Box css={styles.root()}>
          <Box css={styles.inner()}>
            <MUIAvatar css={styles.avatar()} src={src} {...MUIProps} />
          </Box>
        </Box>
      )}
    </>
  );
};

export type { Props };

export { Avatar };
