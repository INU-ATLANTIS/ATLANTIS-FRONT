export function getPlatform() {
  try {
    const isAndroid =
      navigator.userAgent.match(/Android/i) === null ? false : true
    if (isAndroid) return 'android'

    const isIOS =
      navigator.userAgent.match(/iPhone|iPad|iPod/i) === null ? false : true
    if (isIOS) return 'ios'

    return 'unknown'
  } catch {
    return 'unknown'
  }
}
