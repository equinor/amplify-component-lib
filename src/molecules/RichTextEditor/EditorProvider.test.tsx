import { faker } from '@faker-js/faker';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { waitFor } from '@testing-library/dom';
import type { Editor } from '@tiptap/react';

import {
  createFileFromDataUrl,
  EditorProvider,
  EditorProviderProps,
  replaceImageSrcInEditor,
  replaceTrackedImage,
} from './EditorProvider';
import { RichTextEditorFeatures } from './RichTextEditor.types';
import {
  renderWithProviders,
  screen,
  userEvent,
} from 'src/tests/browsertest-utils';

function fakeImageUrl() {
  return `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==`;
}

type TestEditorProps = Omit<EditorProviderProps, 'children'>;

function TestEditorComponent({ ...props }: TestEditorProps) {
  return (
    <EditorProvider {...props}>
      {(editor) => (
        <div data-testid="editor-wrapper">
          <div data-testid="editor-content" className="tiptap">
            {editor.getHTML()}
          </div>
          <button
            data-testid="insert-image-btn"
            onClick={() => {
              editor.commands.insertContent({
                type: 'image',
                attrs: { src: fakeImageUrl() },
              });
            }}
          >
            Insert Image
          </button>
          <button data-testid="undo-btn" onClick={() => editor.commands.undo()}>
            Undo
          </button>
          <button
            data-testid="type-text-btn"
            onClick={() => editor.commands.insertContent('test text')}
          >
            Type Text
          </button>
        </div>
      )}
    </EditorProvider>
  );
}

