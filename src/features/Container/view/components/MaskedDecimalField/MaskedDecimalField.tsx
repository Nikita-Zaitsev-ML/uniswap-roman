import { ethers } from 'ethers';
import { FC } from 'react';
import NumberFormat, { NumberFormatValues } from 'react-number-format';

import { TextField } from 'src/shared/components';

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
  const withValueLimit = ({ value }: NumberFormatValues) => {
    if (value === '') {
      return true;
    }

    const decimals = value.split('.')[1]?.length || 0;

    return (
      max !== undefined &&
      value !== '.' &&
      max.split('.')[1]?.length >= decimals &&
      ethers.utils.parseUnits(value).lte(ethers.utils.parseUnits(max))
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
