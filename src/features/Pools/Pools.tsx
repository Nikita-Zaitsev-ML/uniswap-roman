import { FC, useState } from 'react';
import { ethers } from 'ethers';

import { PairForm } from 'src/shared/components';

import { ViewPairs } from './view/containers/ViewPairs';
import type { SubmitButtonValue, ViewType } from './types';

type Props = {
  provider: ethers.providers.Web3Provider | null;
  signer: ethers.providers.JsonRpcSigner | null;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Pools: FC<Props> = ({ provider, signer }) => {
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

  const isAuth = provider !== null && signer !== null;

  const [submitValue, setSubmitValue] =
    useState<SubmitButtonValue>('Подключите кошелек');

  if (submitValue === 'Подключите кошелек' && isAuth) {
    setSubmitValue('Выберите токены');
  }

  const isSubmitDisabled =
    submitValue === 'Подключите кошелек' || submitValue === 'Выберите токены';

  const handlePairFormPairSet: Parameters<
    typeof PairForm
  >['0']['onPairSet'] = ({ isSet }) => {
    if (isAuth) {
      setSubmitValue(isSet ? 'Добавить пару' : 'Выберите токены');
    } else {
      setSubmitValue(isSet ? 'Добавить пару' : 'Подключите кошелек');
    }
  };

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
      submitValue={submitValue}
      isSubmitDisabled={isSubmitDisabled}
      onPairSet={handlePairFormPairSet}
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
