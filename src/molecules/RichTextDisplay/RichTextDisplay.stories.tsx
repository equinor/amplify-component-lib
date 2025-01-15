import { Meta, StoryFn } from '@storybook/react';

import { RichText } from 'src/molecules';
import {
  RichTextDisplay,
  RichTextDisplayProps,
} from 'src/molecules/RichTextDisplay/RichTextDisplay';

const meta: Meta<typeof RichTextDisplay> = {
  title: 'Molecules/RichTextDisplay',
  component: RichTextDisplay,
  argTypes: {
    value: { control: 'text' },
  },
  args: {
    value: `<h2>New car, caviar, four-star daydream</h2><h3><a target="_blank" rel="noopener noreferrer nofollow" class="ReferentFragmentdesktop__ClickTarget-sc-110r0d9-0 cehZkS" href="https://genius.com/1554757/Pink-floyd-money/New-car-caviar-four-star-daydream-think-ill-buy-me-a-football-team"></a>Think I'll buy me a football team</h3><ol><li><p>Money, get back</p></li><li><p>I'm <strong><span style="color: #ff00f7">alright</span></strong>, Jack, keep your hands off of my stack</p></li><li><p>Money, it's a hit</p></li><li><p>Ah, don't give me that do-goody-good bullshit</p><p></p></li></ol>`,
  },
};

export default meta;

export const Primary: StoryFn<RichTextDisplayProps> = (args) => {
  return <RichTextDisplay {...args} />;
};

export const CompoundComponents: StoryFn<RichTextDisplayProps> = (args) => {
  return (
    <RichText.Display {...args}>
      {(editor) => {
        return (
          <RichText.Styling
            $lightBackground={args.lightBackground}
            $padding={args.padding}
          >
            <RichText.Content editor={editor} readOnly />
          </RichText.Styling>
        );
      }}
    </RichText.Display>
  );
};
