import React, { Component } from "react";
import "./About.scss";
import { connect } from "react-redux";

class About extends Component {
  render() {
    return (
      <div className="section-about">
        <div className="about-header">
          <div className="title">Thông tin về chúng tôi</div>
        </div>
        <div className="about-content">
          <div className="content-left">
            <div className="video-container">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/JpXz-4BOGSI?si=vASlRJ6gBrJRWRuE"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </div>
          </div>
          <div className="content-right">
            <div className="description">
              Bạn đang muốn thiết kế Website phòng khám nhưng chưa biết nên có
              những Module (thành phần/chức năng) nào? Việc có những ý tưởng về
              Module Website giúp thiết kế, cấu thành lên một tổng thể thống
              nhất, hoàn chỉnh, đáp ứng được mục đích, nhu cầu của đơn vị. Dưới
              đây là một số Module cơ bản nhưng quan trọng trong thiết kế
              Website phòng khám, đơn vị có thể tham khảo, bổ sung cho trang Web
              của mình.
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
