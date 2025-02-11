import { FC, useRef, useState } from 'react';

import { Divider, Icon, Typography } from '@equinor/eds-core-react';
import { youtube_alt } from '@equinor/eds-icons';
import { useTutorials } from '@equinor/subsurface-app-management';

import { TutorialItem } from './TutorialItem';
import { Container, TutorialList } from './Tutorials.styles';
import { TopBarButton } from 'src/organisms/TopBar/TopBar.styles';
import { TopBarMenu } from 'src/organisms/TopBar/TopBarMenu';

export const Tutorials: FC = () => {
  const { allTutorials, tutorialsOnThisPage } = useTutorials();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const tutorialsOnOtherPages = allTutorials.filter(
    (tutorial) =>
      tutorialsOnThisPage.findIndex((t) => t.id === tutorial.id) === -1
  );

  const handleToggleOpen = () => setOpen((prev) => !prev);

  return (
    <>
      <TopBarButton
        variant="ghost_icon"
        ref={buttonRef}
        id="anchor-match"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls="menu-match"
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
            {tutorialsOnThisPage.length > 0 && (
              <TutorialList>
                <Typography variant="caption">For current page</Typography>
                {tutorialsOnThisPage.map((tutorial) => (
                  <TutorialItem
                    key={tutorial.id}
                    onClose={handleToggleOpen}
                    {...tutorial}
                  />
                ))}
              </TutorialList>
            )}
            {tutorialsOnThisPage.length > 0 &&
              tutorialsOnOtherPages.length > 0 && <Divider />}
            {tutorialsOnOtherPages.length > 0 && (
              <TutorialList>
                <Typography variant="caption">For other pages</Typography>
                {tutorialsOnOtherPages.map((tutorial) => (
                  <TutorialItem
                    key={tutorial.id}
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
