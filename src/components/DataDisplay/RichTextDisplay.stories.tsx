import { StoryFn } from '@storybook/react';

import RichTextDisplay, { RichTextDisplayProps } from './RichTextDisplay';

export default {
  title: 'DataDisplay/RichTextDisplay',
  component: RichTextDisplay,
  argTypes: {
    value: { control: 'text' },
  },
  args: {
    value: `<h2><span style="color: rgb(0, 0, 0)">New car, caviar, four-star daydream</span></h2><h3><a target="_blank" rel="noopener noreferrer nofollow" class="ReferentFragmentdesktop__ClickTarget-sc-110r0d9-0 cehZkS" href="https://genius.com/1554757/Pink-floyd-money/New-car-caviar-four-star-daydream-think-ill-buy-me-a-football-team"><span style="color: rgb(0, 0, 0)"><br></span></a><span style="color: rgb(0, 0, 0)">Think I'll buy me a football team</span></h3><ol><li><p><span style="color: rgb(0, 0, 0)">Money, get back</span></p></li><li><p><span style="color: rgb(0, 0, 0)">I'm </span><strong><span style="color: #ff00f7">alright</span></strong><span style="color: rgb(0, 0, 0)">, Jack, keep your hands off of my stack</span></p></li><li><p><span style="color: rgb(0, 0, 0)">Money, it's a hit</span></p></li><li><p><span style="color: rgb(0, 0, 0)">Ah, don't give me that do-goody-good bullshit</span></p><p></p></li></ol>`,
  },
};

export const Primary: StoryFn<RichTextDisplayProps> = (args) => {
  return <RichTextDisplay {...args} />;
};
