import { FC } from 'react';
import {
  SliderProps as MUISliderProps,
  Slider as MUISlider,
} from '@mui/material';

type Props = MUISliderProps & {};

const Slider: FC<Props> = ({ ...MUIProps }) => {
  return <MUISlider {...MUIProps} />;
};

export type { Props };

export { Slider };
