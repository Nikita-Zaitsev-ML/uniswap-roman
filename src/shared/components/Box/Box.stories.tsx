import { ComponentStory, ComponentMeta } from '@storybook/react';
import type { ElementType } from 'react';

import { Box, Props } from './Box';

const Meta: ComponentMeta<typeof Box> = {
  title: 'components/Box',
  component: Box,
};

const Template: ComponentStory<typeof Box> = (
  props: Props<ElementType<any>>
) => <Box {...props} />;

const Default = Template.bind({});
Default.args = {};

export { Default };

export default Meta;
