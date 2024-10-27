import React, { Component } from "react";
import "./Footer.scss";
import { connect } from "react-redux";

class Footer extends Component {
  render() {
    return (
      <div className="footer-container">
        <div className="footer-content">
          <p className="copyright">
            © 2024 Team Hamter. More information, please visit my youtube
            channel —{" "}
            <a
              href="https://www.youtube.com/channel/your-channel-id"
              className="channel-link"
            >
              Click here
            </a>{" "}
            —
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
