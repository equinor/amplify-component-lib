import { AmplifyKit } from './custom-extensions/AmplifyKit';
import { AmplifyBar } from './MenuBar/MenuBar';
import { EditorProvider } from './EditorProvider';
import { EditorContent, EditorStyling } from './RichTextEditor.styles';

export { RichTextEditor } from './RichTextEditor';

export const RichText = {
  Styling: EditorStyling,
  Provider: EditorProvider,
  Content: EditorContent,
  Bar: AmplifyBar,
  Kit: AmplifyKit,
};
