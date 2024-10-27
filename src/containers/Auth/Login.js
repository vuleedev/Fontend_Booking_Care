import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./Login.scss";
import { handleLogin } from "../../services/userService";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      errMessage: "",
    };
  }

  handleOnChangeUsername = (e) => {
    this.setState({ userName: e.target.value });
  };

  handleOnChangePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  handleLoginClick = async (e) => {
    this.setState({
      errMessage: "",
    });

    e.preventDefault();

    try {
      const response = await handleLogin(
        this.state.userName,
        this.state.password
      );

      if (response && response.errorCode !== 0) {
        this.setState({
          errMessage: response.message,
        });
      }
      if (response && response.errorCode === 0) {
        this.props.userLoginSuccess(response.user);
        console.log("login success");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          this.setState({
            errMessage: error.response.data.message,
          });
        }
      }
    }
  };

  render() {
    return (
      <div className="login-bg d-flex justify-content-center align-items-center">
        <div className="login-container">
          <div className="login-content">
            <h2 className="text-center mb-4">Login</h2>
            <form onSubmit={this.handleLoginClick}>
              <div className="form-group mb-3">
                <label>Username:</label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.userName}
                  onChange={this.handleOnChangeUsername}
                  placeholder="Enter your username"
                  // required
                />
              </div>
              <div className="form-group mb-3">
                <label>Password:</label>
                <input
                  type="password"
                  className="form-control"
                  value={this.state.password}
                  onChange={this.handleOnChangePassword}
                  placeholder="Enter your password"
                  // required
                />
              </div>
              <div className="col-12" style={{ color: "red" }}>
                {this.state.errMessage}
              </div>
              <div className="text-end">
                <a className="forgot-password">Forgot Password?</a>
              </div>
              <button type="submit" className="btn btn-primary w-100 mt-3">
                Login
              </button>
            </form>
            <div className="social-login mt-4 text-center">
              <p>Or Login with:</p>
              <button className="btn-circle btn-google">
                <i className="fab fa-google"></i>
              </button>
              <button className="btn-circle btn-facebook">
                <i className="fab fa-facebook-f"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    // USERLoginFail: () => dispatch(actions.adminLoginFail()),
    userLoginSuccess: (userInfor) =>
      dispatch(actions.userLoginSuccess(userInfor)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
