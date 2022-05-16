import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Box, Props } from './Box';

const Meta: ComponentMeta<typeof Box> = {
  title: 'components/Box',
  component: Box,
};

const Template: ComponentStory<typeof Box> = (props: Props) => (
  <Box {...props} />
);

const Default = Template.bind({});
Default.args = {};

export { Default };

export default Meta;
