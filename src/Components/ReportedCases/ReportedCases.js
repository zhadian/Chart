import React from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@material-ui/core/";
import ReactECharts from "echarts-for-react";

const demoStyles = () => ({
  chart: {
    paddingRight: "20px",
  },
  title: {
    whiteSpace: "pre",
  },
});

const ReportedCases = (props) => {
  const [value, setValue] = React.useState("confirmedCases");
  const [modeValue, setModeValue] = React.useState("dailyMode");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleModeValueChange = (event) => {
    setModeValue(event.target.value);
  };

  const axisData = {
    xAxis: [],
    yAxis: {
      newDeaths: [],
      newCases: [],
      totalDeaths: [],
      totalCases: [],
    },
  };

  props.data?.data.map((item) => {
    axisData.xAxis.push(item.date);
    axisData.yAxis.newDeaths.push(item.new_deaths);
    axisData.yAxis.newCases.push(item.new_cases);
    axisData.yAxis.totalDeaths.push(item.total_deaths);
    axisData.yAxis.totalCases.push(item.total_cases);
  });

  const valueFieldSelector = (value, modeValue) => {
    const obj = {
      confirmedCases_dailyMode: {
        data: axisData.yAxis.newCases,
        name: "Daily Confirmed Cases",
      },
      confirmedCases_cumulativeMode: {
        data: axisData.yAxis.totalCases,
        name: "Cumulative Confirmed Cases",
      },
      deathsCount_dailyMode: {
        data: axisData.yAxis.newDeaths,
        name: "Daily Deaths",
      },
      deathsCount_cumulativeMode: {
        data: axisData.yAxis.totalDeaths,
        name: "Cumulative Deaths",
      },
    };
    return obj[value + "_" + modeValue];
  };

  const options = {
    grid: { top: 40, right: 70, bottom: 4, left: 50, containLabel: true },
    xAxis: {
      name: "Country",
      type: "category",
      data: axisData.xAxis,
      axisLabel: {
        rotate: 45,
      },
    },
    yAxis: {
      name: valueFieldSelector(value, modeValue).name,
      type: "value",
      axisLabel: {
        rotate: 0,
      },
    },
    series: [
      {
        data: valueFieldSelector(value, modeValue).data,
        type: "line",
        smooth: true,
      },
    ],
    tooltip: {
      trigger: "axis",
    },
  };

  return (
    <div>
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
              value="confirmedCases"
              control={<Radio color="primary" />}
              label="Confirmed Cases"
              labelPlacement="start"
            />
            <FormControlLabel
              value="deathsCount"
              control={<Radio color="primary" />}
              label="Deaths Count"
              labelPlacement="start"
            />
          </RadioGroup>
        </FormControl>
        <FormControl component="fieldset">
          <RadioGroup
            row
            aria-label="position"
            name="position"
            defaultValue="totalDeaths"
            value={modeValue}
            onChange={handleModeValueChange}
          >
            <FormControlLabel
              value="dailyMode"
              control={<Radio color="primary" />}
              label="Daily Mode"
              labelPlacement="start"
            />
            <FormControlLabel
              value="cumulativeMode"
              control={<Radio color="primary" />}
              label="Cumulative Mode"
              labelPlacement="start"
            />
          </RadioGroup>
        </FormControl>
      </div>
    </div>
  );
};

export default withStyles(demoStyles, { name: "Demo" })(ReportedCases);
