import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Check, Props } from './Check';

const Meta: ComponentMeta<typeof Check> = {
  title: 'components/Icon',
  component: Check,
};

const Template: ComponentStory<typeof Check> = (props: Props) => (
  <Check {...props} />
);

const Default = Template.bind({});
Default.args = {};

export { Default };

export default Meta;
