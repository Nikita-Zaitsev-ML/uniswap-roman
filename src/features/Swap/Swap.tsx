import { FC, useState } from 'react';
import { ethers } from 'ethers';

import { PairForm } from 'src/shared/components';

import { SubmitButtonValue } from './types';

type Props = {
  provider: ethers.providers.Web3Provider | null;
  signer: ethers.providers.JsonRpcSigner | null;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Swap: FC<Props> = ({ provider, signer }) => {
  // TODO: use redux
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
      setSubmitValue(isSet ? 'Обменять' : 'Выберите токены');
    } else {
      setSubmitValue(isSet ? 'Обменять' : 'Подключите кошелек');
    }
  };

  const handlePairFormSubmit: Parameters<typeof PairForm>['0']['onSubmit'] = (
    data
  ) => {
    console.log('d: ', data);
  };

  return (
    <PairForm
      items={tokens}
      itemText={'токен'}
      max={[theFirstTokenMax, theSecondTokenMax]}
      submitValue={submitValue}
      isSubmitDisabled={isSubmitDisabled}
      onPairSet={handlePairFormPairSet}
      onSubmit={handlePairFormSubmit}
    />
  );
};

export type { Props };

export { Swap };
