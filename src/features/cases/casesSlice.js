import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const casesSlice = createSlice({
  name: "cases",
  initialState: {
    data: [],
  },
  reducers: {
    setCases: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setCases } = casesSlice.actions;

export const fetchCases = (location, dateRange) => (dispatch) => {
  const url = "http://localhost:3030/cases/dates/" + location + "/" + dateRange;

  axios
    .get(url)
    .then((response) => {
      dispatch(setCases(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};

export default casesSlice.reducer;
