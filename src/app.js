
import { useLaunch } from '@tarojs/taro'
import { StoreProvider } from './store'

import './app.scss'

function App({ children }) {
  useLaunch(() => {
    console.log('App launched.')
  })

  // children 是将要会渲染的页面
  return (
    <StoreProvider>
      {children}
    </StoreProvider>
  )
}
  


export default App
