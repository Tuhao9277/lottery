import { Icon } from '@iconify/react'

interface IProps {
  name: string
  className?: string
  prefix?: string
}

export default function SvgIcon(props: IProps) {
  const { name, className, prefix = 'icon' } = props
  return (
    name.includes(':')
      ? <Icon className={`overflow-hidden fill-[currentcolor] ${className}`} icon={name} />
      : (
        <svg className={`overflow-hidden fill-[currentcolor] ${className}`} aria-hidden="true">
          <use xlinkHref={`#${prefix}-${name}`} />
        </svg>
        )
  )
}
