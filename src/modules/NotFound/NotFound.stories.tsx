import { ComponentStory, ComponentMeta } from '@storybook/react';

import { NotFound } from './NotFound';

const Meta: ComponentMeta<typeof NotFound> = {
  title: 'modules/NotFound',
  component: NotFound,
};

const Template: ComponentStory<typeof NotFound> = (props) => (
  <NotFound {...props} />
);

const Default = Template.bind({});
Default.args = {};

export { Default };

export default Meta;
