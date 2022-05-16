import { FC } from 'react';
import { GridProps as MUIGridProps, Grid as MUIGrid } from '@mui/material';

type Props = MUIGridProps & {};

const Grid: FC<Props> = ({ ...MUIProps }) => {
  return <MUIGrid {...MUIProps} />;
};

export type { Props };

export { Grid };
