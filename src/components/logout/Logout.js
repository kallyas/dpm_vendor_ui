import React, { Component } from "react";

class Logout extends Component {
  componentDidMount() {
    localStorage.removeItem("DPMAccessToken");
    localStorage.removeItem("DPMRefreshToken");
    window.location.assign("/login");
  }
  render() {
    return <></>;
  }
}
export default Logout;
