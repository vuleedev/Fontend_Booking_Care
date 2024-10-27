import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import ModelEditUser from "./ModelEditUser";
import {
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
} from "../../services/userService";
import ModelUser from "./ModalUser";
import { emitter } from "../../utils/emitter";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModalUser: false,
      isOpenEditModelUser: false,
      userEdit: {},
    };
  }

  async componentDidMount() {
    await this.getAllUser();
  }

  getAllUser = async () => {
    let response = await getAllUsers("ALL");
    if (response && response.errorCode === 0) {
      this.setState({
        arrUsers: response.users,
      });
    }
  };

  handleAddNewUser = () => {
    this.setState({
      isOpenModalUser: true,
    });
  };

  toggleUserModel = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser,
    });
  };

  toggleUserEditModel = () => {
    this.setState({
      isOpenEditModelUser: !this.state.isOpenEditModelUser,
    });
  };

  createNewUser = async (data) => {
    try {
      let res = await createNewUserService(data);
      if (res && res.errorCode !== 0) {
        alert(res.errorMessage);
      } else {
        await this.getAllUser();
        this.setState({
          isOpenModalUser: false,
        });
        emitter.emit("EVENT_CLEAR_MODAL_DATA", { id: "your id" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleDeleteUser = async (user) => {
    try {
      let res = await deleteUserService(user.id);
      if (res && res.errorCode !== 0) {
        alert(res.errorMessage);
      } else {
        await this.getAllUser();
      }
    } catch (error) {
      console.log(error);
    }
  };

  updateUser = async (user) => {
    try {
      let res = await editUserService(user);
      if (res && res.errorCode === 0) {
        await this.getAllUser();
        this.setState({
          isOpenEditModelUser: false,
        });
      } else {
        alert(res.errorMessage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  handEditUser = (user) => {
    this.setState({
      isOpenEditModelUser: true,
      userEdit: user,
    });
  };

  render() {
    let { arrUsers, isOpenModalUser, isOpenEditModelUser, userEdit } =
      this.state;
    return (
      <div className="users-container container">
        <div className="title text-center mb-4">Manage Users</div>
        <div className="mx-1">
          <button
            className="btn btn-primary px-2 my-2"
            onClick={this.handleAddNewUser}
          >
            <i className="fas fa-plus px-2"></i> Add new user
          </button>
          <ModelUser
            isOpen={isOpenModalUser}
            toggleUserModel={this.toggleUserModel}
            createNewUser={this.createNewUser}
          />
          {isOpenEditModelUser && (
            <ModelEditUser
              isOpen={isOpenEditModelUser}
              toggleUserModel={this.toggleUserEditModel}
              currentUser={userEdit}
              updateUser={this.updateUser}
            />
          )}
        </div>
        <table className="table table-bordered">
          <thead className="thead-light">
            <tr style={{ backgroundColor: "#e7f3ff" }}>
              <th>ID</th>
              <th>Email</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Gender</th>
              <th>Role</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {arrUsers.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.email}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.address}</td>
                <td>{item.phoneNumber}</td>
                <td>{item.gender === 1 ? "Male" : "Female"}</td>
                <td>{item.roleId}</td>
                <td>{new Date(item.createdAt).toLocaleString()}</td>
                <td>{new Date(item.updatedAt).toLocaleString()}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-1"
                    onClick={() => this.handEditUser(item)}
                  >
                    <i className="fas fa-edit"></i>Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDeleteUser(item)}
                  >
                    <i className="fas fa-trash-alt"></i> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
