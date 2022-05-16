import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CloudDownloadIcon } from '../index';

const Meta: ComponentMeta<typeof CloudDownloadIcon> = {
  title: 'components/Icon',
  component: CloudDownloadIcon,
};

const Template: ComponentStory<typeof CloudDownloadIcon> = (args) => (
  <CloudDownloadIcon {...args} />
);

const CloudDownload = Template.bind({});

export { CloudDownload };

export default Meta;
