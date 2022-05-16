import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box } from '../Box/Box';
import { List, Props } from './List';

const Meta: ComponentMeta<typeof List> = {
  title: 'components/List',
  component: List,
};

const customItems = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
];
const Template: ComponentStory<typeof List> = (props: Props) => (
  <List {...props} />
);

const Default = Template.bind({});
Default.args = { items: [] };

const Custom = Template.bind({});
Custom.args = {
  items: customItems.map((item) => ({
    key: item.id,
    children: <Box>{item.id}</Box>,
  })),
};

export { Default, Custom };

export default Meta;
