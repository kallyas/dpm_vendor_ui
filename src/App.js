import React from "react"
import {BrowserRouter as Router} from "react-router-dom"
import {Route, Switch, Redirect} from "react-router"
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import {Provider} from "react-redux"
import "./App.css"
import configureStore from "./redux/store"
import LoginPage from "./components/login/LoginPage"
import Logout from "./components/logout/Logout"
import {MuiThemeProvider} from "@material-ui/core/styles"
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

function App(props) {
  return (
    <MuiThemeProvider theme={AppTheme}>
      <Provider store={configureStore()}>
        <ToastContainer />
        <div className="App">
          <div style={{minHeight: "95vh"}}>
            <Router>
              <Route component={WithAuth(SideNav)} />
              <Switch>
                <Route exact path="/" component={WithAuth(Dashboard)} />
                <Route exact path="/login" component={LoginPage} />
                <Route exact path="/logout" component={Logout} />
                <Route exact path="/vehicles" component={WithAuth(Buses)} />
                <Route exact path="/trips" component={WithAuth(Trips)} />
                <Route exact path="/routes" component={WithAuth(Routes)} />
                <Route
                  exact
                  path="/dashboard"
                  component={WithAuth(Dashboard)}
                />
                <Route exact path="/users" component={Staff} />
                <Route exact path="/routes/:id" component={SingleRoute} />
                <Route exact path="/trip/:id" component={GetTickets} />
                <Route exact path="/transactions" component={GetTransactions} />
                <Redirect to="/404" />
              </Switch>
            </Router>
          </div>
          <Footer />
        </div>
      </Provider>
    </MuiThemeProvider>
  )
}
export default App
