import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const usStates = createSlice({
  name: "usStates",
  initialState: {
    data: [],
  },
  reducers: {
    setUsStates: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setUsStates } = usStates.actions;

export const fetchStates = () => (dispatch) => {
  axios
    .get("http://localhost:3030/states")
    .then((response) => {
      dispatch(setUsStates(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};

export default usStates.reducer;
