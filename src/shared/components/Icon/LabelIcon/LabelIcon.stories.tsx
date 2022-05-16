import { ComponentStory, ComponentMeta } from '@storybook/react';

import { LabelIcon } from './LabelIcon';

const Meta: ComponentMeta<typeof LabelIcon> = {
  title: 'components/LabelIcon',
  component: LabelIcon,
};

const Template: ComponentStory<typeof LabelIcon> = (args) => (
  <LabelIcon {...args} />
);

const Label = Template.bind({});

export { Label };

export default Meta;
