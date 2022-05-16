import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Popover, Props } from './Popover';

const Meta: ComponentMeta<typeof Popover> = {
  title: 'components/Popover',
  component: Popover,
};

const Template: ComponentStory<typeof Popover> = (props: Props) => (
  <Popover {...props} />
);

const Default = Template.bind({});
Default.args = {};

export { Default };

export default Meta;
