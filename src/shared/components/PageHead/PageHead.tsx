import { FC } from 'react';
import Head from 'next/head';

type Props = {
  title: string;
  keywords?: string;
  description?: string;
};

const PageHead: FC<Props> = (props) => {
  const { children, title, keywords = '', description = '' } = props;

  return Head({
    children: (
      <>
        <title>{title}</title>
        <meta name="keywords" content={keywords} />
        <meta name="description" content={description} />
        {children}
      </>
    ),
  });
};

export type { Props };

export { PageHead };
