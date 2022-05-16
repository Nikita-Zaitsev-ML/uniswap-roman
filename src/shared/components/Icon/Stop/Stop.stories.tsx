import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Stop, Props } from './Stop';

const Meta: ComponentMeta<typeof Stop> = {
  title: 'components/Icon',
  component: Stop,
};

const Template: ComponentStory<typeof Stop> = (props: Props) => (
  <Stop {...props} />
);

const Default = Template.bind({});
Default.args = {};

export { Default };

export default Meta;
