import { FC, ReactElement, useEffect, useState } from 'react';
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
  title: string;
  hint?: string;
  actionIcon?: ReactElement;
  items: Item[];
  itemText: string;
  values?: string[];
  max: string[];
  isMaxSync?: boolean;
  submitValue: string;
  isSubmitDisabled?: boolean;
  onPairSet?: (data: {
    pair: [{ name: string; value: string }, { name: string; value: string }];
    isSet: boolean;
  }) => void;
  onValueChange?: (
    event:
      | {
          value: string | undefined;
          field: 'theFirst' | 'theSecond';
        }
      | undefined
  ) => void;
  onSubmit: (data: FormState) => void;
  switchBtn?: { value: string; onClick: () => void };
};

const PairForm: FC<Props> = ({
  title,
  hint = '',
  actionIcon = <ArrowDownward />,
  items,
  itemText,
  values = undefined,
  max,
  isMaxSync = false,
  submitValue,
  isSubmitDisabled = false,
  switchBtn = undefined,
  onPairSet,
  onValueChange,
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
    if (values !== undefined) {
      setValue('theFirstItemValue', values[0]);
      setValue('theSecondItemValue', values[1]);
      setShouldRerender(true);
    }
  }, [setValue, values]);

  useEffect(() => {
    setShouldRerender(undefined);
  }, [shouldRerender]);

  const [theFirstItemMax, theSecondItemMax] = max;

  const handleTheFirstItemAutocompleteChange: FieldWithAutocompleteProps['handleAutocompleteChange'] =
    (event, value) => {
      const name = value?.name || '';

      setValue('theFirstItem', name);
      setValue('theFirstItemValue', '');
      setValue('theSecondItemValue', '');

      onPairSet?.({
        pair: [
          { name, value: '' },
          { name: state.theSecondItem, value: state.theSecondItemValue },
        ],
        isSet: name !== '' && state.theSecondItem !== '',
      });
      setShouldRerender(true);
    };

  const handleTheFirstItemMaxClick = () => {
    setValue('theFirstItemValue', theFirstItemMax);

    if (isMaxSync) {
      setValue('theSecondItemValue', theSecondItemMax);
    }

    setShouldRerender(true);
  };

  const handleTheSecondItemAutocompleteChange: FieldWithAutocompleteProps['handleAutocompleteChange'] =
    (event, value) => {
      const name = value?.name || '';

      setValue('theSecondItem', name);
      setValue('theFirstItemValue', '');
      setValue('theSecondItemValue', '');

      onPairSet?.({
        pair: [
          { name: state.theFirstItem, value: state.theFirstItemValue },
          { name, value: '' },
        ],
        isSet: state.theFirstItem !== '' && name !== '',
      });
      setShouldRerender(true);
    };

  const handleTheSecondItemMaxClick = () => {
    setValue('theSecondItemValue', theSecondItemMax);

    if (isMaxSync) {
      setValue('theFirstItemValue', theFirstItemMax);
    }

    setShouldRerender(true);
  };

  const makeHandleValueChange = (field: 'theFirst' | 'theSecond') => {
    const handleValueChange: Parameters<
      typeof FieldWithAutocomplete
    >['0']['onValueChange'] = ({ value }) => {
      onValueChange?.({ value, field });
    };

    return handleValueChange;
  };

  return (
    <Card
      css={styles.root()}
      content={{
        children: (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box css={styles.header()}>
              <Typography css={styles.title()} component="h3" variant="body1">
                {title}
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
                onValueChange={makeHandleValueChange('theFirst')}
                handleMaxClick={handleTheFirstItemMaxClick}
              />
              <Box css={styles.arrow()}>{actionIcon}</Box>
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
                onValueChange={makeHandleValueChange('theSecond')}
                handleMaxClick={handleTheSecondItemMaxClick}
              />
              {hint}
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
