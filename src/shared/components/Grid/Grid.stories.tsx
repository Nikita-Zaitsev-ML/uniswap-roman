import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Grid, Props } from './Grid';

const Meta: ComponentMeta<typeof Grid> = {
  title: 'components/Grid',
  component: Grid,
};

const Template: ComponentStory<typeof Grid> = (props: Props) => (
  <Grid {...props} />
);

const Default = Template.bind({});
Default.args = {};

export { Default };

export default Meta;
