import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const apiUrl = "https://script-music.herokuapp.com/";

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
    updateIMGUser: (state, action) => {
      state.user = { ...state.user, image: action.payload };
    },
    updateName: (state, action) => {
      state.user = { ...state.user, firstName: action.payload };
    },
    updateLastname: (state, action) => {
      state.user = { ...state.user, lastName: action.payload };
    },
    updatePassword: (state, action) => {
      state.user = { ...state.user, password: action.payload };
    },
    updateEmail: (state, action) => {
      state.user = { ...state.user, email: action.payload };
    },
  },
});

export const {
  setToken,
  setErr,
  setIsLoading,
  setUser,
  updateIMGUser,
  updateName,
  updateLastname,
  updatePassword,
  updateEmail,
} = signinSlice.actions;

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
        } catch (error) {
          console.log(error.response);
        }
      }, 500);
    })
    .catch((e) => {
      dispatch(setIsLoading(false));
      Alert.alert("Error", e.response.data.message);
    });
};

export const logOut = () => (dispatch) => {
  dispatch(setIsLoading(true));
  setTimeout(async () => {
    try {
      dispatch(setToken(null));
      dispatch(setUser(null));
      dispatch(setIsLoading(false));
      await AsyncStorage.removeItem("@token_id");
      await AsyncStorage.removeItem("@user");
    } catch (error) {
      console.log(error.response);
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

export const changeUser = (user) => (dispatch) => {
  dispatch(setUser(user));
};

export const create = (userToken) => (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };
  axios
    .get(`${apiUrl}profile`, config)
    .then(async (res) => {
      let { email, firstName, lastName, id, image, bought } = res.data.user;
      dispatch(setUser({ email, firstName, lastName, id, image, bought }));
      await AsyncStorage.setItem(
        "@user",
        JSON.stringify({ email, firstName, lastName, id, image })
      );
    })
    .catch((error) => console.log(error));
};

export const updateIMG = (image, userToken) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };
  dispatch(updateIMGUser(image));
  try {
    await axios.put(`${apiUrl}profile`, { image }, config);
    axios.get(`${apiUrl}profile`, config).then(async () => {
      await AsyncStorage.mergeItem("@user", JSON.stringify({ image }));
    });
  } catch (error) {
    console.log(error.response);
  }
};

export const putName = (firstName, userToken) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };
  dispatch(updateName(firstName));
  try {
    await axios.put(`${apiUrl}profile`, { firstName }, config);
    axios.get(`${apiUrl}profile`, config).then(async () => {
      await AsyncStorage.mergeItem("@user", JSON.stringify({ firstName }));
    });
  } catch (error) {
    console.log(error.response);
  }
};

export const putLastName = (lastName, userToken) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };
  dispatch(updateLastname(lastName));
  try {
    await axios.put(`${apiUrl}profile`, { lastName }, config);
    axios.get(`${apiUrl}profile`, config).then(async () => {
      await AsyncStorage.mergeItem("@user", JSON.stringify({ lastName }));
    });
  } catch (error) {
    console.log(error.response);
  }
};

export const putPassword =
  (password, newPassword, email, userToken) => async (dispatch) => {
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
    try {
      let { data } = await axios.put(
        `${apiUrl}profile/changePassword`,
        { password, newPassword, email },
        config
      );
      axios.get(`${apiUrl}profile`, config).then(async () => {
        await AsyncStorage.mergeItem("@user", JSON.stringify({ password }));
      });
      Alert.alert("¡Contraseña actualizada!", data.message);
      dispatch(updatePassword(password));
    } catch (error) {
      Alert.alert("Error", error.response.data.message);
    }
  };

export const putEmail =
  (email, newEmail, password, userToken) => async (dispatch) => {
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
    try {
      let { data } = await axios.put(
        `${apiUrl}profile/changeEmail`,
        { email, newEmail, password },
        config
      );
      axios.get(`${apiUrl}profile`, config).then(async () => {
        await AsyncStorage.mergeItem("@user", JSON.stringify({ email }));
      });
      Alert.alert("¡Último paso!", data.message);
      dispatch(updateEmail(newEmail));
    } catch (error) {
      Alert.alert("Error", error.response.data.message);
    }
  };

export const forgotPassword = async (email) => {
  try {
    await axios.post(`${apiUrl}user/forgotPassword`, { email });
  } catch (error) {
    console.log(error);
  }
};

