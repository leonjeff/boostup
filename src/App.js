import React, { useEffect, useState } from "react";
import { fetchStates } from "./features/states/usStatesSlice";
import { fetchCases } from "./features/cases/casesSlice";
import { useSelector, useDispatch } from "react-redux";
import { Line } from "react-chartjs-2";
import Select from "react-select";

const dates = [
  { value: "1", label: "Last 7 days" },
  { value: "2", label: "Last 30 days" },
  { value: "3", label: "All Time" },
];

function App() {
  const dispatch = useDispatch();
  const { data: cases } = useSelector((state) => state.cases);
  const { data: states } = useSelector((state) => state.usStates);

  const [daysSelected, setDaysSelected] = useState("30");
  const [stateusSelected, setstateusSelected] = useState("all");

  const handleDateChange = (e) => {
    if (e.value === "1") {
      setDaysSelected("7");
      dispatch(fetchCases(stateusSelected, "7"));
    } else if (e.value === "2") {
      setDaysSelected("30");
      dispatch(fetchCases(stateusSelected, "30"));
    } else if (e.value === "3") {
      setDaysSelected("all");
      dispatch(fetchCases(stateusSelected, "all"));
    }
  };

  useEffect(() => {
    dispatch(fetchStates());
    dispatch(fetchCases("all", "30"));
  }, [dispatch]);

  const cc = (e) => {
    setstateusSelected(e.value);
    dispatch(fetchCases(e.value, daysSelected));
  };

  const labels = cases.map((c) => c.dates);
  const confirmedCases = cases.map((c) => c.cases);
  const deaths = cases.map((c) => c.deaths);

  const datos = {
    labels: labels[0],
    datasets: [
      {
        label: "# Cases",
        data: confirmedCases[0],
        fill: true,
        borderColor: "rgba(13,202,240,0.7)",
        backgroundColor: "rgba(13,202,240,0.1)",
        tension: 0.1,
      },
      {
        label: "# Deaths",
        data: deaths[0],
        fill: true,
        borderColor: "rgba(235,26,26,0.7)",
        backgroundColor: "rgba(235,26,26,0.3)",
        tension: 0.1,
      },
    ],
  };
  return (
    <div className="container bg-light mt-5">
      <div className="row d-flex" style={{ minHeight: "90vh" }}>
        <div className="col-12">
          <div className="row">
            <div className="col-4 py-3">
              <Select
                placeholder="Select a state"
                options={states.map((state) => {
                  return { value: state.abreviation, label: state.name };
                })}
                onChange={cc}
              />
            </div>
            <div className="col-4 py-3"></div>
            <div className="col-4 py-3">
              <Select
                placeholder="Select a date range"
                options={dates}
                onChange={handleDateChange}
              />
            </div>
          </div>
        </div>
        <div className="col-12 pb-5 d-flex justify-content-center mh-100">
          <div className="card w-75 d-flex justify-content-end">
            <Line data={datos} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
