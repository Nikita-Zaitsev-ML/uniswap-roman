import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CircularProgress, Props } from './CircularProgress';

const Meta: ComponentMeta<typeof CircularProgress> = {
  title: 'components/CircularProgress',
  component: CircularProgress,
};

const Template: ComponentStory<typeof CircularProgress> = (props: Props) => (
  <CircularProgress {...props} />
);

const Default = Template.bind({});
Default.args = {};

export { Default };

export default Meta;
