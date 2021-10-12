import {
  Title,
  Description,
  Primary,
  Stories,
} from '@storybook/addon-docs/blocks';

import { Meta, Story } from '@storybook/react';
import FileUpload from '.';

export default {
  title: 'FileUpload/Full File uploading example with Hook',
  component: FileUpload,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title>
            Example of how to use FileUploadArea, FileProgress, and the
            useFileUpload hook
          </Title>
          <Description>
            This example use the components UploadFileArea, and
            UploadFileProgress. It also includes a neat hook called
            useFileUpload that makes it easy to have controll over the files.
            The hook takes inn the api calls that the hook will use to upload
            files and delete files. From the hook you will get the list of
            files, and functions for uploading files, adding rejected files that
            comes from drop-zone, deleting a file, and to retry if a file fails.
          </Description>
          <Primary />
          <Stories />
        </>
      ),
    },
  },
} as Meta;

const Template: Story = () => <FileUpload />;

export const Test = Template.bind({});
