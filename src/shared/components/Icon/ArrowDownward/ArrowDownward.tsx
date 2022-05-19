import { FC } from 'react';
import { SvgIconProps as MUIArrowRightAltIconProps } from '@mui/material';
import MUIArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

type Props = MUIArrowRightAltIconProps;

const ArrowDownward: FC<Props> = ({ css, ...MUIProps }) => {
  return <MUIArrowDownwardIcon css={css} {...MUIProps} />;
};

export type { Props };

export { ArrowDownward };
