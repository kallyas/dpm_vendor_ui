import React from "react"
import {Redirect} from "react-router"

export const WithAuth = (WrappedComponent) => {
  const accessToken = localStorage.getItem("DPMAccessToken")
  const refreshToken = localStorage.getItem("DPMRefreshToken")
  return class extends React.Component {
    render() {
      return accessToken && refreshToken ? (
        <WrappedComponent />
      ) : (
        <Redirect to="/login" />
      )
    }
  }
}
