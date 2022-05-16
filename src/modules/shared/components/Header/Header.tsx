import { FC } from 'react';
import { useRouter } from 'next/router';

import { Header as HeaderComponent } from 'src/shared/components';

import { routes, items } from './constants';

type Props = {};

const Header: FC<Props> = () => {
  const { pathname } = useRouter();
  const navigation = {
    items: items.map((item) => {
      const { key, title, href } = item;
      const isCurrentPage =
        href === routes.root ? pathname === href : pathname.startsWith(href);

      return { key, children: title, href, isCurrentPage };
    }),
  };

  return <HeaderComponent navigation={navigation} />;
};

export type { Props };

export { Header };
