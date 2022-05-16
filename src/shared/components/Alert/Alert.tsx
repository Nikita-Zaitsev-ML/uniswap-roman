import { FC } from 'react';
import { AlertProps as MUIAlertProps, Alert as MUIAlert } from '@mui/material';

type Props = MUIAlertProps & {};

const Alert: FC<Props> = ({ ...MUIProps }) => {
  return <MUIAlert {...MUIProps} />;
};

export type { Props };

export { Alert };
