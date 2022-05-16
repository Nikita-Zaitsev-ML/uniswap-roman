import { ComponentStory, ComponentMeta } from '@storybook/react';
import { css } from '@mui/material';

import { Palette, Props } from './Palette';

const Meta: ComponentMeta<typeof Palette> = {
  title: 'components/Palette',
  component: Palette,
};

const Template: ComponentStory<typeof Palette> = (props: Props) => (
  <Palette {...props} />
);

const Default = Template.bind({});
Default.args = {};

const WithSomeItems = Template.bind({});
WithSomeItems.args = {
  items: [
    { identifier: '1', title: 'blue', backgroundColor: '#0079BF' },
    { identifier: '2', title: 'green', backgroundColor: '#519839' },
    {
      identifier: '3',
      title: 'purple',
      backgroundColor: '#88629E',
      checked: true,
    },
    { identifier: '4', title: 'pink', backgroundColor: '#CD5A91' },
    { identifier: '5', title: 'grey', backgroundColor: '#838C91' },
    { identifier: '6', title: 'sky', backgroundColor: '#00AECC' },
    { identifier: '7', title: 'lime', backgroundColor: '#4BBF6B' },
    { identifier: '8', title: 'orange', backgroundColor: '#D29034' },
    { identifier: '9', title: 'red', backgroundColor: '#B04632' },
  ],
};
WithSomeItems.decorators = [
  (Story) => (
    <div
      css={css`
        max-width: 328px;
      `}
    >
      <Story />
    </div>
  ),
];

export { Default, WithSomeItems };

export default Meta;
