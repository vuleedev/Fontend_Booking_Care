import React, { Component } from "react";
import "./Doctor.scss";
import { connect } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as actions from "../../../store/actions/adminActions";

// Import ảnh mặc định
import defaultDoctor from "../../../assets/outstanding-doctor/anh-dai-dien-bs.jpg";

class Doctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topDoctorRedux !== this.props.topDoctorRedux) {
      this.setState({
        arrDoctors: this.props.topDoctorRedux,
      });
    }
  }

  componentDidMount() {
    this.props.loadTopDoctors();
  }

  render() {
    let arrDoctors = this.state.arrDoctors;

    let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 8,
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
              {arrDoctors &&
                arrDoctors.length > 0 &&
                arrDoctors.map((item, index) => {
                  // Kiểm tra và xử lý ảnh
                  let imageBackground = defaultDoctor; // Ảnh mặc định

                  if (item.image) {
                    try {
                      // Kiểm tra xem đã có prefix data:image chưa
                      if (item.image.startsWith("data:image")) {
                        imageBackground = item.image;
                      } else {
                        // Nếu là base64 thuần, thêm prefix
                        imageBackground = `data:image/png;base64,${item.image}`;
                      }
                    } catch (error) {
                      console.error("Error processing image:", error);
                      imageBackground = defaultDoctor;
                    }
                  }

                  return (
                    <div className="slide-item" key={index}>
                      <div className="image-wrapper">
                        <div
                          className="doctor-image"
                          style={{
                            backgroundImage: `url("${imageBackground}")`,
                          }}
                        />
                      </div>
                      <div className="doctor-info">
                        <div className="doctor-title">
                          {`Bác sĩ ${item.firstName} ${item.lastName}`}
                        </div>
                        <div className="doctor-specialty">
                          {item["positionData.valueVi"] ||
                            "Chức danh không xác định"}
                        </div>
                      </div>
                    </div>
                  );
                })}
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
    topDoctorRedux: state.admin.topDoctor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
