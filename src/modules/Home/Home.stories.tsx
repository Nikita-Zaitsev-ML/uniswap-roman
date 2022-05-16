import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Home } from './Home';

const Meta: ComponentMeta<typeof Home> = {
  title: 'modules/Home',
  component: Home,
  parameters: {
    nextRouter: {
      url: '/',
    },
  },
};

const Template: ComponentStory<typeof Home> = (props) => <Home {...props} />;

const Default = Template.bind({});
Default.args = {};

export { Default };

export default Meta;
