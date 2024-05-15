import { callNative } from '../core/callNative'

/**
 * ## saveData
 *
 * @supports
 * * Android
 * * iOS
 *
 * @description
 * 기기에 값을 저장합니다.
 */
export async function saveData(key, value) {
  await callNative('saveData', { key, value: JSON.stringify(value) })
}
