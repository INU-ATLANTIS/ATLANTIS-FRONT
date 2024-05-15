import { callNative } from '../core/callNative'

/**
 * ## removeData
 *
 * @supports
 * * Android
 * * iOS
 *
 * @description
 * 기기에 저장한 값을 삭제합니다.
 */
export async function removeData(key) {
  await callNative('removeData', { key })
}
