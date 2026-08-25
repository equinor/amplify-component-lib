export const isRichTextEmpty = (html: string) => {
  const el = document.createElement('div');
  el.innerHTML = html;
  return !el.textContent?.trim();
};
