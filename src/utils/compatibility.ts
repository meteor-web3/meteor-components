/**
 * check if user use FireFox browser
 * @returns {boolean}
 */
export function isFireFox(): boolean {
  const { userAgent } = navigator;
  if (userAgent.includes("Firefox")) {
    return true;
  }
  return false;
}

/**
 * check if user use Safari browser
 * @returns {boolean}
 */
export function isSafari(): boolean {
  const { userAgent } = navigator;
  if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) {
    return true;
  }
  return false;
}

/**
 * check if user use IE browser
 * @returns {boolean}
 */
export function isIE(): boolean {
  if ("ActiveXObject" in window) {
    return true;
  }
  return false;
}

/**
 * check if user use Chrome browser
 * @returns {boolean}
 */
export function isChrome(): boolean {
  const { userAgent } = navigator;
  if (
    userAgent.includes("Chrome") &&
    userAgent.includes("Safari") &&
    !userAgent.includes("Edge") &&
    !userAgent.includes("Edg") &&
    !userAgent.includes("QQBrowser")
  ) {
    return true;
  }
  return false;
}

export function isBrave(): boolean {
  const isBrave: boolean = !!(navigator as any).brave;
  return isBrave;
}
