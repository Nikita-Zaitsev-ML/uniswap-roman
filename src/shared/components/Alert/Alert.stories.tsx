import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Alert, Props } from './Alert';

const Meta: ComponentMeta<typeof Alert> = {
  title: 'components/Alert',
  component: Alert,
};

const Template: ComponentStory<typeof Alert> = (props: Props) => (
  <Alert {...props} />
);

const Default = Template.bind({});
Default.args = {};

export { Default };

export default Meta;
