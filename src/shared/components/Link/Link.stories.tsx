import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Link, Props } from './Link';

const Meta: ComponentMeta<typeof Link> = {
  title: 'components/Link',
  component: Link,
};

const Template: ComponentStory<typeof Link> = (props: Props) => (
  <Link {...props} href="">
    Ссылка
  </Link>
);

const Default = Template.bind({});
Default.args = {};

export { Default };

export default Meta;
