import React, {Suspense, lazy} from "react"
import {BrowserRouter as Router, Route, Routes as RouterRoutes, Navigate, useLocation} from "react-router-dom"
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import {Provider} from "react-redux"
import {Box, CircularProgress} from "@mui/material"
import {ThemeProvider} from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import AppTheme from "./assets/styles/index"
import store from "./redux/store"
import {SideNav} from "./components/shared/sideNav/SideNav"
import {WithAuth} from "./components/withAuth/WithAuth"

const LoginPage = lazy(() => import("./components/login/LoginPage"))
const Dashboard = lazy(() => import("./components/dashboard/DashboardPage"))
const Buses = lazy(() => import("./components/Buses/Buses"))
const Trips = lazy(() => import("./components/Trips/Trips"))
const Routes = lazy(() => import("./components/routes/RoutesPage"))
const Staff = lazy(() => import("./components/Staff/StaffPage"))
const SingleRoute = lazy(() => import("./components/singleRoute/SingleRoute"))
const GetTickets = lazy(() => import("./components/Trips/GetTickets"))
const GetTransactions = lazy(() => import("./components/Transactions/GetTransactions"))

const LoadingFallback = () => (
  <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh"}}>
    <CircularProgress />
  </Box>
)

function AppContent() {
  const location = useLocation()
  const publicRoutes = ['/login', '/logout']
  const showSideNav = !publicRoutes.includes(location.pathname)

  return (
    <>
      {showSideNav && <SideNav />}
      <Box 
        component="main"
        sx={{
          ml: showSideNav ? { xs: 0, md: "260px" } : 0,
          transition: "margin-left 0.3s ease",
          minHeight: "100vh",
          bgcolor: "background.default",
        }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <RouterRoutes>
            <Route path="/" element={<WithAuth><Dashboard /></WithAuth>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/logout" element={<WithAuth><Navigate to="/login" replace /></WithAuth>} />
            <Route path="/vehicles" element={<WithAuth><Buses /></WithAuth>} />
            <Route path="/trips" element={<WithAuth><Trips /></WithAuth>} />
            <Route path="/routes" element={<WithAuth><Routes /></WithAuth>} />
            <Route path="/dashboard" element={<WithAuth><Dashboard /></WithAuth>} />
            <Route path="/users" element={<WithAuth><Staff /></WithAuth>} />
            <Route path="/routes/:id" element={<WithAuth><SingleRoute /></WithAuth>} />
            <Route path="/trip/:id" element={<WithAuth><GetTickets /></WithAuth>} />
            <Route path="/transactions" element={<WithAuth><GetTransactions /></WithAuth>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </RouterRoutes>
        </Suspense>
      </Box>
    </>
  )
}

function App(props) {
  return (
    <ThemeProvider theme={AppTheme}>
      <CssBaseline />
      <Provider store={store}>
        <ToastContainer position="top-right" autoClose={3000} />
        <Router>
          <AppContent />
        </Router>
      </Provider>
    </ThemeProvider>
  )
}
export default App
