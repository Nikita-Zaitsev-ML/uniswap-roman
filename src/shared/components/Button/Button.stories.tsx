import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button, Props } from './Button';

const Meta: ComponentMeta<typeof Button> = {
  title: 'components/Button',
  component: Button,
};

const Template: ComponentStory<typeof Button> = (props: Props) => (
  <Button {...props} />
);

const Default = Template.bind({});
Default.args = {};

export { Default };

export default Meta;
