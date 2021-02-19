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
  const labelHalfWidth = 70;
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
  return (
    <div>
      <Paper>
        <Chart
          data={props.data ? props.data.data : []}
          className={props.classes.chart}
        >
          <ArgumentAxis
            labelComponent={ArgumentLabel}
            // showLabels={false}
            tickFormat={format}
          />
          <ValueAxis max={50} labelComponent={ValueLabel} />

          <LineSeries
            name="new_cases"
            valueField="new_cases"
            argumentField="date"
          />
          <Title
            text={`Confidence in Institutions in American society ${"\n"}(Great deal)`}
            textComponent={TitleText}
          />
          {props.data && props.data.length && <Animation />}
        </Chart>
      </Paper>
    </div>
  );
};

export default withStyles(demoStyles, { name: "Demo" })(ReportedCases);
