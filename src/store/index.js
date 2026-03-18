import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'

// 创建 Store
const store = configureStore({
  reducer: {
    // 注册模块，类似于 Vuex 的 modules
    user: userReducer
  },
  // 可以在这里配置中间件，如 redux-logger 等
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false // 关闭序列化检查，防止 Taro 对象报错
  })
})

export default store
