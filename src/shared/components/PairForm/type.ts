type Item = { name: string };

type NumberAsString = string;

type FormState = {
  theFirstItem: string;
  theFirstItemValue: NumberAsString;
  theSecondItem: string;
  theSecondItemValue: NumberAsString;
};

export type { Item, FormState };
