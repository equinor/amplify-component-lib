import Image from '@tiptap/extension-image';
import { Plugin, PluginKey } from '@tiptap/pm/state';

declare module '@tiptap/extension-image' {
  interface ImageOptions {
    inline: boolean;
    allowBase64: boolean;
    onImageUpload?: (file: File) => Promise<string>;
  }
}

/* c8 ignore start */
export default Image.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      onImageUpload: undefined,
    };
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
                  .then((src) => {
                    const node = schema.nodes.image.create({
                      src,
                    });
                    const transaction = view.state.tr.insert(
                      coordinates.pos,
                      node
                    );
                    view.dispatch(transaction);
                  })
                  .catch((error) => {
                    console.error('Error uploading image', error);
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
                  .then((src) => {
                    const node = schema.nodes.image.create({
                      src,
                    });
                    const transaction =
                      view.state.tr.replaceSelectionWith(node);
                    view.dispatch(transaction);
                  })
                  .catch((error) => {
                    console.error('Error uploading image', error);
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
