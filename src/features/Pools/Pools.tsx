import { FC, useState } from 'react';

import { PairForm } from 'src/shared/components';

import { ViewPairs } from './view/containers/ViewPairs';
import type { ViewType } from './types';

type Props = {};

const Pools: FC<Props> = () => {
  // TODO: useRedux
  const [viewType, setViewType] = useState<ViewType>('edit');

  const handleSwitchBtnClick = () => {
    if (viewType === 'edit') {
      setViewType('view');
    } else {
      setViewType('edit');
    }
  };

  const tokens = [{ name: 'token A' }, { name: 'token B' }];

  const theFirstTokenMax = 10;
  const theSecondTokenMax = 200;

  const isSubmitDisabled = false;

  const onSubmit: Parameters<typeof PairForm>['0']['onSubmit'] = (data) => {
    console.log('d: ', data);
  };

  return viewType === 'edit' ? (
    <PairForm
      switchBtn={{
        value: 'Мои пары',
        onClick: handleSwitchBtnClick,
      }}
      items={tokens}
      itemText={'токен'}
      max={[theFirstTokenMax, theSecondTokenMax]}
      submitValue="Добавить пару"
      isSubmitDisabled={isSubmitDisabled}
      onSubmit={onSubmit}
    />
  ) : (
    <ViewPairs
      switchBtn={{ value: 'Добавить пару', onClick: handleSwitchBtnClick }}
    />
  );
};

export type { Props };

export { Pools };
