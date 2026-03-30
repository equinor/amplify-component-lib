import { ReactElement } from 'react';

interface BaseSideSheetProps {
  open: boolean;
  onClose: () => void;
  title: string;
  headerElements?: ReactElement | ReactElement[];
  children: ReactElement | ReactElement[];
}

interface StandardSideSheetProps extends BaseSideSheetProps {
  type?: 'standard' | undefined;
}

interface ModalSideSheetProps extends BaseSideSheetProps {
  type: 'modal';
  withScrim?: boolean;
}

interface FloatingSideSheetProps extends BaseSideSheetProps {
  type: 'floating';
}

export type SideSheetProps =
  | StandardSideSheetProps
  | ModalSideSheetProps
  | FloatingSideSheetProps;
