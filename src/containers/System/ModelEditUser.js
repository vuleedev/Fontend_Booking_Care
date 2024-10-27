import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
class ModelEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
      gender: "",
      roleId: "",
    };
  }

  componentDidMount() {
    this.setUserDataToState(this.props.currentUser);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentUser !== this.props.currentUser) {
      this.setUserDataToState(this.props.currentUser);
    }
  }

  setUserDataToState(userData) {
    if (userData) {
      this.setState({
        id: userData.id || "",
        email: userData.email || "",
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        address: userData.address || "",
        phoneNumber: userData.phoneNumber || "",
        gender: userData.gender !== undefined ? userData.gender.toString() : "",
        roleId: userData.roleId || "",
      });
    }
  }

  handleInputChange = (event) => {
    const { id, value } = event.target;
    this.setState({
      [id]: value,
    });
    console.log("check: ", value, id);
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = [
      "email",
      "firstName",
      "lastName",
      "address",
      "phoneNumber",
      "gender",
      "roleId",
    ];
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        alert(`Missing parameter: ${arrCheck[i]}`);
        break;
      }
    }

    if (
      isValid &&
      !["Admin", "Doctor", "Patient"].includes(this.state.roleId)
    ) {
      isValid = false;
      alert("Invalid Role. Role must be Admin, Doctor, or Patient");
    }

    return isValid;
  };

  handleUpdateUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid) {
      this.props.updateUser(this.state);
    }
  };

  toggle = () => {
    this.props.toggleUserModel();
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={this.toggle}
        size="lg"
        className="modal-dialog-centered"
      >
        <ModalHeader toggle={this.toggle} className="border-bottom-0">
          Edit User
        </ModalHeader>
        <ModalBody className="pt-0">
          <form>
            <div className="form-group">
              <label htmlFor="email" className="font-weight-bold">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={this.state.email}
                onChange={this.handleInputChange}
                disabled
              />
            </div>

            <div className="form-group">
              <label htmlFor="firstName" className="font-weight-bold">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                value={this.state.firstName}
                onChange={this.handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName" className="font-weight-bold">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                value={this.state.lastName}
                onChange={this.handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="address" className="font-weight-bold">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                value={this.state.address}
                onChange={this.handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phoneNumber" className="font-weight-bold">
                Phone Number
              </label>
              <input
                type="tel"
                className="form-control"
                id="phoneNumber"
                value={this.state.phoneNumber}
                onChange={this.handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="gender" className="font-weight-bold">
                Gender
              </label>
              <select
                className="form-control"
                id="gender"
                value={this.state.gender}
                onChange={this.handleInputChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="0">Female</option>
                <option value="1">Male</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="roleId" className="font-weight-bold">
                Role
              </label>
              <select
                className="form-control"
                id="roleId"
                value={this.state.roleId}
                onChange={this.handleInputChange}
                required
              >
                <option value="">Select Role</option>
                <option value="Admin">Admin</option>
                <option value="Doctor">Doctor</option>
                <option value="Patient">Patient</option>
              </select>
            </div>
          </form>
        </ModalBody>
        <ModalFooter className="border-top-0">
          <Button
            color="primary"
            onClick={this.handleUpdateUser}
            className="px-4 font-weight-bold text-uppercase rounded-pill"
          >
            Update
          </Button>{" "}
          <Button
            color="secondary"
            onClick={this.toggle}
            className="px-4 font-weight-bold text-uppercase rounded-pill"
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModelEditUser);
