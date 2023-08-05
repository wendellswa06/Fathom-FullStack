import React, { Component } from "react";
import Router from "next/router";
import Cookies from "js-cookie";
export default class Index extends Component {
  componentDidMount = async () => {
    let userInfo = Cookies.get("userInfo");

    if (userInfo == undefined) {
      Router.push("/admin/login");
    } else {
      Router.push("/admin/published");
    }
  };

  render() {
    return <div />;
  }
}
