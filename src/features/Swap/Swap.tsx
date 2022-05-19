import { FC, useState } from 'react';

import { PairForm } from 'src/shared/components';

import { SubmitButtonValue } from './types';

type Props = {};

const Swap: FC<Props> = () => {
  // TODO: use redux
  const tokens = [{ name: 'token A' }, { name: 'token B' }];

  const theFirstTokenMax = 10;
  const theSecondTokenMax = 200;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [submitValue, setSubmitValue] =
    useState<SubmitButtonValue>('Подключите кошелек');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isSubmitDisabled =
    submitValue === 'Подключите кошелек' || submitValue === 'Выберите токены';

  const onSubmit: Parameters<typeof PairForm>['0']['onSubmit'] = (data) => {
    console.log('d: ', data);
  };

  return (
    <PairForm
      items={tokens}
      itemText={'токен'}
      max={[theFirstTokenMax, theSecondTokenMax]}
      submitValue={submitValue}
      // isSubmitDisabled={isSubmitDisabled}
      onSubmit={onSubmit}
    />
  );
};

export type { Props };

export { Swap };
