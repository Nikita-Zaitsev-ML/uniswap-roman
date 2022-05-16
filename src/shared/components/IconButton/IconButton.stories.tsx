import { ComponentStory, ComponentMeta } from '@storybook/react';

import { MenuIcon } from '../Icon';
import { IconButton, Props } from './IconButton';

const Meta: ComponentMeta<typeof IconButton> = {
  title: 'components/IconButton',
  component: IconButton,
};

const Template: ComponentStory<typeof IconButton> = (props: Props) => (
  <IconButton {...props} />
);

const Default = Template.bind({});
Default.args = {};

const WithSomeIcon = Template.bind({});
WithSomeIcon.args = { children: <MenuIcon /> };

export { Default, WithSomeIcon };

export default Meta;
