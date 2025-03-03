import { FC, useRef, useState } from 'react';

import { Divider, Icon, Typography } from '@equinor/eds-core-react';
import { youtube_alt } from '@equinor/eds-icons';
import {
  MyTutorialDto,
  useTutorials,
} from '@equinor/subsurface-app-management';

import { TutorialItem } from './TutorialItem';
import { Container, TutorialList } from './Tutorials.styles';
import { TopBarButton } from 'src/organisms/TopBar/TopBar.styles';
import { TopBarMenu } from 'src/organisms/TopBar/TopBarMenu';

interface TutorialsProps {
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
}) => {
  const { allTutorials, tutorialsOnThisPage } = useTutorials();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const filteredAllTutorials = filterTutorials
    ? allTutorials.filter(filterTutorials)
    : allTutorials;
  const filteredTutorialsOnThisPage = filterTutorials
    ? tutorialsOnThisPage.filter(filterTutorials)
    : tutorialsOnThisPage;

  const tutorialsOnOtherPages = filteredAllTutorials.filter(
    (tutorial) =>
      filteredTutorialsOnThisPage.findIndex((t) => t.id === tutorial.id) === -1
  );

  const handleToggleOpen = () => setOpen((prev) => !prev);

  return (
    <>
      <TopBarButton
        variant="ghost_icon"
        ref={buttonRef}
        onClick={handleToggleOpen}
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
              Available Tutorials ({allTutorials.length})
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
            {filteredTutorialsOnThisPage.length > 0 &&
              filteredTutorialsOnThisPage.length > 0 && <Divider />}
            {tutorialsOnOtherPages.length > 0 && (
              <TutorialList>
                <Typography variant="caption">For other pages</Typography>
                {tutorialsOnOtherPages.map((tutorial) => (
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
