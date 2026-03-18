import { createSlice } from '@reduxjs/toolkit'
import { userStorage } from '@/utils/storage'

// 1. 定义初始状态 (State)
// 尝试从本地存储初始化，保持状态持久化
const initialState = {
  userInfo: userStorage.getUserInfo() || null
}

// 2. 创建 Slice (包含 State, Reducers)
const userSlice = createSlice({
  name: 'user',
  initialState,
  // Reducers 类似于 Vuex 的 Mutations，用于同步修改 State
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload
      // 同步更新本地存储 (为了方便，这里做了副作用，严格模式下建议在中间件或 Thunk 中处理)
      userStorage.setUserInfo(action.payload)
    },
    clearUserInfo: (state) => {
      state.userInfo = null
      // 同步清除本地存储
      userStorage.removeUserInfo()
    }
  }
})

// 3. 导出 Actions (类似于 Vuex 的 commits)
export const { setUserInfo, clearUserInfo } = userSlice.actions

// 4. 导出 Selectors (类似于 Vuex 的 Getters)
export const selectUserInfo = (state) => state.user.userInfo
export const selectIsLoggedIn = (state) => !!state.user.userInfo

// 5. 导出 Reducer
export default userSlice.reducer
