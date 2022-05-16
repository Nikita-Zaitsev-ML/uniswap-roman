import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SadEmoticon } from '../index';

const Meta: ComponentMeta<typeof SadEmoticon> = {
  title: 'components/Icon',
  component: SadEmoticon,
};

const Template: ComponentStory<typeof SadEmoticon> = (args) => (
  <SadEmoticon {...args} />
);

const Sad = Template.bind({});

export { Sad };

export default Meta;
