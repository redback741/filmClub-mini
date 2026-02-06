
import { useLaunch } from '@tarojs/taro'
import { UserProvider } from './context/UserContext'
import { initCloud } from './utils/cloud'

import './app.scss'

function App({ children }) {
  useLaunch(() => {
    initCloud()
    console.log('App launched.')
  })

  // children 是将要会渲染的页面
  return (
    <UserProvider>
      {children}
    </UserProvider>
  )
}

export default App
