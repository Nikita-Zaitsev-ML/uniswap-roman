import { FC, ElementType } from 'react';
import {
  TypographyProps as MUITypographyProps,
  Typography as MUITypography,
} from '@mui/material';

type Props = MUITypographyProps & {
  component?: ElementType<any>;
};

const Typography: FC<Props> = ({ ...MUIProps }) => {
  return <MUITypography {...MUIProps} />;
};

export type { Props };

export { Typography };
