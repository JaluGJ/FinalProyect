import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const apiUrl = "https://sm.up.railway.app/";

export const signinSlice = createSlice({
  name: "signin",
  initialState: {
    token: null,
    err: null,
    isLoading: true,
    user: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setErr: (state, action) => {
      state.err = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setToken, setErr, setIsLoading, setUser } = signinSlice.actions;

export default signinSlice.reducer;

export const loginUser = (obj) => (dispatch) => {
  axios
    .post(`${apiUrl}login`, obj)
    .then((res) => {
      dispatch(setIsLoading(true));
      setTimeout(async () => {
        try {
          await AsyncStorage.setItem("@token_id", res.data.token);
          dispatch(setToken(res.data.token));
          dispatch(setIsLoading(false));
          dispatch(create(res.data.token));
          console.log("LOGIN");
        } catch (error) {
          console.log(error);
        }
      }, 500);
    })
    .catch((e) => {
      dispatch(setIsLoading(false));
      dispatch(setErr(e.response.data.message));
      console.log("LOGIN:", e.response.data.message);
    });
};

export const logOut = () => (dispatch) => {
  dispatch(setIsLoading(true));
  setTimeout(async () => {
    try {
      dispatch(setToken(null));
      dispatch(setIsLoading(false));
      await AsyncStorage.removeItem("@token_id");
      console.log("LOGOUT");
    } catch (error) {
      console.log(error);
    }
  }, 500);
};

export const cleanErr = () => (dispatch) => {
  dispatch(setErr(null));
};

export const changeToken = (userToken) => (dispatch) => {
  dispatch(setToken(userToken));
  dispatch(setIsLoading(false));
};

export const create = (userToken) => (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };
  axios
    .get(`${apiUrl}profile`, config)
    .then((res) => {
      dispatch(setUser(res.data.user));
    })
    .catch((e) => console.log(e));
};
