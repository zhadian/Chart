import React from "react";
import classes from "./SelectBox.module.css";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

const SelectBox = (props) => {
  return (
    <div
      className={`${classes.header}  d-flex justify-content-center align-items-center`}
    >
      <Autocomplete
        value={props.activeCountry}
        onChange={(event, newValue) => {
          props.setActiveCountry(newValue);
        }}
        options={props.data}
        getOptionLabel={(option) => option.location}
        style={{ width: 500 }}
        renderInput={(params) => (
          <TextField {...params} label="Countries" variant="outlined" />
        )}
      />
    </div>
  );
};

export default SelectBox;
