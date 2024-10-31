import { inRange, isEmpty, isNumber } from 'lodash'

export function converUnitWithFix({ nums, suffix = '', prefix = '', unit = 'kg' }) {
  if ((nums >= 1000 || nums <= -1000) && unit === 'g')
    unit = 'kg'

  return `${prefix}${toConverUnit(nums, unit)}${unit}${suffix}`
}
export function formatName(result: { name: any, nums: any }) {
  if (isEmpty(result))
    return

  const { name, nums } = result
  if (name === '能量')
    return `${converUnitWithFix({ nums })}${name}`
  return nums === 0 ? `${name}` : `${name}*${nums}`
}
export const formatNumber = (num: number) => num.toFixed(2).replace(/\.?0+$/, '')
// g 转 g
export function toConverUnit(nums: number, unit = 'g') {
  if (!nums || !isNumber(+nums))
    return 0

  if (inRange(Math.abs(nums), 0, 1000) && unit === 'g')
    return nums

  return formatNumber(nums / 1000)
}
