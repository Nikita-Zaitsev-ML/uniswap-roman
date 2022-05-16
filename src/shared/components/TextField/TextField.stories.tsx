import { ComponentStory, ComponentMeta } from '@storybook/react';

import { TextField, Props } from './TextField';

const Meta: ComponentMeta<typeof TextField> = {
  title: 'components/TextField',
  component: TextField,
};

const Template: ComponentStory<typeof TextField> = (props: Props) => (
  <TextField {...props} />
);

const Default = Template.bind({});
Default.args = { id: 'default', label: 'Default' };

const WithLabel = Template.bind({});
WithLabel.args = {
  id: 'outlined-basic',
  label: 'Name',
  placeholder: 'Board name',
  size: 'less-medium',
  InputLabelProps: { shrink: true },
};

const TextArea = Template.bind({});
TextArea.args = {
  id: 'text-area-basic',
  label: 'Description',
  placeholder: 'Board description',
  InputLabelProps: { shrink: true },
  multiline: true,
  rows: 4,
};

export { Default, WithLabel, TextArea };

export default Meta;
