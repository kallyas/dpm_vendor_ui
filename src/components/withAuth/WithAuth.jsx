import React from "react"
import {Navigate} from "react-router-dom"

export const WithAuth = ({ children }) => {
  const accessToken = localStorage.getItem("DPMAccessToken")
  const refreshToken = localStorage.getItem("DPMRefreshToken")
  
  return accessToken && refreshToken ? children : <Navigate to="/login" replace />
}
