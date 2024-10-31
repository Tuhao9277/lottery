import { Button, Card, Input, Slider, Typography, message } from 'antd'
import { delay, flatMap, isNumber, subtract, times } from 'lodash'
import { animated, useSpring } from '@react-spring/web'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { SliderSingleProps } from 'antd'
import classnames from 'classnames'
import { calculateReward, generateRandomNumbers } from '@/utils/generate'

const { Title, Paragraph, Text } = Typography

// import { award_list } from '@/utils/prize'

const formatter: NonNullable<SliderSingleProps['tooltip']>['formatter'] = (value) => {
  if (value === 100)
    return 'ALL IN'

  return `${value}%`
}

function easeInOutCubic(t) {
  return t < 0.5 ? 8 * t * t * t * t : 1 - (-2 * t + 2) ** 4 / 2
}
const roll_list = ['🎉', '🌟', '🎁', '💎', '🍀', '🍬']
// const [5,0,1,2,3,4]
const initCoin = localStorage.getItem('coin')
export function Component() {
  const parentRef = useRef({ 1: (i?: any) => {}, 2: (j?: any) => {}, 3: (k?: any) => {} })
  const [inputValue, setInputValue] = useState(0)
  const [coin, setCoin] = useState(isNumber(+initCoin) ? +initCoin : 0)
  const [disabled, setDisabled] = useState(false)
  const [sliderValue, setSliderValue] = useState(0)
  const onClick = () => {
    if (inputValue !== 0) {
      setCoin(subtract(coin, inputValue))
      setDisabled(true)
      const { nums, level } = generateRandomNumbers(roll_list.length)
      // const nums = [5, 5, 5]
      console.log(nums, level)
      Object.values(parentRef?.current).forEach((i, idx) => i?.(nums[idx]))
      delay(() => {
        setDisabled(false)
        setInputValue(0)
        setSliderValue(0)
        const prize = calculateReward(nums, inputValue)
        if (prize === 0)
          message.warning(`竹篮打水一场空`)
        else
          message.success(`恭喜你获得${prize}金币`)
        setCoin(prev => prev + prize)
      }, 5500)
    }
  }
  useEffect(() => {
    localStorage.setItem('coin', `${coin}`)
  }, [coin])

  const onChange = (e) => {
    setInputValue(Number.parseInt(e * 0.01 * coin, 10))
    setSliderValue(e)
  }
  return (
    <div>

      <Card title={`当前积分：${coin}`}>
        <div className={classnames('fixed inset-0 z-11', {
          hidden: !disabled,
        })}
        >
        </div>
        <div className="flex-around relative">
          <Button
            className={classnames('absolute left-0 top-0', {
              hidden: coin !== 0,
            })}
            onClick={() => {
              setCoin(coin => coin + 1000)
            }}
          >
            购买100小来币
          </Button>
          <div>
            下注
            <Input value={inputValue} suffix="小来币" />
            <Slider
              value={sliderValue}
              tooltip={{ formatter }}
              onChange={onChange}
            />
          </div>
          <div
            className="bgContain flex-center relative h-478px w-344px"
            style={{
              backgroundImage: `url('https://us3tmp.laiye.com/ba6b6f57e596a54_1730341484_5725.png')`,
            }}
          >
            <div className="relative grid grid-cols-3 box-border h-271px w-270px border-rd-12px pt-12px">
              <div className="border-rd-top-left-12px border-rd-top-right-12px absolute top-13px z-1 h-90px w-100% from-[#FFF4D2] to-[rgba(255,244,210,0)] bg-gradient-to-b" />
              <div className="absolute left-180px top-13px h-100% w-1px bg-#FFB61B"></div>
              <div className="absolute left-90px top-13px h-100% w-1px bg-#FFB61B"></div>
              {
                Array.from({ length: 3 }).fill('').map((_, index) => {
                  return (
                    <div
                      className="first:border-rd-top-left-12px first:border-rd-bottom-left-12px last:border-rd-top-right-12px last:border-rd-bottom-right-12px h-271px w-100% overflow-hidden bg-[#FFF4D2] text-center text-60px"
                      key={index}
                    >
                      <ListItem key={index} parentRef={parentRef} index={index} />
                    </div>
                  )
                })
            }
            </div>
            <div
              onClick={onClick}
              className="border-2-#AA4F28 absolute bottom-0 left-50% h-54px w-136px translate-x--50% cursor-pointer border-rd-18px bg-#FFFFFF text-center text-22px text-#A5351B font-bold lh-54px shadow-[inset_0px_-3px_0px_0px_#FFCDC1]"
            >
              START
            </div>
          </div>

        </div>
      </Card>
      <Card title="规则说明">
        <Typography>
          <Title level={2}>老虎机积分规则说明</Title>

          <Paragraph>
            本老虎机游戏使用以下六种符号：
            <Text code>["🎉", "🌟", "🎁", "💎", "🍀", "🍬"]</Text>
            。当每次转动结束后，槽内会显示一串符号，依据这些符号的组合来计算玩家的奖励积分。具体规则如下：
          </Paragraph>

          <Title level={3}>奖励规则</Title>

          <Title level={4}>三个相同符号</Title>
          <Paragraph>
            <ul>
              <li>
                三个 🎉 (0) - 乘以原投注金额的
                <Text strong>10 倍</Text>
              </li>
              <li>
                三个 🌟 (1) - 乘以原投注金额的
                <Text strong>15 倍</Text>
              </li>
              <li>
                三个 🎁 (2) - 乘以原投注金额的
                <Text strong>30 倍</Text>
              </li>
              <li>
                三个 💎 (3) - 乘以原投注金额的
                <Text strong>50 倍</Text>
              </li>
              <li>
                三个 🍀 (4) - 乘以原投注金额的
                <Text strong>80 倍</Text>
              </li>
              <li>
                三个 🍬 (5) - 乘以原投注金额的
                <Text strong>100 倍</Text>
              </li>
            </ul>
          </Paragraph>

          <Title level={4}>两个相同符号</Title>
          <Paragraph>
            <ul>
              <li>
                两个 🎉 (0) - 乘以原投注金额的
                <Text strong>2 倍</Text>
              </li>
              <li>
                两个 🌟 (1) - 乘以原投注金额的
                <Text strong>3 倍</Text>
              </li>
              <li>
                两个 🎁 (2) - 乘以原投注金额的
                <Text strong>5 倍</Text>
              </li>
              <li>
                两个 💎 (3) - 乘以原投注金额的
                <Text strong>10 倍</Text>
              </li>
              <li>
                两个 🍀 (4) - 乘以原投注金额的
                <Text strong>15 倍</Text>
              </li>
              <li>
                两个 🍬 (5) - 乘以原投注金额的
                <Text strong>20 倍</Text>
              </li>
            </ul>
          </Paragraph>

          <Title level={4}>无奖励</Title>
          <Paragraph>
            如果未出现上述任意两种或三种相同的符号，则此次转动没有奖励。
          </Paragraph>

          <Title level={3}>示例</Title>
          <Paragraph>
            <ul>
              <li>
                如果转动结果为 ['🎉', '🎉', '🎉']，且投注金额为 10，则奖励为
                <Text code>10 * 10 = 100 积分</Text>
                。
              </li>
              <li>
                如果转动结果为 ['💎', '💎', '🎁']，且投注金额为 10，则奖励为
                <Text code>10 * 10 = 100 积分</Text>
                。
              </li>
              <li>
                如果转动结果为 ['🌟', '🎁', '🍬']，且投注金额为 10，则奖励为
                <Text code>0 积分</Text>
                。
              </li>
            </ul>
          </Paragraph>

          <Paragraph>
            根据以上规则，玩家可以清楚地计算出每次转动后的奖励积分。祝您好运！
          </Paragraph>
        </Typography>
      </Card>
    </div>

  )
}

function ListItem({ index, parentRef }) {
  const liDom = flatMap(times(10, () => roll_list))
  const [style, api] = useSpring(() => ({ y: 0 }))
  // const lastPos = useRef()
  const rolling = useCallback((target: number) => {
    api.start({ y: -90 * (roll_list.length * 6 + target), delay: 100 * index, config: { duration: 5000, easing: easeInOutCubic }, onRest: () => {
      api.set({ y: -90 * target })
    } })
  }, [api, index])
  useEffect(() => {
    if (parentRef)
      parentRef.current[index] = rolling
    return () => {

    }
  }, [rolling, parentRef, index])
  return (
    <div className="w-100% overflow-hidden text-center text-60px lh-90px">
      <animated.div className="flex-center-col" style={style}>{liDom.map((i, idx) => <div className="flex-center h-90px w-100px" key={idx}>{i}</div>)}</animated.div>
    </div>
  )
}
