import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { getAllCodeService } from "../../../services/userService";
import * as actions from "../../../store/actions";

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
    };
  }

  async componentDidMount() {
    this.props.getGenderStart();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      this.setState({
        genderArr: this.props.genderRedux,
      });
    }
  }

  render() {
    console.log("Check state ", this.state.genderArr);
    let genders = this.state.genderArr;
    let role = this.state.roleArr;
    return (
      <div className="user-redux-container">
        <div className="title">User Redux</div>
        <div className="user-redux-body">
          <div className="container">
            <h2>Thêm mới người dùng</h2>

            <form>
              <div class="row mb-3">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" class="form-control" id="email" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="password">Mật khẩu</label>
                    <input type="password" class="form-control" id="password" />
                  </div>
                </div>
              </div>

              <div class="row mb-3">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="firstname">Tên</label>
                    <input type="text" class="form-control" id="firstname" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="lastname">Họ</label>
                    <input type="text" class="form-control" id="lastname" />
                  </div>
                </div>
              </div>

              <div class="row mb-3">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="phone">Số điện thoại</label>
                    <input type="tel" class="form-control" id="phone" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="address">Địa chỉ</label>
                    <input type="text" class="form-control" id="address" />
                  </div>
                </div>
              </div>

              <div class="row mb-3">
                <div class="col-md-3">
                  <div class="form-group">
                    <label for="gender">Giới tính</label>
                    <select className="form-control" id="gender">
                      <option value="">Choose...</option>
                      {genders &&
                        genders.length > 0 &&
                        genders.map((item, index) => {
                          return (
                            <option key={index} value={item.key}>
                              {item.valueVi}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="form-group">
                    <label for="role">Vai trò</label>
                    <select class="form-control" id="role">
                      <option value="">Choose...</option>
                      {role &&
                        role.length > 0 &&
                        role.map((item, index) => {
                          return (
                            <option key={index} value={item.key}>
                              {item.valueVi}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="form-group">
                    <label for="avatar">Ảnh đại diện</label>
                    <input type="file" class="form-control" id="avatar" />
                  </div>
                </div>
              </div>

              <button type="submit" class="btn btn-primary">
                Lưu user
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    genderRedux: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
