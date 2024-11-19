import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import "./userRedux.scss";
import TableManageUser from "./TableManageUser";
import CommonUtils from "../../../utils/CommonUtils";

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],
      previewImgURL: "",
      isOpen: false,

      userEditId: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      gender: "",
      position: "",
      role: "",
      avatar: "",

      action: "",
    };
  }

  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      this.setState({
        genderArr: this.props.genderRedux,
      });
    }
    if (prevProps.positionRedux !== this.props.positionRedux) {
      let arrPositions = this.props.positionRedux;
      this.setState({
        positionArr: arrPositions,
        position:
          arrPositions && arrPositions.length > 0 ? arrPositions[0].id : "", // Sử dụng id
      });
    }
    if (prevProps.roleRedux !== this.props.roleRedux) {
      let arrRoles = this.props.roleRedux;
      this.setState({
        roleArr: arrRoles,
        role: arrRoles && arrRoles.length > 0 ? arrRoles[0].id : "", // Sử dụng id
      });
    }
    if (prevProps.listUser !== this.props.listUser) {
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        address: "",
        gender: "",
        position: "",
        role: "",
        avatar: "",
        previewImgURL: "",
        action: "",
      });
    }
  }

  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgURL: objectUrl,
        avatar: base64,
      });
    }
  };

  openPreviewImage = () => {
    if (!this.state.previewImgURL) return;
    this.setState({
      isOpen: true,
    });
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = [
      "email",
      "password",
      "firstName",
      "lastName",
      "address",
      "phoneNumber",
      "gender",
      "position",
      "role",
    ];

    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        alert(`Missing parameter: ${arrCheck[i]}`);
        break;
      }
    }

    if (isValid) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.state.email)) {
        isValid = false;
        alert("Invalid email format");
      }
    }

    if (isValid && !this.state.role) {
      isValid = false;
      alert("Please select a role");
    }

    if (isValid && !this.state.gender) {
      isValid = false;
      alert("Please select a gender");
    }

    if (isValid && !this.state.position) {
      isValid = false;
      alert("Please select a position");
    }

    return isValid;
  };

  onChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState(
      {
        ...copyState,
      },
      () => {}
    );
  };

  handleSaveUser = (event) => {
    let isValid = this.checkValidateInput();
    if (!isValid) return;
    let { action } = this.state;
    if (action === "") {
      this.props.saveNewUser({
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phoneNumber: this.state.phoneNumber,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,
        avatar: this.state.avatar,
      });
    } else {
      this.props.editAUser({
        id: this.state.userEditId,
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phoneNumber: this.state.phoneNumber,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,
        avatar: this.state.avatar,
      });
    }
  };

  handleEditUserFromParent = (user) => {
    let imageBase64 = "";
    if (user.image) {
      imageBase64 = new Buffer(user.image, "base64").toString("binary");
    }
    this.setState(
      {
        userEditId: user.id,
        email: user.email,
        password: "HARDCODE",
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        address: user.address,
        gender: user.gender,
        position: user.positionId,
        role: user.roleId,
        avatar: "",
        previewImgURL: imageBase64,
        action: "Edit",
      },
      () => {
        console.log("Check edit: ", this.state);
      }
    );
  };

  render() {
    let { genderArr, positionArr, roleArr } = this.state;
    let { isLoadingGender } = this.props;
    let {
      address,
      gender,
      position,
      role,
      avatar,
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
    } = this.state;

    return (
      <>
        <div className="user-redux-container">
          {isLoadingGender === true && (
            <div className="loading-overlay">
              <div className="loading-content">
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
                <div className="mt-2">Loading...</div>
              </div>
            </div>
          )}

          {this.state.isOpen === true && (
            <Lightbox
              mainSrc={this.state.previewImgURL}
              onCloseRequest={() => this.setState({ isOpen: false })}
            />
          )}

          <div className="title">Quản lý người dùng</div>

          <div className="user-redux-body">
            <div className="container">
              <form>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(event) => this.onChangeInput(event, "email")}
                        disabled={this.state.action === "Edit" ? true : false}
                        name="email"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Mật khẩu</label>
                      <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(event) =>
                          this.onChangeInput(event, "password")
                        }
                        disabled={this.state.action === "Edit" ? true : false}
                        name="password"
                      />
                    </div>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Tên</label>
                      <input
                        type="text"
                        className="form-control"
                        value={firstName}
                        onChange={(event) =>
                          this.onChangeInput(event, "firstName")
                        }
                        name="firstName"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Họ</label>
                      <input
                        type="text"
                        className="form-control"
                        value={lastName}
                        onChange={(event) =>
                          this.onChangeInput(event, "lastName")
                        }
                        name="lastName"
                      />
                    </div>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Số điện thoại</label>
                      <input
                        type="text"
                        className="form-control"
                        value={phoneNumber}
                        onChange={(event) =>
                          this.onChangeInput(event, "phoneNumber")
                        }
                        name="phoneNumber"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Địa chỉ</label>
                      <input
                        type="text"
                        className="form-control"
                        value={address}
                        onChange={(event) =>
                          this.onChangeInput(event, "address")
                        }
                        name="address"
                      />
                    </div>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-3">
                    <div className="form-group">
                      <label>Giới tính</label>
                      <select
                        className="form-control"
                        onChange={(event) =>
                          this.onChangeInput(event, "gender")
                        }
                        value={gender}
                        name="gender"
                      >
                        <option value="">Choose...</option>
                        {genderArr &&
                          genderArr.length > 0 &&
                          genderArr.map((item, index) => {
                            return (
                              <option key={index} value={item.keyMap}>
                                {item.valueVi}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label>Chức vụ</label>
                      <select
                        className="form-control"
                        onChange={(event) =>
                          this.onChangeInput(event, "position")
                        }
                        value={position}
                        name="position"
                      >
                        <option value="">Choose...</option>
                        {positionArr &&
                          positionArr.length > 0 &&
                          positionArr.map((item, index) => {
                            return (
                              <option key={index} value={item.keyMap}>
                                {" "}
                                {item.valueVi}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label>Vai trò</label>
                      <select
                        className="form-control"
                        onChange={(event) => this.onChangeInput(event, "role")}
                        value={role}
                        name="role"
                      >
                        <option value="">Choose...</option>
                        {roleArr &&
                          roleArr.length > 0 &&
                          roleArr.map((item, index) => {
                            return (
                              <option key={index} value={item.id}>
                                {" "}
                                {/* Thay đổi từ item.key thành item.id */}
                                {item.valueVi}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label>Ảnh đại diện</label>
                      <div className="preview-img-container">
                        <input
                          id="previewImg"
                          type="file"
                          hidden
                          onChange={(event) => this.handleOnChangeImage(event)}
                        />
                        <label className="label-upload" htmlFor="previewImg">
                          Tải ảnh <i className="fas fa-upload"></i>
                        </label>
                        <div
                          className="preview-image"
                          style={{
                            backgroundImage: `url(${this.state.previewImgURL})`,
                          }}
                          onClick={() => this.openPreviewImage()}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
              <button
                className={
                  this.state.action === "Edit"
                    ? "btn btn-warning mb-3"
                    : "btn btn-primary mb-3"
                }
                onClick={(event) => this.handleSaveUser(event)}
              >
                {this.state.action === "Edit"
                  ? "Edit A User"
                  : "Create New User"}
              </button>
              <TableManageUser
                action={this.state.action}
                handleEditUserFromParent={this.handleEditUserFromParent}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    genderRedux: state.admin.genders,
    positionRedux: state.admin.positions,
    roleRedux: state.admin.roles,
    isLoadingGender: state.admin.isLoadingGender,
    createSuccess: state.admin.createSuccess,
    listUser: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    saveNewUser: (data) => dispatch(actions.saveNewUser(data)),
    fetchAllUserStart: () => dispatch(actions.fetchAllUserStart()),
    editAUser: (data) => dispatch(actions.editAUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
