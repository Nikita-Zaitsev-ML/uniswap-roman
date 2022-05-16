import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CloudErrorIcon } from '../index';

const Meta: ComponentMeta<typeof CloudErrorIcon> = {
  title: 'components/Icon',
  component: CloudErrorIcon,
};

const Template: ComponentStory<typeof CloudErrorIcon> = (args) => (
  <CloudErrorIcon {...args} />
);

const CloudError = Template.bind({});

export { CloudError };

export default Meta;
