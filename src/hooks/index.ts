import { useAuth } from '../providers/AuthProvider/AuthProvider';
import { useSideBar } from '../providers/SideBarProvider';
import { useSnackbar } from '../providers/SnackbarProvider';
import { useTutorialSteps } from '../providers/TutorialStepsProvider';
import { useDebounce } from './useDebounce';
import { useNotifications } from './useNotifications';
import { useOnScreen, useOnScreenMultiple } from './useOnScreen';
import { usePrevious } from './usePrevious';
import { useLocalStorage } from 'src/hooks/useLocalStorage';

export {
  useAuth,
  useDebounce,
  useLocalStorage,
  useNotifications,
  useOnScreen,
  useOnScreenMultiple,
  usePrevious,
  useSideBar,
  useSnackbar,
  useTutorialSteps,
};
