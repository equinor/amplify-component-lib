import { Button } from '@equinor/eds-core-react';
import { Meta, StoryFn } from '@storybook/react';

import { SnackbarProvider, useSnackbar } from 'src/providers/SnackbarProvider';

import styled from 'styled-components';

const meta: Meta = {
  title: 'Providers/SnackBarProvider',
  argTypes: {
    showSnackBarText: { control: 'text' },
  },
  args: {
    showSnackBarText: 'Some text!',
  },
};

export default meta;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  gap: 8px;
`;

export const Primary: StoryFn<{ showSnackBarText: string }> = (args) => {
  const { showSnackbar } = useSnackbar();

  const handleOnShowSnackBar = () => {
    showSnackbar(args.showSnackBarText);
  };

  const handleOnShowSnackBarWithAction = () => {
    showSnackbar(args.showSnackBarText, {
      action: {
        text: 'Undo',
        handler: () => console.log('Undo action called!'),
      },
    });
  };

  return (
    <SnackbarProvider>
      <Container>
        <Button onClick={handleOnShowSnackBar}>Show snackbar</Button>
        <Button onClick={handleOnShowSnackBarWithAction}>
          Show snackbar with action
        </Button>
      </Container>
    </SnackbarProvider>
  );
};
