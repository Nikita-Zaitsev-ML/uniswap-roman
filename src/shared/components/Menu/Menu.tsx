import { FC } from 'react';
import {
  MenuProps as MUIMenuProps,
  Menu as MUIMenu,
  MenuItem as MUIMenuItem,
  MenuItemProps as MUIMenuItemProps,
} from '@mui/material';

type Props = MUIMenuProps & {
  items: MUIMenuItemProps[];
};

const Menu: FC<Props> = ({ items, ...MUIProps }) => {
  return (
    <MUIMenu {...MUIProps}>
      {items.map((itemProps) => {
        const { key } = itemProps;

        return <MUIMenuItem key={key} {...itemProps} />;
      })}
    </MUIMenu>
  );
};

export type { Props };

export { Menu };
