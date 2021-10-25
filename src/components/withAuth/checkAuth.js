const accessToken = localStorage.getItem("DPMAccessToken")
const refreshToken = localStorage.getItem("DPMRefreshToken")

const checkAuth = () => {
  let isAuthenticated
  if (!accessToken || !refreshToken) {
    isAuthenticated = false
  } else {
    isAuthenticated = true
  }
  return isAuthenticated
}

export {checkAuth}
