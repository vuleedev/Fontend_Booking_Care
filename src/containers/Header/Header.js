import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu } from "./menuApp";
import "./Header.scss";

class Header extends Component {
  render() {
    const { processLogout, userInfo } = this.props;

    return (
      <div className="header-container">
        <div className="header-tabs-container">
          <Navigator menus={adminMenu} />
        </div>
        <div className="right-content">
          <span className="welcome">
            Welcome, {userInfo && userInfo.lastName ? userInfo.lastName : ""}
          </span>
          <div className="btn btn-logout" onClick={processLogout}>
            <i className="fas fa-sign-out-alt"></i>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user.userInfo,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
