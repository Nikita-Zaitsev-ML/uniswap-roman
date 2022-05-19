import {
  AutocompleteProps as MUIAutocompleteProps,
  Autocomplete as MUIAutocomplete,
} from '@mui/material';

type Props<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
> = MUIAutocompleteProps<T, Multiple, DisableClearable, FreeSolo> & {};

const Autocomplete = <
  T,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined
>({
  ...MUIProps
}: Props<T, Multiple, DisableClearable, FreeSolo>) => {
  return <MUIAutocomplete {...MUIProps} />;
};

export type { Props };

export { Autocomplete };
