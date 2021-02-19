import * as actionType from "./actionTypes";
import axios from "axios";

export const setCountries = (data) => {
  return {
    type: actionType.SET_USERS,
    data: data,
  };
};
export const updateUsers = (searchTerm) => {
  return {
    type: actionType.UPDATE_USERS,
    searchTerm: searchTerm,
  };
};
export const deleteUser = (user) => {
  return {
    type: actionType.DELETE_USER,
    user: user,
  };
};
export const deleteSelectedUsers = (selectedUsers) => {
  return {
    type: actionType.DELETE_SELECTED_USER,
    selectedUsers: selectedUsers,
  };
};

export const getCountries = () => {
  return (dispatch) => {
    axios({
      method: "get",
      url: "https://covid.ourworldindata.org/data/owid-covid-data.json",
    })
      .then((response) => {
        dispatch(setCountries(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
