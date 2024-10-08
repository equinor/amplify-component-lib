import { withSpacingsMode } from ".storybook/addons/SpacingsAddon/withSpacingsMode.js";

const preview = {
  decorators: [withSpacingsMode],
  globalTypes: {
    spacingsMode: {
      defaultValue: "comfortable",
    },
  },
};

export default preview;