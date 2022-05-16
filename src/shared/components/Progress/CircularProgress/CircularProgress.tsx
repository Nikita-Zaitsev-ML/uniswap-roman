import { FC } from 'react';
import {
  CircularProgressProps as MUICircularProgressProps,
  CircularProgress as MUICircularProgress,
} from '@mui/material';

type Props = MUICircularProgressProps & {};

const CircularProgress: FC<Props> = ({ ...MUIProps }) => {
  return <MUICircularProgress {...MUIProps} />;
};

export type { Props };

export { CircularProgress };
