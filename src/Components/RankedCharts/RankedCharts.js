import React from "react";
import Paper from "@material-ui/core/Paper";
import customStyle from "./RankedCharts.module.css";
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from "@devexpress/dx-react-chart-material-ui";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

import { Animation } from "@devexpress/dx-react-chart";
import _ from "underscore";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const RankedCharts = (props) => {
  const [value, setValue] = React.useState("totalCases");
  const [userNumInput, setUserNumInpute] = React.useState(10);
  const classes = useStyles();
  const data =
    props.data &&
    props.data
      .filter((item) => item.continent)
      .map((item) => {
        const dataLength = item.data.length - 1;
        const obj = {
          location: item.location,
          totalDeaths: item.data[dataLength].total_deaths,
          totalCases: item.data[dataLength].total_cases,
        };
        if (item.location === props.activeCountry?.location) {
          obj.color = "red";
        }
        return obj;
      });

  const barData = _.sortBy(data, function (row) {
    if (row.totalDeaths && value === "totalDeaths") {
      return row.totalDeaths * -1;
    }
    if (row.totalCases && value === "totalCases") {
      return row.totalCases * -1;
    }
  }).splice(0, userNumInput);

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const onChangeUserNumInputHandler = (event) => {
    if (event.target.value > 10 && event.target.value < 100) {
      setUserNumInpute(event.target.value);
    }
  };

  return (
    <>
      <div className={`w-100 overflow-auto ${customStyle.container}`}>
        <div style={{ width: userNumInput * 73 }}>
          <Paper>
            <Chart data={barData}>
              <ArgumentAxis />
              <ValueAxis max={7} />
              <BarSeries
                barWidth={0.5}
                valueField={
                  value === "totalDeaths" ? "totalDeaths" : "totalCases"
                }
                argumentField="location"
              />
              <Title text="Ranked Chart" />
              <Animation />
            </Chart>
          </Paper>
        </div>
      </div>
      <div className="d-flex justify-content-between m-3">
        <FormControl component="fieldset">
          <RadioGroup
            row
            aria-label="position"
            name="position"
            defaultValue="totalDeaths"
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel
              value="totalCases"
              control={<Radio color="primary" />}
              label="Total Cases"
              labelPlacement="start"
            />
            <FormControlLabel
              value="totalDeaths"
              control={<Radio color="primary" />}
              label="Total Deaths"
              labelPlacement="start"
            />
          </RadioGroup>
        </FormControl>
        <form
          className={classes.root}
          value={userNumInput}
          onChange={onChangeUserNumInputHandler}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="standard-number"
            label="Number Of Countries"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{ min: "10", max: "100", step: "1" }}
            onInput={(e) => {
              e.target.value = Math.max(0, parseInt(e.target.value))
                .toString()
                .slice(0, 3);
            }}
          />
          <p className={customStyle.subtitle}>
            Enter a number between 10 and 100
          </p>
        </form>
      </div>
    </>
  );
};

export default RankedCharts;
