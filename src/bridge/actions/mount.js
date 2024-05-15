import { callNative } from '../core/callNative'
/**
 * ## mount
 *
 * @supports
 * * Android
 * * iOS
 *
 * @description
 * HXAP가 사용가능한 상태임을 알립니다.
 */
export async function mount() {
  await callNative('mount')
}
