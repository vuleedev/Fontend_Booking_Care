const actionTypes = Object.freeze({
  //app
  APP_START_UP_COMPLETE: "APP_START_UP_COMPLETE",
  SET_CONTENT_OF_CONFIRM_MODAL: "SET_CONTENT_OF_CONFIRM_MODAL",

  //user
  ADD_USER_SUCCESS: "ADD_USER_SUCCESS",

  USER_LOGIN_SUCCESS: "USER_LOGIN_SUCCESS",
  USER_LOGIN_FAIL: "USER_LOGIN_FAIL",
  PROCESS_LOGOUT: "PROCESS_LOGOUT",

  //admin

  //fetch user
  FETCH_GENDER_START: "FETCH_GENDER_START",
  FETCH_GENDER_SUCCESS: "FETCH_GENDER_SUCCESS",
  FETCH_GENDER_FAILED: "FETCH_GENDER_FAILED",

  FETCH_POSITION_START: "FETCH_POSITION_START",
  FETCH_POSITION_SUCCESS: "FETCH_POSITION_SUCCESS",
  FETCH_POSITION_FAILED: "FETCH_POSITION_FAILED",

  FETCH_ROLE_START: "FETCH_ROLE_START",
  FETCH_ROLE_SUCCESS: "FETCH_ROLE_SUCCESS",
  FETCH_ROLE_FAILED: "FETCH_ROLE_FAILED",
  //end fetch user

  //create user
  SAVE_USER_SUCCESS: "SAVE_USER_SUCCESS",
  SAVE_USER_FAILED: "SAVE_USER_FAILED",
  //end create user

  //fetch user
  FETCH_ALL_USER_SUCCESS: "FETCH_ALL_USER_SUCCESS",
  FETCH_ALL_USER_FAILED: "FETCH_ALL_USER_FAILED",
  //end fetch user

  //delete user
  DELETE_USER_SUCCESS: "DELETE_USER_SUCCESS",
  DELETE_USER_FAILED: "DELETE_USER_FAILED",
  //end delete user

  //update user
  EDIT_USER_SUCCESS: "EDIT_USER_SUCCESS",
  EDIT_USER_FAILED: "EDIT_USER_FAILED",
  //end update user

  //fetch doctor
  FETCH_ALL_TOP_DOCTOR_SUCCESS: "FETCH_ALL_TOP_DOCTOR_SUCCESS",
  FETCH_ALL_TOP_DOCTOR_FAILED: "FETCH_ALL_TOP_DOCTOR_FAILED",
  //end fetch doctor
});

export default actionTypes;
