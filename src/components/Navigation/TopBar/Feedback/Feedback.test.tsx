// import React, { ReactElement } from 'react';
//
// import { thumbs_up_down } from '@equinor/eds-icons';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
//
// import { act, render, screen, userEvent } from '../../../../tests/test-utils';
// import Feedback from './Feedback';
//
// function WrapperProvider({ children }: { children: ReactElement }) {
//   const queryClient = new QueryClient();
//
//   return (
//     <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
//   );
// }
//
// test('renders feedback button and panel correctly', async () => {
//   render(<Feedback />, { wrapper: WrapperProvider });
//   const icons = screen.getAllByTestId('eds-icon-path');
//
//   expect(icons[0]).toHaveAttribute('d', thumbs_up_down.svgPathData);
//   expect(screen.queryByText('Amplify feedback form')).not.toBeInTheDocument();
//   const button = screen.getByRole('button');
//   await act(async () => {
//     await userEvent.click(button);
//   });
//   expect(screen.queryByText('Amplify feedback form')).toBeVisible();
// });
