import React from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import classes from "./TabsCard.module.css";

const TabsCard = (props) => {
  return (
    <div
      className={`${classes.fd} w-100 d-flex justify-content-center align-items-center`}
    >
      <Paper className="w-100" square>
        <Tabs
          value={props.tabValue}
          indicatorColor="primary"
          textColor="primary"
          onChange={props.handleChange}
          aria-label="disabled tabs example"
        >
          <Tab className={`${classes.tab} w-50`} label="Reported Cases" />
          <Tab className={`${classes.tab} w-50`} label="Ranked Charts" />
        </Tabs>
      </Paper>
    </div>
  );
};

export default TabsCard;
