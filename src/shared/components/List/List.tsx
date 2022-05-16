import { FC } from 'react';
import {
  ListProps as MUIListProps,
  List as MUIList,
  ListItemProps as MUIListItemProps,
  ListItem as MUIListItem,
} from '@mui/material';

type Props = MUIListProps & {
  items: MUIListItemProps[];
};

const List: FC<Props> = ({ items, ...MUIProps }) => {
  return (
    <MUIList {...MUIProps}>
      {items.map((itemProps) => {
        const { key } = itemProps;

        return <MUIListItem key={key} {...itemProps} disablePadding />;
      })}
    </MUIList>
  );
};

export type { Props };

export { List };
