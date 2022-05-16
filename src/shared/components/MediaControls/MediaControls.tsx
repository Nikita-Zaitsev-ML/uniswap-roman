import { FC, MouseEventHandler } from 'react';
import { useTheme } from '@mui/material';

import { Box } from '../Box/Box';
import { IconButton } from '../IconButton/IconButton';
import { PlayCircle } from '../Icon/PlayCircle/PlayCircle';
import { Stop } from '../Icon/Stop/Stop';
import { createStyles } from './MediaControls.style';

type Props = {
  onPlay?: MouseEventHandler<HTMLButtonElement>;
  onStop?: MouseEventHandler<HTMLButtonElement>;
};

const MediaControls: FC<Props> = ({ onPlay, onStop }) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <Box css={styles.root}>
      <IconButton
        css={styles.iconButtonPlay}
        aria-label="play action"
        color="inherit"
        onClick={onPlay}
      >
        <PlayCircle css={styles.icon} viewBox="2 2 20 20" />
      </IconButton>
      <IconButton
        css={styles.iconButtonStop}
        aria-label="stop action"
        color="inherit"
        onClick={onStop}
      >
        <Stop css={styles.icon} viewBox="5 5 12 12" />
      </IconButton>
    </Box>
  );
};

export type { Props };

export { MediaControls };
