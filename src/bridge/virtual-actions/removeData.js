import { safeLocalStorage } from '../../lib/storage'

/**
 * ## virtualRemoveData
 *
 * @description
 * 기기에 저장한 값을 삭제합니다.
 */
export async function virtualRemoveData(key) {
  safeLocalStorage.remove(key)
}
