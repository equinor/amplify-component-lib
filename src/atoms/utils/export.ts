import { RefObject } from 'react';

import html2canvas from 'html2canvas';

// https://stackoverflow.com/a/12300351
function dataURItoBlob(dataURI: string) {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  const byteString = window.atob(dataURI.split(',')[1]);

  // separate out the mime component
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to an ArrayBuffer
  const ab = new ArrayBuffer(byteString.length);

  // create a view into the buffer
  const ia = new Uint8Array(ab);

  // set the bytes of the buffer to the correct values
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  // write the ArrayBuffer to a blob, and you're done
  return new Blob([ab], { type: mimeString });
}

// https://github.com/im-salman/react-component-export-image/blob/master/index.js
export const exportComponent = (
  node: RefObject<HTMLElement>,
  backgroundColor?: string
) => {
  if (!node.current) {
    throw new Error("'node' must be a RefObject");
  }

  const element = node.current;
  const scrollWidth = element.scrollWidth;
  const scrollHeight = element.scrollHeight;

  return html2canvas(element, {
    scrollY: -window.scrollY,
    useCORS: true,
    backgroundColor: backgroundColor ? backgroundColor : '#FFFFFF',
    width: scrollWidth,
    height: scrollHeight,
  }).then((canvas) => {
    return dataURItoBlob(canvas.toDataURL('image/png', 1.0));
  });
};
