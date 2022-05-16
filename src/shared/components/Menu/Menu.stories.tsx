import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Menu, Props } from './Menu';

const Meta: ComponentMeta<typeof Menu> = {
  title: 'components/Menu',
  component: Menu,
};

const Template: ComponentStory<typeof Menu> = (props: Props) => (
  <Menu {...props} />
);

const Default = Template.bind({});
Default.args = { open: true, items: [] };

const WithSomeItems = Template.bind({});
WithSomeItems.args = {
  open: true,
  items: [
    { key: 'Item1', children: 'Item1' },
    { key: 'Item2', children: 'Item2' },
    { key: 'Item3', children: 'Item3' },
  ],
};

export { Default, WithSomeItems };

export default Meta;
