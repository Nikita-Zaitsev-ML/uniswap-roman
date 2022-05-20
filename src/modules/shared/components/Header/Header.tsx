import { FC } from 'react';
import { useRouter } from 'next/router';
import { AsyncReturnType } from 'type-fest';

import {
  Header as HeaderComponent,
  Button,
  Typography,
} from 'src/shared/components';
import { connectMetaMask } from 'src/shared/api/blockchain/rinkeby';

import { Logo } from '../Icons';
import { routes, items } from './constants';

type Props = {
  user: { address: string; balance: string } | null;
  onAuth?: (
    metaMaskConnection: AsyncReturnType<typeof connectMetaMask>
  ) => void;
};

const Header: FC<Props> = ({ user, onAuth }) => {
  const { pathname } = useRouter();
  const navigation = {
    items: items.map((item) => {
      const { key, title, href } = item;
      const isCurrentPage =
        href === routes.root ? pathname === href : pathname.startsWith(href);

      return { key, children: title, href, isCurrentPage };
    }),
  };

  const handleAuthClick = async () => {
    const metaMaskConnection = await connectMetaMask();

    onAuth?.(metaMaskConnection);
  };

  return (
    <HeaderComponent
      logo={<Logo />}
      navigation={navigation}
      settings={
        <>
          {user === null ? (
            <Button variant="contained" size="small" onClick={handleAuthClick}>
              Подключить кошелек
            </Button>
          ) : (
            <>
              <Typography>
                Адрес:{' '}
                {`${user.address.slice(0, 5)}..${user.address.slice(-3)}`}
              </Typography>
              <Typography>Баланс: {user.balance} ETH</Typography>
            </>
          )}
        </>
      }
    />
  );
};

export type { Props };

export { Header };
