import { Typography } from '@equinor/eds-core-react';
import { Meta, StoryFn } from '@storybook/react-vite';

import styled from 'styled-components';

const hookList = [
  {
    name: 'useFaqsInApplication',
    body: 'Returns useQuery hook that fetches FAQs in the app you are in now',
    code: `const { data, isLoading, ... } = useFaqsInApplication();`,
  },
  {
    name: 'useStepper',
    body: 'Returns stepper methods and state',
    code: `const {  
     steps: [Step, Step, ...Step[]];
     currentStep: number;
     currentSubStep: number;
     setCurrentStep: (value: number) => void;
     goToNextStep: () => void;
     goToPreviousStep: () => void; } = useStepper()`,
  },
  {
    name: 'useThemeProvider',
    body: 'Returns theme and setTheme',
    code: `const { theme, setTheme } = useThemeProvider()`,
  },
  {
    name: 'useAmplifyKit',
    body: 'Returns TipTap extensions based on what you pass',
    code: `const extensions = useAmplifyKit({
       features,
       placeholder,
       onImageUpload,
       onImageRead 
     });`,
  },
  {
    name: 'useSignalRMessages',
    body: 'Returns service bus messages with wss given a topic + host + token',
    code: `const {
     messages,
     hasUnreadMessages,
     setMessageAsRead,
     setAllMessagesAsRead,
     deleteMessage } = useSignalRMessages<MessageDto>('recap_notifications', 'url', 'token')`,
  },
  {
    name: 'usePrevious',
    body: 'Returns the previous of a given state',
    code: 'const previousValue = usePrevious(value)',
  },
  {
    name: 'useDebounce',
    body: 'Debounces some state',
    code: 'const debouncedValue = useDebounce(value)',
  },
  {
    name: 'useLocalStorage',
    body: 'A state that also saves to local storage',
    code: 'const [value, setValue] = useLocalStorage(key, initialValue)',
  },
  {
    name: 'useOnScreen',
    body: 'Return isIntersecting boolean',
    code: 'const isOnScreen = useOnScreen(buttonRef)',
  },
  {
    name: 'useAuth',
    body: 'Returns auth object from AuthProvider',
    code: 'const { account } = useAuth()',
  },
  {
    name: 'useSideBar',
    body: 'Returns isOpen from SideBarProvider',
    code: 'const { isOpen } = useSideBar()',
  },
  {
    name: 'useSnackbar',
    body: 'Returns showSnackbar function',
    code: `const { showSnackbar } = useSnackbar();

...

showSnackbar(text: string, customProps?: SnackbarProps)\`,
showSnackbar(object: ShowSnackbar, customProps?: SnackbarProps)`,
  },
  {
    name: 'useToasts',
    body: 'Returns showToast function',
    code: `const { showToast } = useToasts();

...

showToast(text: string)
showToast(object: ToastProps)`,
  },
];

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  > div {
    display: flex;
    align-items: center;
    gap: 4px;
  }
  code {
    background: #3d3d3d;
    padding: 24px;
    color: white;
    font-family: monospace;
    display: block;
    white-space: pre-wrap;
  }
`;

const Divider = styled.hr`
  height: 1px;
  background: #3d3d3d;
  width: 100%;
  border: none;
`;

const List = () => (
  <Container>
    <div>
      <Typography variant="h1">List of all hooks</Typography>
      <Divider />
    </div>
    {hookList.map((hook) => (
      <Content key={hook.name}>
        <div>
          <Typography variant="h3">{hook.name}</Typography>-
          <Typography>{hook.body}</Typography>
        </div>
        <code>{hook.code}</code>
      </Content>
    ))}
  </Container>
);

const meta: Meta = {
  title: 'Atoms/Hooks',
  component: List,
};

export default meta;

export const Primary: StoryFn = () => <List />;
