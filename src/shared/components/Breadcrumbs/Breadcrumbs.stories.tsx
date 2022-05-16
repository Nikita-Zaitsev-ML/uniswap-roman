import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Breadcrumbs, Props } from './Breadcrumbs';

const Meta: ComponentMeta<typeof Breadcrumbs> = {
  title: 'components/Breadcrumbs',
  component: Breadcrumbs,
};

const Template: ComponentStory<typeof Breadcrumbs> = (props: Props) => (
  <Breadcrumbs {...props} />
);

const Default = Template.bind({});
Default.args = { items: [] };

const WithSomeItems = Template.bind({});
WithSomeItems.args = {
  items: [
    {
      key: 'Breadcrumb1',
      href: '/mock',
      children: 'Breadcrumb1',
      color: '#000',
    },
    { key: 'Breadcrumb2', href: '/mock', children: 'Breadcrumb2' },
    { key: 'Breadcrumb3', href: '/mock', children: 'Breadcrumb3' },
  ],
};

export { Default, WithSomeItems };

export default Meta;
