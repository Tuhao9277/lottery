import { Card, Image } from 'antd'
import classnames from 'classnames'
import { floor, random, sample } from 'lodash'
import { useSpring } from '@react-spring/web'
import { useState } from 'react'
import { grid_list } from '@/utils/prize'

const easeCubicOut = t => 1 - (1 - t) ** 2
const positions = [
  { row: 1, col: 1 },
  { row: 1, col: 2 },
  { row: 1, col: 3 },
  { row: 2, col: 3 },
  { row: 3, col: 3 },
  { row: 3, col: 2 },
  { row: 3, col: 1 },
  { row: 2, col: 1 },
]

export function Component() {
  const [_, api] = useSpring(() => ({ number: 0 }))
  const [current, setCurrent] = useState(0)
  const onClick = () => {
    const target = 32 + random(0, 8, false)
    api.start(() => ({
      number: target,
      config: {
        duration: 5000,
        easing: easeCubicOut,
      },
      onChange(result) {
        // console.log(parseInt());
        setCurrent(floor(result.value.number % 8))
      },
      onRest() {
        api.set({ number: target % 8 })
      },
    }))
  }
  return (
    <Card>
      <div
        className="grid-area relative grid grid-rows-[123px] grid-cols-3 box-border w-350px w-350px gap-12px pb-93px"
      >
        {grid_list.map((i, index) => (
          <div
            key={i.id}
            style={{
              gridRow: positions[index].row,
              gridColumn: positions[index].col,
            }}
            className={classnames(
              'flex-center-col w-h-100px  bgContain text-18px bg-[#FFF4D2] shadow-[inset_0px_-5px_0px_0px_#FFD181] border-rd-12px border-1px border-solid border-[#FFB61B] text-center lh-44px  text-#A6632E',
              { 'text-#ffffff font-bold bg-gradient-to-b from-#F59752 to-#FF7140': current + 1 === i.id },
            )}
          >
            <Image width={40} src={i.icon}></Image>

            {i.name}
          </div>
        ))}
        <div
          onClick={onClick}
          className="border-2-#AA4F28 absolute left-50% top-50% h-80px w-80px translate-x--50% translate-y--100% cursor-pointer border-rd-18px bg-#FFFFFF text-center text-22px text-#A5351B font-bold lh-80px shadow-[inset_0px_-3px_0px_0px_#FFCDC1]"
        >
          START
        </div>
      </div>
    </Card>
  )
}
