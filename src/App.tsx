import { RouterProvider } from 'react-router-dom'
import { shallow } from 'zustand/shallow'
import { Fragment } from 'react'
import { App as AntdApp, theme } from 'antd'
import { useShallow } from 'zustand/react/shallow'
import { ThemeProvider } from 'styled-components'
import Confetti from 'react-confetti'
import { useSysConfigStore } from './stores/config'
import router from './router'

function App() {
  const { colorScheme, elementSize } = useSysConfigStore(useShallow(state => ({
    colorScheme: state.colorScheme,
    elementSize: state.elementSize,
  })))

  const isDark = colorScheme === 'dark'

  return (
    <ConfigProvider componentSize={elementSize} theme={{ cssVar: true, hashed: false, algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm }}>
      <ThemeProvider theme={{ isDark }}>
        <AntdApp component={false}>
          {/* fallbackElement 防止闪屏 */}
          {/* <Confetti /> */}
          <RouterProvider router={router} fallbackElement={<Fragment />} />
        </AntdApp>
      </ThemeProvider>
    </ConfigProvider>
  )
}

export default App
