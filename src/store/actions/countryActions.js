import * as actionType from "./actionTypes";
import axios from "axios";

export const setCountries = (data) => {
  return {
    type: actionType.SET_COUNTRIES,
    data: data,
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
