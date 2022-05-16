import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ArrowRightIcon } from '../index';

const Meta: ComponentMeta<typeof ArrowRightIcon> = {
  title: 'components/Icon',
  component: ArrowRightIcon,
};

const Template: ComponentStory<typeof ArrowRightIcon> = (args) => (
  <ArrowRightIcon {...args} />
);

const ArrowRight = Template.bind({});

export { ArrowRight };

export default Meta;
