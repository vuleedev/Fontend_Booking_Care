import React, { Component } from "react";
import "./Doctor.scss";
import { connect } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Doctor extends Component {
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
      <div className="section-doctor">
        <div className="doctor-container">
          <div className="doctor-header">
            <span className="title">Bác sĩ nổi bật tuần qua</span>
            <button className="view-more">xem thêm</button>
          </div>
          <div className="doctor-content">
            <Slider {...settings}>
              <div className="slide-item">
                <div className="image-wrapper">
                  <div className="doctor-image"></div>
                </div>
                <div className="doctor-info">
                  <div className="doctor-title">Bác sĩ Chuyên khoa II</div>
                  <div className="doctor-specialty">Thần kinh</div>
                </div>
              </div>
              <div className="slide-item">
                <div className="image-wrapper">
                  <div className="doctor-image"></div>
                </div>
                <div className="doctor-info">
                  <div className="doctor-title">Giáo sư, Tiến sĩ</div>
                  <div className="doctor-specialty">Tim mạch</div>
                </div>
              </div>
              <div className="slide-item">
                <div className="image-wrapper">
                  <div className="doctor-image"></div>
                </div>
                <div className="doctor-info">
                  <div className="doctor-title">Bác sĩ Chuyên khoa I</div>
                  <div className="doctor-specialty">Cơ xương khớp</div>
                </div>
              </div>
              <div className="slide-item">
                <div className="image-wrapper">
                  <div className="doctor-image"></div>
                </div>
                <div className="doctor-info">
                  <div className="doctor-title">Phó Giáo sư, Tiến sĩ</div>
                  <div className="doctor-specialty">Tiêu hóa</div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
