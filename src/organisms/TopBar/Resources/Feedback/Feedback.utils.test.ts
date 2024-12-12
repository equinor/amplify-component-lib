import { faker } from '@faker-js/faker';

import { getSeverityEmoji } from './Feedback.utils';
import { UrgencyOption } from 'src/organisms/TopBar/Resources/Feedback/Feedback.types';

const SEVERITY_EMOJI = {
  [UrgencyOption.NO_IMPACT]: ':large_yellow_circle:',
  [UrgencyOption.IMPEDES]: ':large_orange_circle:',
  [UrgencyOption.UNABLE]: ':red_circle:',
};

test('getSeverityEmoji works as expected', async () => {
  const title = faker.animal.dog();
  const description = faker.lorem.sentence();
  for (const urgency of Object.values(UrgencyOption)) {
    expect(getSeverityEmoji({ urgency, title, description })).toBe(
      SEVERITY_EMOJI[urgency]
    );
  }
});
