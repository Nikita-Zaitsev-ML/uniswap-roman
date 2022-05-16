import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Mock } from './Mock';

const Meta: ComponentMeta<typeof Mock> = {
  title: 'modules/Mock',
  component: Mock,
};

const Template: ComponentStory<typeof Mock> = (props) => <Mock {...props} />;

const Default = Template.bind({});
Default.args = {};

export { Default };

export default Meta;
