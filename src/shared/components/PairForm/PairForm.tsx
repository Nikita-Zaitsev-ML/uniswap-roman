import { FC, useEffect, useState } from 'react';
import { useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Card } from '../Card/Card';
import { Typography } from '../Typography/Typography';
import { Box } from '../Box/Box';
import { Button } from '../Button/Button';
import { ArrowDownward } from '../Icon';
import {
  FieldWithAutocomplete,
  Props as FieldWithAutocompleteProps,
} from './FieldWithAutocomplete/FieldWithAutocomplete';
import { schema } from './schema/schema';
import { Item, FormState } from './type';
import { createStyles } from './PairForm.style';

type Props = {
  items: Item[];
  itemText: string;
  max: [number, number];
  submitValue: string;
  isSubmitDisabled?: boolean;
  onPairSet?: (data: { isSet: boolean }) => void;
  onSubmit: (data: FormState) => void;
  switchBtn?: { value: string; onClick: () => void };
};

const PairForm: FC<Props> = ({
  items,
  itemText,
  max,
  submitValue,
  isSubmitDisabled = false,
  switchBtn = undefined,
  onPairSet,
  onSubmit,
}) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  const {
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormState>({
    defaultValues: {
      theFirstItem: '',
      theFirstItemValue: '',
      theSecondItem: '',
      theSecondItemValue: '',
    },
    resolver: yupResolver(schema),
  });
  const state = watch();

  // FIXME: this is a crutch to combine the controlled and uncontrolled behavior of NumberFormat - I did not understand how to use NumberFormat validation together with the react-hook-form state
  const [shouldRerender, setShouldRerender] = useState<undefined | true>();
  useEffect(() => {
    setShouldRerender(undefined);
  }, [shouldRerender]);

  onPairSet?.({
    isSet: state.theFirstItem !== '' && state.theSecondItem !== '',
  });

  console.log(state);
  console.log(errors);

  const [theFirstItemMax, theSecondItemMax] = max;

  const handleTheFirstItemAutocompleteChange: FieldWithAutocompleteProps['handleAutocompleteChange'] =
    (event, value) => {
      setValue('theFirstItem', value?.name || '');
    };

  const handleTheFirstItemMaxClick = () => {
    setValue('theFirstItemValue', `${theFirstItemMax}`);
    setShouldRerender(true);
  };

  const handleTheSecondItemAutocompleteChange: FieldWithAutocompleteProps['handleAutocompleteChange'] =
    (event, value) => {
      setValue('theSecondItem', value?.name || '');
    };

  const handleTheSecondItemMaxClick = () => {
    setValue('theSecondItemValue', `${theSecondItemMax}`);
    setShouldRerender(true);
  };

  return (
    <Card
      css={styles.root()}
      content={{
        children: (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box css={styles.header()}>
              <Typography css={styles.title()} component="h3" variant="body1">
                Обменять
              </Typography>
              {switchBtn !== undefined && (
                <Button variant="text" size="small" onClick={switchBtn.onClick}>
                  {switchBtn.value}
                </Button>
              )}
            </Box>
            <Box css={styles.panel()}>
              <FieldWithAutocomplete
                options={items.filter(
                  (item) => item.name !== state.theSecondItem
                )}
                optionText={itemText}
                value={shouldRerender && state.theFirstItemValue}
                max={theFirstItemMax}
                inputProps={{
                  ...register('theFirstItemValue'),
                }}
                error={
                  Boolean(errors?.theFirstItem) ||
                  Boolean(errors?.theFirstItemValue)
                }
                helperText={
                  errors?.theFirstItem?.message ||
                  errors?.theFirstItemValue?.message
                }
                variant="filled"
                fullWidth
                handleAutocompleteChange={handleTheFirstItemAutocompleteChange}
                handleMaxClick={handleTheFirstItemMaxClick}
              />
              <Box css={styles.arrow()}>
                <ArrowDownward />
              </Box>
              <FieldWithAutocomplete
                options={items.filter(
                  (item) => item.name !== state.theFirstItem
                )}
                optionText={itemText}
                value={shouldRerender && state.theSecondItemValue}
                max={theSecondItemMax}
                inputProps={{
                  ...register('theSecondItemValue'),
                }}
                error={
                  Boolean(errors?.theSecondItem) ||
                  Boolean(errors?.theSecondItemValue)
                }
                helperText={
                  errors?.theSecondItem?.message ||
                  errors?.theSecondItemValue?.message
                }
                variant="filled"
                fullWidth
                handleAutocompleteChange={handleTheSecondItemAutocompleteChange}
                handleMaxClick={handleTheSecondItemMaxClick}
              />
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitDisabled}
                fullWidth
              >
                {submitValue}
              </Button>
            </Box>
          </form>
        ),
      }}
    />
  );
};

export type { Props };

export { PairForm };
