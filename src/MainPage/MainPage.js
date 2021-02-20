import { React, useState, useEffect } from "react";
import classes from "./MainPage.module.css";
import { useSelector, useDispatch } from "react-redux";
import { getCountries } from "../store/actions/countryActions";
import SelectBox from "../Components/SelectBox/SelectBox";
import Tabs from "../Components/TabsCard/TabsCard";
import RankedCharts from "../Components/RankedCharts/RankedCharts";
import ReportedCases from "../Components/ReportedCases/ReportedCases";
import MoonLoader from "react-spinners/MoonLoader";

const MainPage = () => {
  const arrayOfData = useSelector((state) => state.coutnries.arrayOfData);
  const [activeCountry, setActiveCountry] = useState(null);
  const [tabValue, setTabValue] = useState(0);

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
  return (
    <div className={classes.container}>
      <SelectBox
        activeCountry={activeCountry}
        setActiveCountry={setActiveCountry}
        data={arrayOfData}
      />
      <Tabs tabValue={tabValue} handleChange={handleChange} />
      <div className={`${classes.tabCard} w-100`}>
        {tabValue === 0 ? (
          <ReportedCases
            data={
              activeCountry
                ? activeCountry
                : arrayOfData.find((item) => item.location === "World")
            }
          />
        ) : (
          <RankedCharts data={arrayOfData} activeCountry={activeCountry} />
        )}
      </div>
    </div>
  );
};

export default MainPage;
