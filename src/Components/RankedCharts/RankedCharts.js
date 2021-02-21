import React from "react";
import ReactECharts from "echarts-for-react";
import _ from "underscore";
import {
  makeStyles,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  TextField,
} from "@material-ui/core/";
import customStyle from "./RankedCharts.module.css";

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
        return obj;
      });

  const sortedData = _.sortBy(data, function (row) {
    if (row.totalDeaths && value === "totalDeaths") {
      return row.totalDeaths * -1;
    }
    if (row.totalCases && value === "totalCases") {
      return row.totalCases * -1;
    }
  }).splice(0, userNumInput);

  const axisData = {
    xAxis: [],
    yAxis: {
      deaths: [],
      cases: [],
    },
  };

  sortedData.map((item) => {
    if (item.location === props.activeCountry?.location) {
      const colorData = (type) => {
        return {
          value: type,
          itemStyle: {
            color: "#a90000",
          },
        };
      };
      axisData.xAxis.push(item.location);
      axisData.yAxis.cases.push(colorData(item.totalCases));
      axisData.yAxis.deaths.push(colorData(item.totalDeaths));
    } else {
      axisData.xAxis.push(item.location);
      axisData.yAxis.deaths.push(item.totalDeaths);
      axisData.yAxis.cases.push(item.totalCases);
    }
  });

  const options = {
    grid: { top: 40, right: 70, bottom: 4, left: 20, containLabel: true },
    xAxis: {
      name: "Country",
      type: "category",
      data: axisData.xAxis,
      axisLabel: {
        rotate: 45,
      },
    },
    yAxis: {
      name: value === "totalCases" ? "Total Cases" : "Total Deaths",
      type: "value",
      axisLabel: {
        rotate: 0,
      },
    },
    series: [
      {
        data:
          value === "totalCases" ? axisData.yAxis.cases : axisData.yAxis.deaths,
        type: "bar",
        smooth: true,
      },
    ],
    tooltip: {
      trigger: "axis",
    },
  };
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
      <ReactECharts
        style={{ height: 480 }}
        theme={props.darkMode ? "dark" : "light"}
        option={options}
      />
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
            size="small"
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
