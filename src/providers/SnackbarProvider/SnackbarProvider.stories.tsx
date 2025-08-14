import { Button } from '@equinor/eds-core-react';
import { Meta, StoryFn } from '@storybook/react-vite';

import {
  ShowSnackbar,
  SnackbarProvider,
  useSnackbar,
} from 'src/providers/SnackbarProvider/SnackbarProvider';

import styled from 'styled-components';

const meta: Meta = {
  title: 'Providers/SnackBarProvider',
  argTypes: {
    showSnackBarVariant: {
      control: 'radio',
      options: ['info', 'warning', 'error'],
    },
    showSnackBarText: { control: 'text' },
  },
  args: {
    showSnackBarVariant: 'info',
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

export const Primary: StoryFn<{
  showSnackBarVariant: ShowSnackbar['variant'];
  showSnackBarText: string;
}> = (args) => {
  const { showSnackbar } = useSnackbar();

  const handleOnShowSnackBar = () => {
    showSnackbar({
      text: args.showSnackBarText,
      variant: args.showSnackBarVariant,
    });
  };

  const handleOnShowSnackBarWithAction = () => {
    showSnackbar(
      {
        text: args.showSnackBarText,
        variant: args.showSnackBarVariant,
      },
      {
        action: {
          text: 'Undo',
          handler: () => console.log('Undo action called!'),
        },
      }
    );
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
