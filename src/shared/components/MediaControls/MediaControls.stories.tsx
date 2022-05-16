import { ComponentStory, ComponentMeta } from '@storybook/react';

import { MediaControls, Props } from './MediaControls';

const Meta: ComponentMeta<typeof MediaControls> = {
  title: 'components/MediaControls',
  component: MediaControls,
};

const Template: ComponentStory<typeof MediaControls> = (props: Props) => (
  <MediaControls {...props} />
);

const Default = Template.bind({});
Default.args = {};

export { Default };

export default Meta;
