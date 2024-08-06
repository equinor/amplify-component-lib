export function setupIcons(lightFaviconId: string, darkFaviconId: string) {
  const lightIcon = document.querySelector(`link#${lightFaviconId}`);
  const darkIcon = document.querySelector(`link#${darkFaviconId}`);

  function setLight() {
    if (darkIcon && lightIcon) {
      document.head.removeChild(darkIcon);
      document.head.appendChild(lightIcon);
    }
  }

  function setDark() {
    if (darkIcon && lightIcon) {
      document.head.removeChild(lightIcon);
      document.head.appendChild(darkIcon);
    }
  }

  const matcher = window.matchMedia('(prefers-color-scheme:dark)');
  const onUpdate = () => {
    if (matcher.matches) {
      setDark();
    } else {
      setLight();
    }
  };
  matcher.addEventListener('change', onUpdate);
  onUpdate();
}
