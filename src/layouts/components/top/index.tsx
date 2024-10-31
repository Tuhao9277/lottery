import { useShallow } from 'zustand/react/shallow'
import type { RouteObject } from 'react-router-dom'
import { useRouteLoaderData } from 'react-router-dom'
import type { MenuProps } from 'antd'
import { isEmpty } from 'lodash'
import Logo from '../logo'
import { GlobalStyles, TopNavWrapper } from './style'
import { useSysConfigStore } from '@/stores/config'
import type { ILayoutLoader } from '@/types/common'
import { useMenuStore } from '@/stores/menu'

export default function Top() {
  const { layoutMode, mainMenuBgColor, mainMenuTextColor, mainMenuHoverBgColor, mainMenuHoverTextColor, mainMenuActiveBgColor, mainMenuActiveTextColor } = useSysConfigStore(useShallow(state => ({
    layoutMode: state.layoutMode,
    mainMenuBgColor: state.theme.mainMenuBgColor,
    menuBgColor: state.theme.menuBgColor,
    mainMenuTextColor: state.theme.mainMenuTextColor,
    menuTextColor: state.theme.menuTextColor,
    mainMenuHoverBgColor: state.theme.mainMenuHoverBgColor,
    menuHoverBgColor: state.theme.menuHoverBgColor,
    mainMenuHoverTextColor: state.theme.mainMenuHoverTextColor,
    menuHoverTextColor: state.theme.menuHoverTextColor,
    mainMenuActiveBgColor: state.theme.mainMenuActiveBgColor,
    menuActiveBgColor: state.theme.menuActiveBgColor,
    mainMenuActiveTextColor: state.theme.mainMenuActiveTextColor,
    menuActiveTextColor: state.theme.menuActiveTextColor,
  })))

  const { mainMenuActive, setMainMenuActive } = useMenuStore(useShallow(state => ({
    mainMenuActive: state.mainMenuActive,
    setMainMenuActive: state.setMainMenuActive,
  })))

  const { allMainMenu, allSubMenu } = useRouteLoaderData('layout') as ILayoutLoader

  const { t } = useTranslation()
  function getMainMenuItems(): MenuProps['items'] {
    return allMainMenu.filter(v => v.children?.length).map((k) => {
      return {
        label: t(k.title),
        key: `${k.parentIndex!}`,
        icon: <SvgIcon name={k.icon} size={16} />,
      }
    })
  }

  const clickMainMenu: MenuProps['onClick'] = (e) => {
    setMainMenuActive(Number(e.key))
  }

  const { pathname } = useLocation()

  function customMenuClass() {
    if (layoutMode === 'topSubSideNav') {
      return {
        menuContainerBgColor: mainMenuBgColor,
        menuTextColor: mainMenuTextColor,
        menuHoverBgColor: mainMenuHoverBgColor,
        menuHoverTextColor: mainMenuHoverTextColor,
        menuActiveBgColor: mainMenuActiveBgColor,
        menuActiveTextColor: mainMenuActiveTextColor,
        darkMenuContainerBgColor: 'var(--xt-main-menu-bg-color)',
        darkMenuTextColor: 'var(--xt-main-menu-text-color)',
        darkMenuHoverBgColor: 'var(--xt-main-menu-hover-bg-color)',
        darkMenuHoverTextColor: 'var(--xt-main-menu-hover-text-color)',
        darkMenuActiveBgColor: 'var(--xt-main-menu-active-bg-color)',
        darkMenuActiveTextColor: 'var(--xt-main-menu-active-text-color)',
      }
    }
  }
  const menuClass = customMenuClass()

  useEffect(() => {
    if (layoutMode === 'topSubSideNav') {
      function findCurItemByPath(path: string, allSubMenu: RouteObject[]): RouteObject | undefined {
        if (isEmpty(allSubMenu))
          return undefined
        for (const item of allSubMenu) {
          if (item.path === path)
            return item

          if (!isEmpty(item.children)) {
            const res = findCurItemByPath(path, item.children!)
            if (res)
              return res
          }
        }
      }
      setMainMenuActive(findCurItemByPath(pathname, allSubMenu)?.parentIndex ?? 0)
    }
  }, [allSubMenu, layoutMode, pathname, setMainMenuActive])

  return (
    <TopNavWrapper className="h-[var(--xt-top-nav-height)] flex flex-shrink-0 items-center px-4" $customMenuClass={menuClass}>
      <GlobalStyles $customMenuClass={menuClass} />
      <Logo className="mr-4 text-xl" />
      <ConfigProvider theme={{
        components: {
          Menu: {
            activeBarHeight: 0,
            horizontalItemBorderRadius: 8,
            iconMarginInlineEnd: 5, // 图标与文字间距
          },
        },
      }}
      >
        {/* 顶部主导航+侧边次导航 */}
        { layoutMode === 'topSubSideNav' && (
          <Menu className="xt-menu flex-1" mode="horizontal" selectedKeys={[`${mainMenuActive}`]} items={getMainMenuItems()} onClick={clickMainMenu} />
        ) }
      </ConfigProvider>

    </TopNavWrapper>
  )
}
