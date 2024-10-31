import { Card, Image } from 'antd'
import { animated, useSpring } from '@react-spring/web'
import classnames from 'classnames'
import { useState } from 'react'
import { delay, sample } from 'lodash'
import { formatName } from '@/utils'
import { award_list } from '@/utils/prize'

const easing = t => t === 1 ? 1 : 1 - 2 ** (-10 * t)
export function Component() {
  const segmentAngle = 360 / award_list.length
  const [selectId, setSelectId] = useState(-1)
  const [currentRotation, setCurrentRotation] = useState(0)
  const [props, api] = useSpring(() => ({
    transform: 'rotate(0deg)',
    // config: { mass: 10, friction: 100, tension: 200 },
    config: { duration: 5000, easing },
  }))
  const spin = (_type) => {
    const award_id = sample(award_list)?.id
    const selectedItemIndex = award_list.findIndex((award) => {
      return award.id === award_id
    })
    const endRotation = currentRotation + (3 * 360) - (segmentAngle * selectedItemIndex)
    api.start(() => ({
      transform: `rotate(${endRotation}deg)`,

      onRest: () => {
        setCurrentRotation(endRotation % 360)
        api.set({
          transform: `rotate(${endRotation % 360}deg)`,
        })
        // delay(() => {
        //   setSelectId(-1)
        // }, 1000)
      },
    }))
  }
  return (
    <Card className="relative h-100%">
      <div
        style={{
          backgroundImage: `url('https://us3tmp.laiye.com/c5ad0e202ded4a4_1729490584_6478.png')`,
        }}
        className="bgContain flex-end-col absolute left-50% top-50% h-177px w-349px translate-x--50%"
      >
        <div className="absolute bottom-100px z-1 mx-auto my-0 h-343px w-343px">
          <div
            className="bgContain absolute left-50% top--150px h-155px w-299px translate-x--50%"
            style={{
              backgroundImage: `url('https://us3tmp.laiye.com/3d0195a48fe5619_1729495271_96.png')`,
            }}
          >
          </div>
          <animated.div
            className="bgContain relative h-100% w-100%"
            style={{
              ...props,
              backgroundImage: `url('https://us3tmp.laiye.com/2ad4b00f53cd7d6_1729490339_3466.png')`,
            }}
          >
            {award_list?.map((prize, index) => (
              <div
                key={index}
                id={`${index}`}
                className="absolute h-[100%] w-[100%] transform-origin-center"
                style={{ transform: `rotate(${index * segmentAngle}deg)`, zIndex: index }}
              >
                <div
                  style={{
                    visibility: selectId === prize.id ? 'visible' : 'hidden',
                    backgroundImage: `url(https://us3tmp.laiye.com/c7e22af88a579f5_1729498144_3137.png)`,
                  }}
                  className="bgContain absolute left-50% top-10px z-1 h-160px w-106px translate-x--50%"
                >
                </div>
                <div
                  className="absolute left-[50%] top-[10%] z-2 transform-origin-[0_0] translate-x--50% whitespace-nowrap text-center"
                >
                  <div
                    className={classnames(
                      'text-#EB5B3A text-center text-stroke-2px text-14px text-stroke-transparent bg-#ffffff bg-clip-text font-bold',
                      {
                        'text-#FFFFFF!  bg-#CF2C14!': selectId === prize.id,
                      },
                    )}
                  >
                    {formatName(prize)}
                  </div>
                  <Image className="mt-8px" width={34} src={prize.icon}></Image>
                </div>
              </div>
            ))}
          </animated.div>
          <div
            className="bgContain absolute left-50% top-50% z-2 h-101px w-94px translate-x--50% translate-y--50%"
            onClick={spin}
            style={{
              backgroundImage: `url('https://us3tmp.laiye.com/f94e63d2b94a640_1729490436_6816.png')`,
            }}
          >
          </div>
        </div>
      </div>
    </Card>
  )
}
