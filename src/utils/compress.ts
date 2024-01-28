export const MAX_WIDTH = 1920;
export const MAX_HEIGHT = 1080;

/**
 * to solve the img display
 * @param {string} src img url
 * @param {HTMLImageElement} el img element
 * @param {boolean} isError if load error happen
 * @param {Function} onLoad do something when img load successly
 * @param {Function} setIsLoaded setState hook function
 * @returns {void}
 */
export default function compress(
  src: string,
  el: HTMLImageElement,
  isError?: boolean,
  onLoad?: () => void,
  setIsLoaded?: (isLoaded: boolean) => void,
): void {
  if (el.naturalHeight <= MAX_HEIGHT && el.naturalWidth <= MAX_WIDTH) {
    if (el.naturalHeight !== 0) {
      el.style.visibility = "visible";
      onLoad?.();
      setIsLoaded?.(true);
    }
    if (isError) {
      el.src = src;
    }
    return;
  }
  const image = new Image();
  image.addEventListener("load", () => {
    const canvas = document.createElement("canvas");
    if (image.height > MAX_HEIGHT && image.height >= image.width) {
      image.width *= MAX_HEIGHT / image.height;
      image.height = MAX_HEIGHT;
    }
    if (image.width > MAX_HEIGHT && image.width > image.height) {
      image.height *= MAX_HEIGHT / image.width;
      image.width = MAX_HEIGHT;
    }
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, image.width, image.height);
    const src = canvas.toDataURL("image/png");
    el.src = src;
    onLoad?.();
    setIsLoaded?.(true);
  });
  image.setAttribute("crossOrigin", "anonymous");
  image.src = src;
}
