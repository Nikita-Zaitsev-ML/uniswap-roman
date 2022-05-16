import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CloudDoneIcon } from '../index';

const Meta: ComponentMeta<typeof CloudDoneIcon> = {
  title: 'components/Icon',
  component: CloudDoneIcon,
};

const Template: ComponentStory<typeof CloudDoneIcon> = (args) => (
  <CloudDoneIcon {...args} />
);

const CloudDone = Template.bind({});

export { CloudDone };

export default Meta;
