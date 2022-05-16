import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Img, Props } from './Img';

const Meta: ComponentMeta<typeof Img> = {
  title: 'components/Img',
  component: Img,
};

const Template: ComponentStory<typeof Img> = (props: Props) => (
  <Img {...props} src="/safari-pinned-tab.svg" width={64} height={64} />
);

const Default = Template.bind({});
Default.args = {};

export { Default };

export default Meta;
