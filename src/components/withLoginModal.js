import React from 'react'
import LoginModal from './LoginModal'

export const withLoginModal = (WrappedComponent) => {
  return (props) => {
    return (
      <>
        <WrappedComponent {...props} />
        <LoginModal />
      </>
    )
  }
}
