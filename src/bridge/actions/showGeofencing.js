import { callNative } from '../core/callNative'

/**
 * ## showDebugView
 *
 * @supports
 * * Android
 * * iOS
 *
 * @description
 * 디버그 페이지를 띄웁니다.
 */
export async function showGeofencing() {
  await callNative('showGeofencing', undefined, false)
}
