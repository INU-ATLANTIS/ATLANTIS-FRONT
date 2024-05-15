import { safeLocalStorage } from '../../lib/storage'

/**
 * ## virtualSaveData
 *
 * @description
 * 기기에 값을 저장합니다.
 */
export async function virtualSaveData(key, value) {
  safeLocalStorage.set(key, JSON.stringify(value))
}
