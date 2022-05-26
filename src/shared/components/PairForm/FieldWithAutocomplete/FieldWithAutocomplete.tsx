import { FC, SyntheticEvent } from 'react';
import { useTheme } from '@mui/material';

import {
  MaskedDecimalField,
  Props as MaskedDecimalFieldProps,
} from '../../MaskedDecimalField/MaskedDecimalField';
import { Box } from '../../Box/Box';
import { TextField, InputAdornment } from '../../TextField/TextField';
import { Autocomplete } from '../../Autocomplete/Autocomplete';
import { Avatar } from '../../Avatar/Avatar';
import { Typography } from '../../Typography/Typography';
import { Button } from '../../Button/Button';
import { Item } from '../type';
import { createStyles } from './FieldWithAutocomplete.style';

type Props = MaskedDecimalFieldProps & {
  options: Item[];
  optionText: string;
  value?: string;
  max?: string;
  handleAutocompleteChange: (
    event: SyntheticEvent<Element, Event>,
    value: Item | null,
    reason: 'createOption' | 'selectOption' | 'removeOption' | 'blur' | 'clear'
  ) => void;
  handleMaxClick: () => void;
};

const FieldWithAutocomplete: FC<Props> = ({
  options,
  optionText,
  max,
  handleAutocompleteChange,
  handleMaxClick,
  ...maskedDecimalFieldProps
}) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <MaskedDecimalField
      max={max}
      {...maskedDecimalFieldProps}
      InputProps={{
        disableUnderline: true,
        endAdornment: (
          <InputAdornment
            css={styles.adornment()}
            position="end"
            orientation="vertical"
          >
            <Autocomplete
              css={styles.autocomplete()}
              options={options}
              isOptionEqualToValue={(option, value) =>
                option.name === value.name
              }
              getOptionLabel={(option) => option.name}
              renderOption={(props, option) => (
                <Box css={styles.option()} component="li" {...props}>
                  <Box css={styles.optionAvatar()}>
                    <Avatar
                      userName={option.name}
                      alt={`иконка ${optionText}`}
                    />
                  </Box>
                  <Box css={styles.optionText()} component="span">
                    {option.name}
                  </Box>
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={`Выберите ${optionText}`}
                  size="small"
                  fullWidth
                />
              )}
              fullWidth
              onChange={handleAutocompleteChange}
            />
            <Box css={styles.balance()}>
              <Button
                css={styles.addBalanceBtn()}
                type="button"
                size="small"
                onClick={handleMaxClick}
              >
                макс
              </Button>
              <Typography
                css={styles.balanceValue()}
                title={max}
                variant="caption"
                noWrap
              >
                {max}
              </Typography>
            </Box>
          </InputAdornment>
        ),
      }}
    />
  );
};

export type { Props };

export { FieldWithAutocomplete };
