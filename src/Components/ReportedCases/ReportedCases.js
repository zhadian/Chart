import React from "react";
import Paper from "@material-ui/core/Paper";
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  LineSeries,
  Title,
} from "@devexpress/dx-react-chart-material-ui";
import { withStyles } from "@material-ui/core/styles";
import { Animation } from "@devexpress/dx-react-chart";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

const format = () => (tick) => tick;

const demoStyles = () => ({
  chart: {
    paddingRight: "20px",
  },
  title: {
    whiteSpace: "pre",
  },
});

const ValueLabel = (props) => {
  const { text } = props;
  return <ValueAxis.Label {...props} text={text} />;
};

const titleStyles = {
  title: {
    whiteSpace: "pre",
  },
};
const TitleText = withStyles(titleStyles)(({ classes, ...props }) => (
  <Title.Text {...props} className={classes.title} />
));

const ReportedCases = (props) => {
  const [value, setValue] = React.useState("confirmedCases");
  const [modeValue, setModeValue] = React.useState("dailyMode");
  const labelHalfWidth = 80;
  let lastLabelCoordinate;

  const ArgumentLabel = (props) => {
    const { x } = props;
    if (
      lastLabelCoordinate &&
      lastLabelCoordinate < x &&
      x - lastLabelCoordinate <= labelHalfWidth
    ) {
      return null;
    }
    lastLabelCoordinate = x;
    return <ArgumentAxis.Label {...props} />;
  };
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleModeValueChange = (event) => {
    setModeValue(event.target.value);
  };

  const valueFieldSelector = (value, modeValue) => {
    const obj = {
      confirmedCases_dailyMode: "new_cases",
      confirmedCases_cumulativeMode: "total_cases",
      deathsCount_dailyMode: "new_deaths",
      deathsCount_cumulativeMode: "total_deaths",
    };
    return obj[value + "_" + modeValue];
  };

  return (
    <div>
      <Paper>
        <Chart
          data={props.data ? props.data.data : []}
          className={props.classes.chart}
        >
          <ArgumentAxis labelComponent={ArgumentLabel} tickFormat={format} />

          <ValueAxis max={50} labelComponent={ValueLabel} />

          <LineSeries
            name="chart"
            valueField={valueFieldSelector(value, modeValue)}
            argumentField="date"
          />
          <Title text={`Reported Cases Chart`} textComponent={TitleText} />
          {props.data && props.data.length && <Animation />}
        </Chart>
      </Paper>
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
