import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Popper, Props } from './Popper';

const Meta: ComponentMeta<typeof Popper> = {
  title: 'components/Popper',
  component: Popper,
};

const Template: ComponentStory<typeof Popper> = (props: Props) => (
  <Popper {...props} />
);

const Default = Template.bind({});
Default.args = {};

export { Default };

export default Meta;
