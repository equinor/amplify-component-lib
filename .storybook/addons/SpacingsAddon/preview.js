import { withGlobals } from "./withGlobals";

const preview = {
  decorators: [withGlobals],
  globalTypes: {
    spacingsMode: {
      defaultValue: "comfortable",
    },
  },
};

export default preview;