import type { RouteObject } from 'react-router-dom'

// const UserList = lazy(() => import('@/views/list/user'))
// const UserDetail = lazy(() => import('@/views/list/user/detail'))

export default {
  meta: {
    title: '娱乐场',
    icon: 'ant-design:hdd-filled',
  },
  children: [
    {
      path: '/list/roll',
      lazy: () => import('@/views/list/roll'),
      meta: {
        title: '转盘',
      },
    },
    {
      path: '/list/nine-grid',
      lazy: () => import('@/views/nine-grid'),
      meta: {
        title: '九宫格',
      },
    },

    {
      path: '/list/goods',
      lazy: () => import('@/views/list/goods'),
      meta: {
        title: '老虎机',
      },
    },
    {
      path: '/list/scroll',
      lazy: () => import('@/views/list/scroll'),
      meta: {
        title: 'CSGO滚动抽奖',
      },
    },
  ],

} as RouteObject
