import type { CSSProperties, ReactElement } from 'react';

interface BaseSideSheetProps {
  open: boolean;
  onClose: () => void;
  title: string;
  headerElements?: ReactElement | ReactElement[];
  width?: CSSProperties['width'];
  children: ReactElement | ReactElement[];
}

interface StandardSideSheetProps extends BaseSideSheetProps {
  type?: 'standard' | undefined;
}

interface ModalSideSheetProps extends BaseSideSheetProps {
  type: 'modal';
  withScrim?: boolean;
  zIndex?: CSSProperties['zIndex'];
}

interface FloatingSideSheetProps extends BaseSideSheetProps {
  type: 'floating';
  zIndex?: CSSProperties['zIndex'];
}

export type SideSheetProps =
  | StandardSideSheetProps
  | ModalSideSheetProps
  | FloatingSideSheetProps;
