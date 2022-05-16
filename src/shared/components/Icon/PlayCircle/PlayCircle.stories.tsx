import { ComponentStory, ComponentMeta } from '@storybook/react';

import { PlayCircle, Props } from './PlayCircle';

const Meta: ComponentMeta<typeof PlayCircle> = {
  title: 'components/Icon',
  component: PlayCircle,
};

const Template: ComponentStory<typeof PlayCircle> = (props: Props) => (
  <PlayCircle {...props} />
);

const Default = Template.bind({});
Default.args = {};

export { Default };

export default Meta;
