import { FC, useState } from 'react';
import { useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  Typography,
  Card,
  Box,
  ArrowDownward,
  Button,
} from 'src/shared/components';

import {
  FieldWithAutocomplete,
  Props as FieldWithAutocompleteProps,
} from './view/components/FieldWithAutocomplete/FieldWithAutocomplete';
import { schema } from './utils/schema/schema';
import { FormState, SubmitButtonValue } from './types';
import { createStyles } from './Swap.style';

type Props = {};

const Swap: FC<Props> = () => {
  const theme = useTheme();
  const styles = createStyles(theme);

  const tokens = [{ name: 'token A' }, { name: 'token B' }];

  const {
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormState>({
    defaultValues: {
      theFirstToken: '',
      theFirstTokenValue: '',
      theSecondToken: '',
      theSecondTokenValue: '',
    },
    resolver: yupResolver(schema),
  });

  // TODO: use redux

  const theFirstTokenMax = 10;
  const theSecondTokenMax = 200;

  const theFirstToken = watch('theFirstToken');
  const theSecondToken = watch('theSecondToken');

  const handleTheFirstTokenAutocompleteChange: FieldWithAutocompleteProps['handleAutocompleteChange'] =
    (event, value) => {
      setValue('theFirstToken', value?.name || '');
    };

  const handleTheFirstTokenMaxClick = () => {
    setValue('theFirstTokenValue', theFirstTokenMax);
  };

  const handleTheSecondTokenAutocompleteChange: FieldWithAutocompleteProps['handleAutocompleteChange'] =
    (event, value) => {
      setValue('theSecondToken', value?.name || '');
    };

  const handleTheSecondTokenMaxClick = () => {
    setValue('theSecondTokenValue', theSecondTokenMax);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [submitValue, setSubmitValue] =
    useState<SubmitButtonValue>('Подключите кошелек');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isSubmitDisabled =
    submitValue === 'Подключите кошелек' || submitValue === 'Выберите токены';

  const onSubmit = (data: FormState) => {
    console.log(data);
  };

  console.log(errors);

  return (
    <Card
      css={styles.root()}
      content={{
        children: (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography css={styles.title()} component="h3" variant="body1">
              Обменять
            </Typography>
            <Box css={styles.panel()}>
              <FieldWithAutocomplete
                options={tokens.filter(
                  (token) => token.name !== theSecondToken
                )}
                max={theFirstTokenMax}
                inputProps={{ ...register('theFirstTokenValue') }}
                error={
                  Boolean(errors?.theFirstToken) ||
                  Boolean(errors?.theFirstTokenValue)
                }
                helperText={
                  errors?.theFirstToken?.message ||
                  errors?.theFirstTokenValue?.message
                }
                variant="filled"
                fullWidth
                handleAutocompleteChange={handleTheFirstTokenAutocompleteChange}
                handleMaxClick={handleTheFirstTokenMaxClick}
              />
              <Box css={styles.arrow()}>
                <ArrowDownward />
              </Box>
              <FieldWithAutocomplete
                options={tokens.filter((token) => token.name !== theFirstToken)}
                max={theSecondTokenMax}
                inputProps={{
                  ...register('theSecondTokenValue'),
                }}
                error={
                  Boolean(errors?.theSecondToken) ||
                  Boolean(errors?.theSecondToken)
                }
                helperText={
                  errors?.theSecondToken?.message ||
                  errors?.theSecondToken?.message
                }
                variant="filled"
                fullWidth
                handleAutocompleteChange={
                  handleTheSecondTokenAutocompleteChange
                }
                handleMaxClick={handleTheSecondTokenMaxClick}
              />
              <Button
                type="submit"
                variant="contained"
                // disabled={isSubmitDisabled}
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

export { Swap };
