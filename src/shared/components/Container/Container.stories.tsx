import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Container, Props } from './Container';

const Meta: ComponentMeta<typeof Container> = {
  title: 'components/Container',
  component: Container,
};

const Template: ComponentStory<typeof Container> = (props: Props) => (
  <Container {...props} />
);

const Default = Template.bind({});
Default.args = {};

export { Default };

export default Meta;
