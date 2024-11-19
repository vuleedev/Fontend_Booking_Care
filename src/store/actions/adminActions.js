import actionTypes from "./actionTypes";
import {
  getAllCodeService,
  createNewUserService,
  getAllUsers,
  deleteUserService,
  editUserService,
  getTopDoctorHomeService,
} from "../../services/userService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_GENDER_START });
      let res = await getAllCodeService("GENDER");
      if (res && res.errorCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (error) {
      dispatch(fetchGenderFailed());
      console.log("fetchGenderStart error: ", error);
    }
  };
};

export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});

export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});

export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_POSITION_START });
      let res = await getAllCodeService("POSITION");
      if (res && res.errorCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFailed());
      }
    } catch (error) {
      dispatch(fetchPositionFailed());
      console.log("fetchPositionStart error: ", error);
    }
  };
};

export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});

export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILED,
});

export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_ROLE_START });
      let res = await getAllCodeService("ROLE");
      if (res && res.errorCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFailed());
      }
    } catch (error) {
      dispatch(fetchRoleFailed());
      console.log("fetchRoleStart error: ", error);
    }
  };
};

export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});

export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
});

export const saveNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUserService(data);
      if (res && res.errorCode === 0) {
        toast.success("Create a new user success!");
        dispatch(saveUserSuccess());
        dispatch(fetchAllUserStart());
      } else {
        dispatch(saveUserFailed());
      }
    } catch (error) {
      dispatch(saveUserFailed());
      console.log("Save user failed error: ", error);
    }
  };
};

export const saveUserSuccess = () => ({
  type: actionTypes.SAVE_USER_SUCCESS,
  payload: true,
});

export const saveUserFailed = () => ({
  type: actionTypes.SAVE_USER_FAILED,
  payload: false,
});

export const fetchAllUserStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_POSITION_START });
      let res = await getAllUsers("ALL");
      if (res && res.errorCode === 0) {
        dispatch(fetchAllUserSuccess(res.users));
      } else {
        dispatch(fetchAllUserFailed());
      }
    } catch (error) {
      dispatch(fetchAllUserFailed());
      console.log("fetchAllUserFailed error: ", error);
    }
  };
};

export const fetchAllUserSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USER_SUCCESS,
  users: data,
});

export const fetchAllUserFailed = () => ({
  type: actionTypes.FETCH_ALL_USER_FAILED,
});

export const deleteAUser = (userID) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUserService(userID);
      if (res && res.errorCode === 0) {
        toast.success("Delete a user success!");
        dispatch(deleteUserSuccess());
        dispatch(fetchAllUserStart());
      } else {
        toast.error("Delete a user failed: ", res.data);
        dispatch(deleteUserFailed());
      }
    } catch (error) {
      dispatch(deleteUserFailed());
      console.log("Save user failed error: ", error);
    }
  };
};

export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});

export const deleteUserFailed = () => ({
  type: actionTypes.DELETE_USER_FAILED,
});

export const editAUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUserService(data);
      if (res && res.errorCode === 0) {
        toast.success("Update a user success!");
        dispatch(deleteUserSuccess());
        dispatch(fetchAllUserStart());
      } else {
        toast.error("Update a user failed: ", res.data);
        dispatch(deleteUserFailed());
      }
    } catch (error) {
      dispatch(deleteUserFailed());
      console.log("Update user failed error: ", error);
    }
  };
};

export const editUserSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});

export const editUserFailed = () => ({
  type: actionTypes.EDIT_USER_FAILED,
});

// let res1 = await getTopDoctorHomeService(3);

export const fetchTopDoctor = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopDoctorHomeService("5");
      console.log("Check res: ", res);
      if (res && res.errorCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_TOP_DOCTOR_SUCCESS,
          dataDoctor: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_TOP_DOCTOR_FAILED,
          dataDoctor: res.data,
        });
      }
    } catch (error) {
      console.log("FETCH_ALL_TOP_DOCTOR_FAILED: ", error);
      dispatch({
        type: actionTypes.FETCH_ALL_TOP_DOCTOR_FAILED,
      });
    }
  };
};
