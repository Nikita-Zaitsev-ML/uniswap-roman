import { ComponentStory, ComponentMeta } from '@storybook/react';

import { MenuIcon, Props } from './MenuIcon';

const Meta: ComponentMeta<typeof MenuIcon> = {
  title: 'components/Icon',
  component: MenuIcon,
};

const Menu: ComponentStory<typeof MenuIcon> = (props: Props) => (
  <MenuIcon {...props} />
);

export { Menu };

export default Meta;
