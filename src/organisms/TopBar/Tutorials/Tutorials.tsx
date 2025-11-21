import { FC, HTMLAttributes, useRef, useState } from 'react';

import { Icon, Typography } from '@equinor/eds-core-react';
import { youtube_alt } from '@equinor/eds-icons';
import {
  MyTutorialDto,
  useTutorials,
} from '@equinor/subsurface-app-management';

import { TutorialItem } from './TutorialItem';
import { Container, TutorialList } from './Tutorials.styles';
import { TopBarButton } from 'src/organisms/TopBar/TopBar.styles';
import { TopBarMenu } from 'src/organisms/TopBar/TopBarMenu';

interface TutorialsProps
  extends Omit<HTMLAttributes<HTMLButtonElement>, 'color' | 'onClick'> {
  onTutorialStart?: (tutorialId: string) => void;
  filterTutorials?: (
    value: MyTutorialDto,
    index: number,
    array: MyTutorialDto[]
  ) => boolean;
}

export const Tutorials: FC<TutorialsProps> = ({
  filterTutorials,
  onTutorialStart,
  ...rest
}) => {
  const { tutorialsOnThisPage } = useTutorials();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const filteredTutorialsOnThisPage = filterTutorials
    ? tutorialsOnThisPage.filter(filterTutorials)
    : tutorialsOnThisPage;

  const handleToggleOpen = () => setOpen((prev) => !prev);

  return (
    <>
      <TopBarButton
        variant="ghost_icon"
        ref={buttonRef}
        onClick={handleToggleOpen}
        {...rest}
      >
        <Icon data={youtube_alt} />
      </TopBarButton>
      {open && (
        <TopBarMenu
          open
          onClose={handleToggleOpen}
          anchorEl={buttonRef.current}
        >
          <Container>
            <Typography variant="h4">
              Available Tutorials ({filteredTutorialsOnThisPage.length})
            </Typography>
            {filteredTutorialsOnThisPage.length > 0 && (
              <TutorialList>
                <Typography variant="caption">For current page</Typography>
                {filteredTutorialsOnThisPage.map((tutorial) => (
                  <TutorialItem
                    key={tutorial.id}
                    onTutorialStart={onTutorialStart}
                    onClose={handleToggleOpen}
                    {...tutorial}
                  />
                ))}
              </TutorialList>
            )}
          </Container>
        </TopBarMenu>
      )}
    </>
  );
};
