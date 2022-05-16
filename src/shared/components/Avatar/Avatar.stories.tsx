import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Container, Box } from '../index';
import { Avatar } from './Avatar';

const Meta = {
  title: 'Components/Avatar',
  component: Avatar,
  decorators: [
    (Story) => (
      <Container maxWidth={1274}>
        <Box style={{ margin: '0 auto ', maxWidth: '550px' }}>
          <Story />
        </Box>
      </Container>
    ),
  ],
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

const AvatarWithoutImage = Template.bind({});
AvatarWithoutImage.args = {
  userName: 'Mikhail Krasheninnikov',
};
const AvatarWithImage = Template.bind({});
AvatarWithImage.args = {
  userName: 'Mikhail Krasheninnikov',
  hasImage: true,
};

export { AvatarWithoutImage, AvatarWithImage };

export default Meta;
