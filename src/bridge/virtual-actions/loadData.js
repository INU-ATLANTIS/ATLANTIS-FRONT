import { safeLocalStorage } from '../../lib/storage'

export async function virtualLoadData(key) {
  const data = safeLocalStorage.get(key)
  if (!!data) {
    return JSON.parse(data) ?? null
  }
  return null
}