describe('EditorProvider image handling', () => {
  test('Normal typing does not trigger image upload', async () => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    const onImageUpload = vi.fn();
    const onImageRead = vi.fn();

    renderWithProviders(
      <QueryClientProvider client={queryClient}>
        <TestEditorComponent
          content="<p></p>"
          features={[RichTextEditorFeatures.IMAGES]}
          onImageUpload={onImageUpload}
          onImageRead={onImageRead}
        />
      </QueryClientProvider>
    );

    await waitFor(() => screen.getByTestId('type-text-btn'));

    const typeBtn = screen.getByTestId('type-text-btn');
    const user = userEvent.setup();

    // Type text multiple times
    await user.click(typeBtn);
    await user.click(typeBtn);
    await user.click(typeBtn);

    await waitFor(() => {
      expect(screen.getByTestId('editor-content')).toBeInTheDocument();
    });

    // onImageUpload should NOT have been called
    expect(onImageUpload).not.toHaveBeenCalled();
  });

  test('Undo recovery of deleted image triggers upload exactly once', async () => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    const imageSrc = fakeImageUrl();
    queryClient.setQueryData([imageSrc], imageSrc);

    const onImageUpload = vi.fn().mockResolvedValue({
      src: `https://example.com/uploaded-${faker.string.uuid()}.png`,
      alt: '',
    });
    const onImageRead = vi.fn();
    const onRemovedImagesChange = vi.fn();

    renderWithProviders(
      <QueryClientProvider client={queryClient}>
        <TestEditorComponent
          content="<p></p>"
          features={[RichTextEditorFeatures.IMAGES]}
          onImageUpload={onImageUpload}
          onImageRead={onImageRead}
          onRemovedImagesChange={onRemovedImagesChange}
        />
      </QueryClientProvider>
    );

    await waitFor(() => screen.getByTestId('insert-image-btn'));

    const user = userEvent.setup();
    const insertBtn = screen.getByTestId('insert-image-btn');
    const undoBtn = screen.getByTestId('undo-btn');

    // Insert an image
    await user.click(insertBtn);
    await waitFor(() => expect(onImageUpload).not.toHaveBeenCalled(), {
      timeout: 500,
    });

    // Remove the image, so it is tracked as deleted
    await user.click(undoBtn);

    // Re-insert the same data URL image, which should be treated as recovered
    await user.click(insertBtn);

    await waitFor(
      () => {
        expect(onImageUpload).toHaveBeenCalledTimes(1);
      },
      { timeout: 1000 }
    );
  });

  test('Multiple same images inserted do not create duplicate uploads', async () => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    const onImageUpload = vi.fn().mockResolvedValue({
      src: `https://example.com/uploaded-${faker.string.uuid()}.png`,
      alt: '',
    });
    const onImageRead = vi.fn();

    renderWithProviders(
      <QueryClientProvider client={queryClient}>
        <TestEditorComponent
          content="<p></p>"
          features={[RichTextEditorFeatures.IMAGES]}
          onImageUpload={onImageUpload}
          onImageRead={onImageRead}
        />
      </QueryClientProvider>
    );

    await waitFor(() => screen.getByTestId('insert-image-btn'));

    const user = userEvent.setup();
    const insertBtn = screen.getByTestId('insert-image-btn');

    // Insert same image multiple times
    await user.click(insertBtn);
    await user.click(insertBtn);
    await user.click(insertBtn);

    await waitFor(() => {
      expect(screen.getByTestId('editor-content')).toBeInTheDocument();
    });

    // onImageUpload should NOT have been called (images are not uploaded on insert with data URLs)
    expect(onImageUpload).not.toHaveBeenCalled();
  });

  test('onRemovedImagesChange is only called when images are actually deleted', async () => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    const onImageUpload = vi.fn().mockResolvedValue({
      src: `https://example.com/uploaded-${faker.string.uuid()}.png`,
      alt: '',
    });
    const onImageRead = vi.fn();
    const onRemovedImagesChange = vi.fn();

    renderWithProviders(
      <QueryClientProvider client={queryClient}>
        <TestEditorComponent
          content="<p></p>"
          features={[RichTextEditorFeatures.IMAGES]}
          onImageUpload={onImageUpload}
          onImageRead={onImageRead}
          onRemovedImagesChange={onRemovedImagesChange}
        />
      </QueryClientProvider>
    );

    await waitFor(() => screen.getByTestId('type-text-btn'));

    const user = userEvent.setup();
    const typeBtn = screen.getByTestId('type-text-btn');

    // Type text without deleting images
    await user.click(typeBtn);
    await user.click(typeBtn);

    await waitFor(() => {
      expect(screen.getByTestId('editor-content')).toBeInTheDocument();
    });

    // onRemovedImagesChange should NOT be called when nothing is deleted
    expect(onRemovedImagesChange).not.toHaveBeenCalled();
  });

  test('Editor continues to function after image operations', async () => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    const onImageUpload = vi.fn().mockResolvedValue({
      src: `https://example.com/uploaded-${faker.string.uuid()}.png`,
      alt: '',
    });
    const onImageRead = vi.fn();

    renderWithProviders(
      <QueryClientProvider client={queryClient}>
        <TestEditorComponent
          content="<p>Initial content</p>"
          features={[RichTextEditorFeatures.IMAGES]}
          onImageUpload={onImageUpload}
          onImageRead={onImageRead}
        />
      </QueryClientProvider>
    );

    await waitFor(() => screen.getByTestId('insert-image-btn'));

    const user = userEvent.setup();
    const insertBtn = screen.getByTestId('insert-image-btn');
    const typeBtn = screen.getByTestId('type-text-btn');

    // Insert image
    await user.click(insertBtn);

    // Type more text
    await user.click(typeBtn);

    // Verify editor still responds
    const editorWrapper = screen.getByTestId('editor-wrapper');
    expect(editorWrapper).toBeInTheDocument();

    // The editor should still have content
    const content = screen.getByTestId('editor-content');
    expect(content).toBeInTheDocument();
  });

  test('Logs and continues when upload during recovery fails', async () => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    const imageSrc = fakeImageUrl();
    queryClient.setQueryData([imageSrc], imageSrc);

    const uploadError = new Error('upload failed');
    const onImageUpload = vi.fn().mockRejectedValue(uploadError);
    const onImageRead = vi.fn();
    const onRemovedImagesChange = vi.fn();
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);

    renderWithProviders(
      <QueryClientProvider client={queryClient}>
        <TestEditorComponent
          content="<p></p>"
          features={[RichTextEditorFeatures.IMAGES]}
          onImageUpload={onImageUpload}
          onImageRead={onImageRead}
          onRemovedImagesChange={onRemovedImagesChange}
        />
      </QueryClientProvider>
    );

    await waitFor(() => screen.getByTestId('insert-image-btn'));

    const user = userEvent.setup();
    const insertBtn = screen.getByTestId('insert-image-btn');
    const undoBtn = screen.getByTestId('undo-btn');

    await user.click(insertBtn);

    await waitFor(() => expect(onImageUpload).not.toHaveBeenCalled(), {
      timeout: 500,
    });

    await user.click(undoBtn);

    await waitFor(() => {
      expect(onRemovedImagesChange).toHaveBeenCalled();
    });

    await user.click(insertBtn);

    await waitFor(() => {
      expect(onImageUpload).toHaveBeenCalledTimes(1);
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Failed to upload and replace image:',
        uploadError
      );
    });

    consoleErrorSpy.mockRestore();
  });

  test('Skips replacement when uploaded src equals original src', async () => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    const imageSrc = fakeImageUrl();
    queryClient.setQueryData([imageSrc], imageSrc);

    const onImageUpload = vi.fn().mockResolvedValue({
      src: imageSrc,
      alt: undefined,
    });
    const onImageRead = vi.fn();
    const onRemovedImagesChange = vi.fn();

    renderWithProviders(
      <QueryClientProvider client={queryClient}>
        <TestEditorComponent
          content="<p></p>"
          features={[RichTextEditorFeatures.IMAGES]}
          onImageUpload={onImageUpload}
          onImageRead={onImageRead}
          onRemovedImagesChange={onRemovedImagesChange}
        />
      </QueryClientProvider>
    );

    await waitFor(() => screen.getByTestId('insert-image-btn'));

    const user = userEvent.setup();
    const insertBtn = screen.getByTestId('insert-image-btn');
    const undoBtn = screen.getByTestId('undo-btn');

    await user.click(insertBtn);

    await waitFor(() => expect(onImageUpload).not.toHaveBeenCalled(), {
      timeout: 500,
    });

    await user.click(undoBtn);

    await waitFor(() => {
      expect(onRemovedImagesChange).toHaveBeenCalled();
    });

    await user.click(insertBtn);

    await waitFor(() => {
      expect(onImageUpload).toHaveBeenCalledTimes(1);
    });
  });
});

