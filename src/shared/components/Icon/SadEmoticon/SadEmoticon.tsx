import { FC } from 'react';
import { SvgIconProps as MUISentimentVeryDissatisfiedIconProps } from '@mui/material';
import { SentimentVeryDissatisfied as MUISentimentVeryDissatisfiedIcon } from '@mui/icons-material';

type Props = MUISentimentVeryDissatisfiedIconProps & {};

const SadEmoticon: FC<Props> = ({ ...MUIProps }) => {
  return <MUISentimentVeryDissatisfiedIcon {...MUIProps} />;
};

export type { Props };

export { SadEmoticon };
