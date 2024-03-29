import { React, useState, useEffect } from "react";
import classes from "./MainPage.module.css";
import { useSelector, useDispatch } from "react-redux";
import { getCountries } from "../store/actions/countryActions";
import SelectBox from "../Components/SelectBox/SelectBox";
import Tabs from "../Components/TabsCard/TabsCard";
import ReportedCases from "../Components/ReportedCases/ReportedCases";
import MoonLoader from "react-spinners/MoonLoader";
import RankedCharts from "../Components/RankedCharts/RankedCharts";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Paper, Card, Switch, FormControlLabel } from "@material-ui/core/";

const MainPage = () => {
  const arrayOfData = useSelector((state) => state.coutnries.arrayOfData);
  const [activeCountry, setActiveCountry] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const [tabValue, setTabValue] = useState(0);

  const theme = createMuiTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#36a2da",
      },
    },
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountries());
  }, []);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  if (!arrayOfData) {
    return (
      <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
        <MoonLoader color="rgb(66, 165, 245)" size={150} />
      </div>
    );
  }
  console.log(theme);

  const onChangeDarkModeHandler = () => {
    setDarkMode(!darkMode);
  };
  return (
    <ThemeProvider theme={theme}>
      <Paper style={{ height: "100vh", borderRadius: 0 }}>
        <FormControlLabel
          control={
            <Switch
              checked={darkMode}
              onChange={onChangeDarkModeHandler}
              name="checkedB"
              color="primary"
            />
          }
          label="Dark Mode"
        />
        <div className={classes.container}>
          <SelectBox
            activeCountry={activeCountry}
            setActiveCountry={setActiveCountry}
            data={arrayOfData}
          />
          <Tabs
            tabValue={tabValue}
            handleChange={handleChange}
            indicatorColor="primary.lig"
          />
          <Card className={`${classes.tabCard} w-100`}>
            {tabValue === 0 ? (
              <ReportedCases
                darkMode={darkMode}
                data={
                  activeCountry
                    ? activeCountry
                    : arrayOfData.find((item) => item.location === "World")
                }
              />
            ) : (
              <RankedCharts
                darkMode={darkMode}
                data={arrayOfData}
                activeCountry={activeCountry}
              />
            )}
          </Card>
        </div>
      </Paper>
    </ThemeProvider>
  );
};

export default MainPage;
