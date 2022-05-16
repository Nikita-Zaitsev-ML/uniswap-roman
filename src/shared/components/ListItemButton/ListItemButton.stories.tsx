import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ListItemButton, Props } from './ListItemButton';

const Meta: ComponentMeta<typeof ListItemButton> = {
  title: 'components/ListItemButton',
  component: ListItemButton,
};

const Template: ComponentStory<typeof ListItemButton> = (props: Props) => (
  <ListItemButton {...props} />
);

const Default = Template.bind({});
Default.args = {};

export { Default };

export default Meta;
