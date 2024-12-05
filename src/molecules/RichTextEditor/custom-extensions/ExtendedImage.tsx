import Image from '@tiptap/extension-image';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import {
  NodeViewProps,
  NodeViewWrapper,
  ReactNodeViewRenderer,
} from '@tiptap/react';

import { useRichTextImage } from 'src/atoms/hooks/useRichTextImage';
import { ImageExtensionFnProps } from 'src/molecules/RichTextEditor/RichTextEditor.types';

export interface ExtendedImageOptions extends ImageExtensionFnProps {
  inline: boolean;
  allowBase64: boolean;
}

declare module '@tiptap/extension-image' {
  interface ImageOptions extends ImageExtensionFnProps {
    inline: boolean;
    allowBase64: boolean;
  }
}

const Component = (props: NodeViewProps) => {
  const { src, alt } = props.node.attrs;
  const onImageRead: ImageExtensionFnProps['onImageRead'] | undefined =
    props.extension.options.onImageRead;
  const { data: usingSrc } = useRichTextImage(src, onImageRead);

  return (
    <NodeViewWrapper>
      <img src={usingSrc} alt={alt} />
    </NodeViewWrapper>
  );
};

// TODO: Add 'onDelete' handler so it's easier to remove images in the apps
/* c8 ignore start */
export default Image.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      onImageUpload: undefined,
      onImageRead: undefined,
    };
  },
  addNodeView() {
    return ReactNodeViewRenderer(Component);
  },
  addProseMirrorPlugins() {
    const { onImageUpload } = this.options;

    return [
      new Plugin({
        key: new PluginKey('extendedImageHandler'),
        props: {
          handleDOMEvents: {
            drop(view, event) {
              const hasFiles = event.dataTransfer?.files?.length;

              if (!hasFiles || onImageUpload === undefined) {
                return;
              }

              const images = Array.from(event.dataTransfer.files).filter(
                (file) => /image/i.test(file.type)
              );

              if (images.length === 0) {
                return;
              }

              event.preventDefault();

              const { schema } = view.state;
              const coordinates = view.posAtCoords({
                left: event.clientX,
                top: event.clientY,
              });

              if (!coordinates) return;

              for (const image of images) {
                onImageUpload(image)
                  .then((item) => {
                    if (!item) return;
                    const node = schema.nodes.image.create({
                      src: item.src,
                      alt: item.alt,
                    });
                    const transaction = view.state.tr.insert(
                      coordinates.pos,
                      node
                    );
                    view.dispatch(transaction);
                  })
                  .catch((error) => {
                    console.error(error);
                  });
              }
            },
            paste(view, event) {
              const hasFiles = event.clipboardData?.files?.length;

              if (!hasFiles || onImageUpload === undefined) {
                return;
              }

              const images = Array.from(event.clipboardData.files).filter(
                (file) => /image/i.test(file.type)
              );

              if (images.length === 0) {
                return;
              }

              event.preventDefault();

              const { schema } = view.state;

              for (const image of images) {
                onImageUpload(image)
                  .then((item) => {
                    if (!item) return;
                    const node = schema.nodes.image.create({
                      src: item.src,
                      alt: item.src,
                    });
                    const transaction =
                      view.state.tr.replaceSelectionWith(node);
                    view.dispatch(transaction);
                  })
                  .catch((error) => {
                    console.error(error);
                  });
              }
            },
          },
        },
      }),
    ];
  },
});
/* c8 ignore end */
