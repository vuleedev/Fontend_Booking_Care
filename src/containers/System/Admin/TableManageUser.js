import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersRedux: [],
    };
  }

  componentDidMount() {
    this.props.fetchUserRedux();
  }

  handDeleteAUser = (user) => {
    this.props.deleteAUser(user.id);
  };

  handUpdateAUser = (user) => {
    console.log(user);

    this.props.handleEditUserFromParent(user);
  };

  render() {
    let arrUsers = this.props.listUsers;

    return (
      <table className="table table-bordered">
        <thead className="thead-light">
          <tr style={{ backgroundColor: "#e7f3ff" }}>
            <th>ID</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {arrUsers &&
            arrUsers.length > 0 &&
            arrUsers.map((item, index) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.email}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.address}</td>
                  <td className="text-center">
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => {
                        this.handUpdateAUser(item);
                      }}
                    >
                      <i className="fas fa-edit"></i>Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => {
                        this.handDeleteAUser(item);
                      }}
                    >
                      <i className="fas fa-trash-alt"></i>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
    deleteAUser: (id) => dispatch(actions.deleteAUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
