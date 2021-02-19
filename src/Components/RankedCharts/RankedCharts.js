import React from "react";
import Paper from "@material-ui/core/Paper";
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from "@devexpress/dx-react-chart-material-ui";

import { Animation } from "@devexpress/dx-react-chart";

const compare = (a, b) => {
  const bandA = a.population;
  const bandB = b.population;
  let comparison = 0;
  if (bandA < bandB) {
    comparison = 1;
  } else if (bandA > bandB) {
    comparison = -1;
  }
  return comparison;
};

const RankedCharts = (props) => {
  return (
    <div>
      <Paper>
        <Chart data={props.data ? props.data.sort(compare).splice(0, 10) : []}>
          <ArgumentAxis />
          <ValueAxis max={7} />

          <BarSeries valueField="population" argumentField="location" />
          <Title text="World population" />
          <Animation />
        </Chart>
      </Paper>
    </div>
  );
};

export default RankedCharts;