describe('EditorProvider helper functions', () => {
  test('createFileFromDataUrl returns null when mime match is missing', () => {
    const file = createFileFromDataUrl('invalid-data-url', 'image.png');

    expect(file).toBeNull();
  });

  test('replaceTrackedImage replaces only the matching source', () => {
    const result = replaceTrackedImage(
      ['old-src', 'keep-src'],
      'old-src',
      'new-src'
    );

    expect(result).toEqual(['new-src', 'keep-src']);
  });

  test('replaceImageSrcInEditor returns early when old and new src match', () => {
    const descendants = vi.fn();
    const dispatch = vi.fn();

    const editor = {
      state: {
        tr: {},
        doc: { descendants },
      },
      view: { dispatch },
    } as unknown as Editor;

    replaceImageSrcInEditor(editor, 'same-src', 'same-src');

    expect(descendants).not.toHaveBeenCalled();
    expect(dispatch).not.toHaveBeenCalled();
  });

  test('replaceImageSrcInEditor preserves existing alt when uploaded alt is undefined', () => {
    const setNodeMarkup = vi.fn();
    const transaction = {
      setNodeMarkup,
    };

    setNodeMarkup.mockReturnValue(transaction);

    const descendants = vi.fn((callback) => {
      callback(
        {
          type: { name: 'image' },
          attrs: { src: 'old-src', alt: 'existing-alt' },
        },
        3
      );
    });
    const dispatch = vi.fn();

    const editor = {
      state: {
        tr: transaction,
        doc: { descendants },
      },
      view: { dispatch },
    } as unknown as Editor;

    replaceImageSrcInEditor(editor, 'old-src', 'new-src');

    expect(setNodeMarkup).toHaveBeenCalledWith(3, undefined, {
      src: 'new-src',
      alt: 'existing-alt',
    });
    expect(dispatch).toHaveBeenCalledWith(transaction);
  });
});
