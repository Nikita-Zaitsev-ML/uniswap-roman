import { ComponentStory, ComponentMeta } from '@storybook/react';

import { WarningIcon } from '../index';

const Meta: ComponentMeta<typeof WarningIcon> = {
  title: 'components/Icon',
  component: WarningIcon,
};

const Template: ComponentStory<typeof WarningIcon> = (args) => (
  <WarningIcon {...args} />
);

const Warning = Template.bind({});

export { Warning };

export default Meta;
