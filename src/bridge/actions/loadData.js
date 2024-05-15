import { callNative } from '../core/callNative'

export async function loadData(key) {
  const data = await callNative('loadData', { key })
  return data ?? null
}
