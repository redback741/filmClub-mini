import { createContext, useContext, useMemo, useReducer } from 'react'
import { userStorage } from '@/utils/storage'

const initialState = {
  userInfo: userStorage.getUserInfo() || null
}

function reducer(state, action) {
  switch (action.type) {
    case 'user/setUserInfo': {
      userStorage.setUserInfo(action.payload)
      return { ...state, userInfo: action.payload }
    }
    case 'user/clearUserInfo': {
      userStorage.removeUserInfo()
      return { ...state, userInfo: null }
    }
    default:
      return state
  }
}

const StoreContext = createContext(null)

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const value = useMemo(() => ({ state, dispatch }), [state])

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) return { state: initialState, dispatch: () => {} }
  return ctx
}

export function useUserInfo() {
  const { state } = useStore()
  return state.userInfo
}

export function setUserInfo(userInfo) {
  return { type: 'user/setUserInfo', payload: userInfo }
}

export function clearUserInfo() {
  return { type: 'user/clearUserInfo' }
}
