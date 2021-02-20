import * as actionTypes from "../actions/actionTypes";

const initialState = {
  countries: null,
  arrayOfData: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_COUNTRIES:
      return {
        ...state,
        countries: action.data,
        arrayOfData: Object.values(action.data),
      };
    default:
      return state;
  }
};

export default reducer;
