import { decomposeColor, recomposeColor, rgbToHex } from '@mui/material';

type Options = {
  outputFormat?: 'hex' | 'rgb';
};

const convertColor = (color: string, { outputFormat = 'rgb' }: Options) => {
  const rgb = recomposeColor(decomposeColor(color));

  switch (outputFormat) {
    case 'hex': {
      return rgbToHex(rgb);
    }
    default: {
      return rgb;
    }
  }
};

export { convertColor };
