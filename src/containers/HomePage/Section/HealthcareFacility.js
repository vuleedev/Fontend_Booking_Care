import React, { Component } from "react";
import "./HealthcareFacility.scss";
import { connect } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
class HealthcareFacility extends Component {
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
      <div className="section-healthcare-facility">
        <div className="healthcare-facility-container">
          <div className="healthcare-facility-header">
            <span className="title">Cơ sở y tế nổi bật</span>
            <button className="view-more">xem thêm</button>
          </div>
          <div className="healthcare-facility-content">
            <Slider {...settings}>
              <div className="slide-item">
                <div className="image"></div>
                <h1>Bệnh viện 1</h1>
              </div>
              <div className="slide-item">
                <div className="image"></div>
                <h1>Bệnh viện 2</h1>
              </div>
              <div className="slide-item">
                <div className="image"></div>
                <h1>Bệnh viện 3</h1>
              </div>
              <div className="slide-item">
                <div className="image"></div>
                <h1>Bệnh viện 4</h1>
              </div>
              <div className="slide-item">
                <div className="image"></div>
                <h1>Bệnh viện 5</h1>
              </div>
              <div className="slide-item">
                <div className="image"></div>
                <h1>Bệnh viện 6</h1>
              </div>
            </Slider>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HealthcareFacility);
