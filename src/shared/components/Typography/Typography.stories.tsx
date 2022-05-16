import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Typography, Props } from './Typography';

const Meta: ComponentMeta<typeof Typography> = {
  title: 'components/Typography',
  component: Typography,
};

const Template: ComponentStory<typeof Typography> = (props: Props) => (
  <Typography {...props}>Текст</Typography>
);

const Default = Template.bind({});
Default.args = {};

export { Default };

export default Meta;
