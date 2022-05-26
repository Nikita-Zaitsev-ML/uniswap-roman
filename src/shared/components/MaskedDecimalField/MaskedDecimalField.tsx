import { ethers } from 'ethers';
import { FC } from 'react';
import NumberFormat, { NumberFormatValues } from 'react-number-format';

import { TextField } from '../TextField/TextField';

type Props = Omit<
  Parameters<typeof TextField>['0'],
  'ref' | 'value' | 'defaultValue'
> & {
  max?: string;
  onValueChange?: ConstructorParameters<
    typeof NumberFormat
  >['0']['onValueChange'];
};

const MaskedDecimalField: FC<Props> = ({
  max,
  onValueChange,
  ...textFieldProps
}) => {
  const withValueLimit = ({ floatValue }: NumberFormatValues) => {
    if (floatValue === undefined) {
      return true;
    }

    return (
      max !== undefined &&
      ethers.utils.parseUnits(`${floatValue}`).lte(ethers.utils.parseUnits(max))
    );
  };

  return (
    <NumberFormat
      allowNegative={false}
      isAllowed={withValueLimit}
      customInput={TextField}
      onValueChange={onValueChange}
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
