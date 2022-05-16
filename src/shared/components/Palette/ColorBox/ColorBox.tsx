import { FC, CSSProperties, KeyboardEvent } from 'react';
import { useTheme } from '@mui/material';

import { dispatchClickOnKeyDown } from 'src/shared/helpers/scripts/UIEvents';

import { Box } from '../../Box/Box';
import { Check } from '../../Icon';
import { createStyles } from './ColorBox.style';

type Props = {
  identifier: string;
  title: string;
  checked?: boolean;
  size?: 'medium';
  color?: CSSProperties['color'];
  backgroundColor?: CSSProperties['backgroundColor'];
  onClick?: (event: {
    identifier: string;
    backgroundColor: CSSProperties['backgroundColor'];
  }) => void;
};

const ColorBox: FC<Props> = ({
  identifier,
  title,
  checked = false,
  size = 'medium',
  color = '#ffffff',
  backgroundColor = '#000000',
  onClick,
}) => {
  const theme = useTheme();
  const styles = createStyles({ checked, size, color, backgroundColor }, theme);

  const handleRootClick = () => {
    onClick?.({ identifier, backgroundColor });
  };

  const handleRootKeyDown = (event: KeyboardEvent) => {
    dispatchClickOnKeyDown(event);
  };

  return (
    <Box
      css={styles.root()}
      title={title}
      tabIndex={0}
      onClick={handleRootClick}
      onKeyDown={handleRootKeyDown}
    >
      {checked && <Check />}
    </Box>
  );
};

export type { Props };

export { ColorBox };
