import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoadingGender: false,
  isLoadingPosition: false,
  isLoadingRole: false,
  genders: [],
  roles: [],
  positions: [],
  users: [],
  createSuccess: false,
  topDoctor: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      state.isLoadingGender = true;
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      state.genders = action.data;
      state.isLoadingGender = false;
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_FAILED:
      state.isLoadingGender = false;
      state.genders = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_POSITION_START:
      state.isLoadingPosition = true;
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_SUCCESS:
      state.positions = action.data;
      state.isLoadingPosition = false;
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_FAILED:
      state.isLoadingPosition = false;
      state.positions = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_ROLE_START:
      state.isLoadingRole = true;
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_SUCCESS:
      state.roles = action.data;
      state.isLoadingRole = false;
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_FAILED:
      state.isLoadingRole = false;
      state.roles = [];
      return {
        ...state,
      };
    case actionTypes.SAVE_USER_SUCCESS:
      return {
        ...state,
        createSuccess: action.payload,
      };
    case actionTypes.SAVE_USER_FAILED:
      return {
        ...state,
        createSuccess: false,
      };
    case actionTypes.FETCH_ALL_USER_SUCCESS:
      state.users = action.users;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_USER_FAILED:
      state.users = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_TOP_DOCTOR_SUCCESS:
      state.topDoctor = action.dataDoctor;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_TOP_DOCTOR_FAILED:
      state.topDoctor = [];
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default adminReducer;
