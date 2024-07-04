import { useNotification } from '../components/Navigation/TopBar/Notifications/NotificationProvider';
import { useAuth } from '../providers/AuthProvider/AuthProvider';
import { useReleaseNotes } from '../providers/ReleaseNotesProvider';
import { useSideBar } from '../providers/SideBarProvider';
import { useSnackbar } from '../providers/SnackbarProvider';
import { useTableOfContents } from '../providers/TableOfContentsProvider';
import { useTutorialSteps } from '../providers/TutorialStepsProvider';
import { useDebounce } from './useDebounce';
import { useFakeProgress } from './useFakeProgress';
import { useFeatureToggling } from './useFeatureToggling';
import { useLocalStorage } from './useLocalStorage';
import { useOnScreen, useOnScreenMultiple } from './useOnScreen';
import { usePrevious } from './usePrevious';
import { useReleaseNotesQuery } from './useReleaseNotesQuery';
import { useSignalRMessages } from './useSignalRMessages';
import { useSelect } from 'src/hooks/useSelect';
import { useFeatures } from 'src/hooks/useFeatures';
import { useAmplifyKit } from 'src/hooks/useAmplifyKit';
import { useEditor } from '@tiptap/react';

export {
  useAuth,
  useSelect,
  useDebounce,
  useFakeProgress,
  useFeatureToggling,
  useFeatures,
  useAmplifyKit,
  useEditor,
  useLocalStorage,
  useNotification,
  useOnScreen,
  useOnScreenMultiple,
  useTableOfContents,
  usePrevious,
  useReleaseNotes,
  useReleaseNotesQuery,
  useSideBar,
  useSignalRMessages,
  useSnackbar,
  useTutorialSteps,
};
