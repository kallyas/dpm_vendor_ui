import React from "react"
import {BrowserRouter as Router, Route, Routes as RouterRoutes, Navigate, useLocation} from "react-router-dom"
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import {Provider} from "react-redux"
import {Box} from "@mui/material"
import "./App.css"
import store from "./redux/store"
import LoginPage from "./components/login/LoginPage"
import Logout from "./components/logout/Logout"
import {ThemeProvider} from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import AppTheme from "./assets/styles/index"
import Dashboard from "./components/dashboard/DashboardPage"
import {SideNav} from "./components/shared/sideNav/SideNav"
import Buses from "./components/Buses/Buses"
import Trips from "./components/Trips/Trips"
import {WithAuth} from "./components/withAuth/WithAuth"
import Routes from "./components/routes/RoutesPage"
import {Footer} from "./components/shared/footer/Footer"
import Staff from "./components/Staff/StaffPage"
import SingleRoute from "./components/singleRoute/SingleRoute"
import GetTickets from "./components/Trips/GetTickets"
import GetTransactions from "./components/Transactions/GetTransactions"

function AppContent() {
  const location = useLocation();
  const publicRoutes = ['/login', '/logout'];
  const showSideNav = !publicRoutes.includes(location.pathname);

  return (
    <>
      {showSideNav && <SideNav />}
      <Box 
        sx={{
          marginLeft: showSideNav ? { xs: 0, md: '80px' } : 0,
          transition: 'margin-left 0.3s ease',
        }}
      >
        <RouterRoutes>
          <Route path="/" element={<WithAuth><Dashboard /></WithAuth>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/vehicles" element={<WithAuth><Buses /></WithAuth>} />
          <Route path="/trips" element={<WithAuth><Trips /></WithAuth>} />
          <Route path="/routes" element={<WithAuth><Routes /></WithAuth>} />
          <Route path="/dashboard" element={<WithAuth><Dashboard /></WithAuth>} />
          <Route path="/users" element={<Staff />} />
          <Route path="/routes/:id" element={<SingleRoute />} />
          <Route path="/trip/:id" element={<GetTickets />} />
          <Route path="/transactions" element={<GetTransactions />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </RouterRoutes>
      </Box>
    </>
  );
}

function App(props) {
  return (
    <ThemeProvider theme={AppTheme}>
      <CssBaseline />
      <Provider store={store}>
        <ToastContainer />
        <div className="App">
          <div style={{minHeight: "95vh"}}>
            <Router>
              <AppContent />
            </Router>
          </div>
          <Footer />
        </div>
      </Provider>
    </ThemeProvider>
  )
}
export default App
