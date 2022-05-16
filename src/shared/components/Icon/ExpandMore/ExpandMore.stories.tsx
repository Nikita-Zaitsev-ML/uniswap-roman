import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ExpandMore, Props } from './ExpandMore';

const Meta: ComponentMeta<typeof ExpandMore> = {
  title: 'components/Icon',
  component: ExpandMore,
};

const Template: ComponentStory<typeof ExpandMore> = (props: Props) => (
  <ExpandMore {...props} />
);

const Default = Template.bind({});
Default.args = {};

export { Default };

export default Meta;
