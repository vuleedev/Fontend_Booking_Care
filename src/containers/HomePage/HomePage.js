import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Header from "./HomeHeader";
import Specialty from "./Section/Specialty";
import HealthcareFacility from "./Section/HealthcareFacility";
import Doctor from "./Section/Doctor";
import About from "./Section/About";
import Footer from "./Section/Footer ";

class HomePage extends Component {
  render() {
    return (
      <div>
        <Header />
        <Specialty />
        <HealthcareFacility />
        <Doctor />
        <About />
        <Footer />
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
