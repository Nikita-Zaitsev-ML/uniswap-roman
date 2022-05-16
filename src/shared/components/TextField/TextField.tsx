import { FC } from 'react';
import {
  TextFieldProps as MUITextFieldProps,
  TextField as MUITextField,
  useTheme,
} from '@mui/material';

import { createStyles } from './TextField.style';

type Props = Omit<MUITextFieldProps, 'size'> & {
  size?: MUITextFieldProps['size'] | 'less-medium';
};

const TextField: FC<Props> = ({
  size: customSize = 'medium',
  multiline = false,
  ...MUIProps
}) => {
  const theme = useTheme();
  const styles = createStyles({ size: customSize, multiline }, theme);
  const size = customSize === 'less-medium' ? 'medium' : customSize;

  return (
    <MUITextField
      css={styles.root()}
      size={size}
      multiline={multiline}
      {...MUIProps}
    />
  );
};

export type { Props };

export { TextField };
