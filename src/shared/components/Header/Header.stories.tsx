import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Header, Props } from './Header';

const Meta: ComponentMeta<typeof Header> = {
  title: 'components/Header',
  component: Header,
};

const Template: ComponentStory<typeof Header> = (props: Props) => (
  <Header {...props} />
);

const Default = Template.bind({});
Default.args = {};

const Mobile = Template.bind({});
Mobile.args = {};
Mobile.parameters = { viewport: { defaultViewport: 'mobile1' } };

export { Default, Mobile };

export default Meta;
