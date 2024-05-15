/**
 * # compareVersion
 *
 * @description
 * 두 버전의 값을 비교합니다.
 *
 * @returns
 * * high : currentVersion이 targetVersion 보다 높음
 * * low : currentVersion이 targetVersion 보다 낮음
 * * equal : currentVersion과 targetVersion이 같음
 */
export function compareVersion(currentVersion, targetVersion) {
  const currentTokens = currentVersion.split('.')
  const targetTokens = targetVersion.split('.')

  for (let i = 0; i < currentTokens.length; ++i) {
    const current = currentTokens[i]
    const target = targetTokens[i]

    if (current > target) {
      return 'high'
    }

    if (current < target) {
      return 'low'
    }
  }
  return 'equal'
}
