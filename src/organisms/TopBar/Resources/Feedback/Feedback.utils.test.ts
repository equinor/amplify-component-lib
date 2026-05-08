import { BugSeverity } from '@equinor/subsurface-app-management';
import { faker } from '@faker-js/faker';

import { getSeverityEmoji } from './Feedback.utils';

const SEVERITY_EMOJI = {
  [BugSeverity.DOES_NOT_AFFECT_ME]: ':large_yellow_circle:',
  [BugSeverity.IMPEDES_MY_PROGRESS]: ':large_orange_circle:',
  [BugSeverity.UNABLE_TO_WORK]: ':red_circle:',
};

test('getSeverityEmoji works as expected', async () => {
  const title = faker.animal.dog();
  const description = faker.lorem.sentence();
  for (const urgency of Object.values(BugSeverity)) {
    expect(getSeverityEmoji({ urgency, title, description })).toBe(
      SEVERITY_EMOJI[urgency]
    );
  }
});
