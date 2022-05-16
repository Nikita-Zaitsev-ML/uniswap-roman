import { FC, useRef, useEffect } from 'react';
import { useTheme } from '@mui/material';

import { Box } from '../Box/Box';
import { Button } from '../Button/Button';
import { createStyles } from './LazyContainer.style';

type Props = {
  withButton?: boolean;
  buttonTopMargin?: number;
  onShowMore: () => void;
};

const LazyContainer: FC<Props> = ({
  children,
  withButton = false,
  buttonTopMargin = 56,
  onShowMore,
}) => {
  const theme = useTheme();
  const styles = createStyles({ buttonTopMargin }, theme);

  const button = useRef<HTMLButtonElement>(null);

  const scrollToButton = () => {
    const { current } = button;

    if (!(current instanceof HTMLButtonElement)) {
      return;
    }

    window.scrollTo(0, current.offsetTop);
  };

  useEffect(() => {
    if (withButton) {
      scrollToButton();
    }
  }, [children, withButton]);

  return (
    <Box css={styles.root}>
      {children}
      {withButton && (
        <Button
          css={styles.button}
          variant="contained"
          onClick={onShowMore}
          ref={button}
        >
          Show more
        </Button>
      )}
    </Box>
  );
};

export type { Props };

export { LazyContainer };
