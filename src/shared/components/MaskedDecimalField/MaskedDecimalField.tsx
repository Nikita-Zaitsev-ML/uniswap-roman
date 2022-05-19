import { FC } from 'react';
import NumberFormat, { NumberFormatValues } from 'react-number-format';

import { TextField } from '../TextField/TextField';

type Props = Omit<
  Parameters<typeof TextField>['0'],
  'ref' | 'value' | 'defaultValue'
> & {
  max?: number;
};

const MaskedDecimalField: FC<Props> = ({ max, ...textFieldProps }) => {
  const withValueLimit = ({ floatValue }: NumberFormatValues) => {
    return max !== undefined && floatValue !== undefined && floatValue <= max;
  };

  return (
    <NumberFormat
      allowNegative={false}
      isAllowed={withValueLimit}
      customInput={TextField}
      {...textFieldProps}
      type="text"
      inputProps={{
        inputMode: 'decimal',
        placeholder: '0.0',
        ...textFieldProps.inputProps,
      }}
    />
  );
};

export type { Props };

export { MaskedDecimalField };
