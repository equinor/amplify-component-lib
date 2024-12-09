import { AmplifyBar } from './MenuBar/MenuBar';
import { EditorProvider } from './EditorProvider';
import { EditorContent, EditorStyling } from './RichTextEditor.styles';
import { RichTextDisplay } from 'src/molecules/RichTextDisplay/RichTextDisplay';

export { RichTextEditor } from './RichTextEditor';

export const RichText = {
  Styling: EditorStyling,
  Provider: EditorProvider,
  Content: EditorContent,
  Display: RichTextDisplay,
  Bar: AmplifyBar,
};
