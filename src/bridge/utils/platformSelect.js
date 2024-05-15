import { getPlatform } from '../actions/getPlatform'

export function platformSelect(selector) {
  const platform = getPlatform()
  return selector[platform]
}
