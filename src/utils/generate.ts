import { random } from 'lodash'

// 获取一个与已知数不重复的随机数
function getDistinctRandom(exclude1: number, range: number, exclude2?: number): number {
  let rand
  do rand = random(0, range - 1)
  while (rand === exclude1 || rand === exclude2)
  return rand
}
export function generateRandomNumbers(rollListLength: number): { nums: [number, number, number], level: number } {
  if (rollListLength <= 0)
    throw new Error('rollList length must be greater than 0')

  // 生成第一个随机数
  const num1 = random(0, rollListLength - 1)
  let level = 0
  // 设置阈值来控制重复的概率
  const thresholdOnePair = 0.2 // 20%的概率出现一对
  const thresholdThreeOfAKind = 0.05 // 5%的概率出现三条

  // 根据阈值决定是否生成一对或三条
  let num2 = getDistinctRandom(num1, rollListLength)

  if (Math.random() < thresholdOnePair) {
    num2 = num1 // 生成一对
    level = 1
  }

  let num3 = getDistinctRandom(num1, rollListLength, num2)

  if (Math.random() < thresholdThreeOfAKind) {
    num3 = num1 // 生成三条
    level = 2
  }
  else if (num2 === num1 && Math.random() < thresholdOnePair / 2) {
    num3 = num1 // 如果已经有一对，有一定概率生成三条
    level = 2
  }
  else if (Math.random() < thresholdOnePair) {
    num3 = num2
    level = 1
  } // 生成另一种一对情况

  return {
    nums: [num1, num2, num3],
    level,
  }
}

export function calculateReward(numbers: number[], betAmount: number) {
  // 统计每个数字出现的次数
  const count: any = {}
  numbers.forEach((num) => {
    count[num] = (count[num] || 0) + 1
  })

  let rewardMultiplier = 0

  // 检查是否有三个相同的数字
  for (const num in count) {
    if (count[num] === 3) {
      switch (Number.parseInt(num)) {
        case 0:
          rewardMultiplier = 10 // 三个 a
          break
        case 1:
          rewardMultiplier = 15 // 三个 b
          break
        case 2:
          rewardMultiplier = 30 // 三个 c
          break
        case 3:
          rewardMultiplier = 50 // 三个 d
          break
        case 4:
          rewardMultiplier = 80 // 三个 e
          break
        case 5:
          rewardMultiplier = 100 // 三个 f
          break
      }
      return betAmount * rewardMultiplier
    }
  }

  // 如果没有三个相同的数字，检查是否有两个相同的数字
  for (const num in count) {
    if (count[num] === 2) {
      switch (Number.parseInt(num)) {
        case 0:
          rewardMultiplier = 2 // 两个 a
          break
        case 1:
          rewardMultiplier = 3 // 两个 b
          break
        case 2:
          rewardMultiplier = 5 // 两个 c
          break
        case 3:
          rewardMultiplier = 10 // 两个 d
          break
        case 4:
          rewardMultiplier = 15 // 三个 e
          break
        case 5:
          rewardMultiplier = 20 // 三个 f
          break
      }
      return betAmount * rewardMultiplier
    }
  }

  // 如果没有两个或三个相同的数字，则没有奖励
  return 0
}
