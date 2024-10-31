import { Card } from 'antd'
import { flatMap, random, times } from 'lodash'
import { animated, useSpring } from '@react-spring/web'
import { useCallback, useState } from 'react'

// import { award_list } from '@/utils/prize'

function easeInOutCubic(t) {
  return t < 0.5 ? 8 * t * t * t * t : 1 - (-2 * t + 2) ** 4 / 2
}
const roll_list = ['🎉', '🌟', '🎁', '💎', '🍀']

export function Component() {
  const liDom = flatMap(times(15, () => roll_list))
  const [style, api] = useSpring(() => ({ x: 0 }))
  // const lastPos = useRef()
  const rolling = useCallback((target: number) => {
    api.start({ x: -100 * (10 + target), config: { duration: 2000, easing: easeInOutCubic }, onRest: () => {
      api.set({ x: -100 * target })
    } })
  }, [api])
  const [disabled, setDisabled] = useState(false)
  const onClick = () => {
    setDisabled(true)
    const res = random(0, roll_list.length, false)
    console.log(res)
    // const nums = [5, 5, 5]
    rolling(res)
    // setDisabled(false)
  }

  return (
    <div>

      <Card>
        {/* <div className={classnames('fixed inset-0 z-11', {
          hidden: !disabled,
        })}
        >
        </div> */}
        <div className="relative flex-around">

          <div className="relative box-border w-500px border-rd-12px pt-12px">
            <div className="absolute left-50% top-13px z-1 h-90px w-2px bg-#000000" />
            <div
              className="w-100% overflow-hidden bg-[#FFF4D2] text-center text-60px first:border-rd-bottom-left-12px first:border-rd-top-left-12px last:border-rd-bottom-right-12px last:border-rd-top-right-12px"
            >
              <div className="w-100% overflow-hidden text-center text-60px lh-90px">
                <animated.div className="flex" style={style}>{liDom.map((i, idx) => <div className="h-90px w-100px flex-center flex-shrink-0" key={idx}>{i}</div>)}</animated.div>
              </div>
            </div>
          </div>
          <div
            onClick={onClick}
            className="h-54px w-136px translate-x--50% cursor-pointer border-rd-18px bg-#FFFFFF text-center text-22px text-#A5351B font-bold lh-54px shadow-[inset_0px_-3px_0px_0px_#FFCDC1] border-2-#AA4F28"
          >
            START
          </div>

        </div>
      </Card>

    </div>

  )
}
