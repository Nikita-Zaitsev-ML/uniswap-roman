import { FC } from 'react';

import { PageHead } from 'src/shared/components';

type Props = {
  title: string;
  keywords?: string;
  description?: string;
};

const Head: FC<Props> = (props) => {
  const { title, keywords = '', description = '', children } = props;

  return (
    <PageHead title={title} keywords={keywords} description={description}>
      {children}
    </PageHead>
  );
};

export type { Props };

export { Head };
