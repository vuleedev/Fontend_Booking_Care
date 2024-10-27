import React, { Component } from "react";
import "./Specialty.scss";
import { connect } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Specialty extends Component {
  render() {
    let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: true,
    };
    return (
      <>
        <div className="section-specialty">
          <div className="specialty-container">
            <div className="specialty-header">
              <span className="title">Chuyên khoa phổ biến</span>
              <button className="view-more">xem thêm</button>
            </div>
            <div className="specialty-content">
              <Slider {...settings}>
                <div className="slide-item">
                  <div className="image"></div>
                  <h1>Chuyên khoa 1</h1>
                </div>
                <div className="slide-item">
                  <div className="image"></div>
                  <h1>Chuyên khoa 2</h1>
                </div>
                <div className="slide-item">
                  <div className="image"></div>
                  <h1>Chuyên khoa 3</h1>
                </div>
                <div className="slide-item">
                  <div className="image"></div>
                  <h1>Chuyên khoa 4</h1>
                </div>
                <div className="slide-item">
                  <div className="image"></div>
                  <h1>Chuyên khoa 5</h1>
                </div>
                <div className="slide-item">
                  <div className="image"></div>
                  <h1>Chuyên khoa 6</h1>
                </div>
              </Slider>
            </div>
          </div>
        </div>
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
