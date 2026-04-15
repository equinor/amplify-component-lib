import { Typography } from '@equinor/eds-core-react';
import { Meta, StoryFn } from '@storybook/react-vite';

import { RichTextDisplay } from 'src/molecules/RichTextDisplay/RichTextDisplay';

export const Docs: StoryFn = () => (
  <div>
    <Typography variant="h3">Spacings modes</Typography>
    <Typography>
      The spacings are defined with comfortable/compact/extra-compact modes. If
      you wish to override what the current spacings mode should be you can do
      this:
    </Typography>
    <br />
    <RichTextDisplay
      value={`<pre><code>import { SpacingsMode, spacings } from "@equinor/amplify-component-lib";

&lt;div data-spacings-mode={SpacingsMode.COMPACT}&gt;
  &lt;Typography style={{ margin: spacings.medium }}&gt;
    Text
  &lt;/Typography&gt;
&lt;/div&gt; </code></pre>`}
    />
    <Typography>
      This will also affect the spacings of the components using the spacings
      tokens, which should include all the components in ACL
    </Typography>
  </div>
);
const meta: Meta = {
  title: 'Atoms/Style/Spacings',
  render: Docs,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: '',
    },
  },
  args: {},
};

export default meta;
