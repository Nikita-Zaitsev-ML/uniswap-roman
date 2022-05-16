import { FC } from 'react';
import NextImg, { ImageProps as NextImgProps } from 'next/image';

type Props = NextImgProps & {};

const Img: FC<Props> = ({ ...NextProps }) => {
  return <NextImg {...NextProps} />;
};

export type { Props };

export { Img };
