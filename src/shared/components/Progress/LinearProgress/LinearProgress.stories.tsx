import { ComponentStory, ComponentMeta } from '@storybook/react';

import { LinearProgress, Props } from './LinearProgress';

const Meta: ComponentMeta<typeof LinearProgress> = {
  title: 'components/LinearProgress',
  component: LinearProgress,
};

const Template: ComponentStory<typeof LinearProgress> = (props: Props) => (
  <LinearProgress {...props} />
);

const Default = Template.bind({});
Default.args = {};

export { Default };

export default Meta;
