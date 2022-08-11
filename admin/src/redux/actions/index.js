import axios from "axios"
// lo de la linea 3 iria en un .env, solo la parte de localhost:3001, la parte de http si va asi 
const baseUrl = "https://script-music.herokuapp.com"
// const baseUrl = "http://localhost:3001"

export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS"
export const GET_ONE_PRODUCT = "GET_ONE_PRODUCT"
export const ADD_PRODUCT = "ADD_PRODUCT"
export const UPDATE_PRODUCT = "UPDATE_PRODUCT"
export const DELETE_PRODUCT = "DELETE_PRODUCT"
export const ADMIN_LOGIN = "ADMIN_LOGIN"
export const DELETE_TOKEN = 'DELETE_TOKEN'
export const CLEAR_CACHE = 'CLEAR_CACHE'
export const GET_ALL_USERS = "GET_ALL_USERS"
export const GET_ONE_USER = "GET_ONE_USER"
export const ADD_USER = "ADD_USER"
export const DELETE_USER = 'DELETE_USER'
export const BAN_USER = 'BAN_USER'
export const UN_BAN_USER = 'UN_BAN_USER'
export const GET_ALL_PROMOS = "GET_ALL_PROMOS"
export const GET_GRAFICO = "GET_GRAFICO"
export const GRAFICO_ID= "GRAFICO_ID"
export const ADD_PROMO = 'ADD_PROMO'
export const DELETE_PROMO = "DELETE_PROMO"
export const ADMIN_PROFILE = 'ADMIN_PROFILE'
export const ADMIN_EMAIL_CHANGE = 'ADMIN_EMAIL_CHANGE'
export const ADMIN_PASSWORD_CHANGE = 'ADMIN_PASSWORD_CHANGE'
export const ADMIN_CHANGE_ROLE = 'ADMIN_CHANGE_ROLE'


// PRODUCTS ACTIONS

export const getAllProducts = () => (dispatch) => {
  axios
    .get(`${baseUrl}/products`)
    .then((res) => {
      dispatch({
        type: GET_ALL_PRODUCTS,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const getOneProduct = (id, userToken) => (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };
  console.log(config)
  axios.get(`${baseUrl}/products/${id}`, config)
    .then(res => {
      dispatch({
        type: GET_ONE_PRODUCT,
        payload: res.data.product
      })
    })
    .catch(err => console.log(err))
}

export const addProduct = (product, userToken) => (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };
  axios.post(`${baseUrl}/products`, product, config)
    .then(res => {
      dispatch({
        type: ADD_PRODUCT,
        payload: res.data.product
      })
    })
    .catch(err => console.log(err))
}

export const updateProduct = (id, product, userToken) => (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };
  axios
    .put(`${baseUrl}/products/${id}`, product, config)
    .then((res) => {
      dispatch({
        type: UPDATE_PRODUCT,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const deleteProduct = (id, userToken) => (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };
  axios.delete(`${baseUrl}/products/${id}`, config)
    .then(res => {
      dispatch({
        type: DELETE_PRODUCT,
        payload: res.data
      })
    })
    .catch(err => console.log(err))

}

export const grafico = (userToken) => (dispatch) =>{
  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };
  axios.get(`${baseUrl}/sold`, config).then(res =>{
    dispatch({
      type: GET_GRAFICO,
      payload:res.data,
    })
  })
  .catch(err => console.log(err))
}

export const graficoById = (id, userToken) => (dispatch) =>{
  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };
  axios.get(`${baseUrl}/sold/${id}`, config).then(res =>{
    dispatch({
      type: GRAFICO_ID,
      payload:res.data,
    })
  })
  .catch(err => console.log(err))
}

export const clearCache = () => (dispatch) => {
  dispatch({
    type: CLEAR_CACHE,
  });
};



// PRODUCTS ACTIONS

// USER ACTIONS

export const getAllUsers = (userToken) => (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };
  axios
    .get(`${baseUrl}/users`, config)
    .then((res) => {
      dispatch({
        type: GET_ALL_USERS,
        payload: res.data.users
      });
    })
    .catch((err) => console.log(err));
};

export const getOneUser = (id, userToken) => (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };
  axios
    .get(`${baseUrl}/user/${id}`, config)
    .then((res) => {
      dispatch({
        type: GET_ONE_USER,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const addUser = (user, userToken) => (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };
  axios.post(`${baseUrl}/signupFront`, user, config)
    .then(res => {
      dispatch({
        type: ADD_USER,
        payload: res.data.userAdd,
      })
    })
    .catch(err => console.log(err))
}

export const deleteUser = (id, userToken) => (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };
  axios.delete(`${baseUrl}/user/delete/${id}`, config)
    .then(res => {
      dispatch({
        type: DELETE_USER,
        payload: res.data.users
      })
    })
    .catch(err => console.log(err))
}

export const banUser = (id, userToken) => (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };
  axios.put(`${baseUrl}/ban/user/${id}`, null, config)
    .then(res => {
      dispatch({
        type: BAN_USER,
        payload: res.data.users
      })
    })
}

export const unBanUser = (id, userToken) => (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };
  axios.put(`${baseUrl}/unban/user/${id}`, null, config)
    .then(res => {
      dispatch({
        type: UN_BAN_USER,
        payload: res.data.users
      })
    })
}

export const adminLogin = (user) => (dispatch) => {
  axios
    .post(`${baseUrl}/loginAdmin`, user)
    .then((res) => {
      console.log(res.data.token);
      dispatch({
        type: ADMIN_LOGIN,
        payload: res.data.token,
      });
    })
    .catch((err) => console.log(err));
};

export function adminProfile(userToken){
  return async function(dispatch){
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
    const json = await axios.get(`${baseUrl}/admin-profile`, config)
    return dispatch({
      type: ADMIN_PROFILE,
      payload: json.data
    })
  }
}

export function changeEmailAdmin(input, userToken){
  return async function(dispatch){
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
    const json = await axios.put(`${baseUrl}/admin/changeEmail`, input, config)
    return dispatch({
      type: ADMIN_EMAIL_CHANGE,
      payload: json.data
    })
  }
}
export function changePasswordAdmin(input, userToken){
  return async function(dispatch){
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
    const json = await axios.put(`${baseUrl}/admin/changePassword`, input, config)
    return dispatch({
      type: ADMIN_PASSWORD_CHANGE,
      payload: json.data
    })
  }
}
export function changeRoles(id, userToken){
  return async function(dispatch){
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
    const json = await axios.put(`${baseUrl}/admin/change-roles/${id}`, null, config)
    return dispatch({
      type: ADMIN_CHANGE_ROLE,
      payload: json.data
    })
  }
}

export const deleteToken = () => {
  return {
    type: DELETE_TOKEN,
  };
};

// USER ACTIONS

// PROMOS ACTIONS

export const getAllPromos = (userToken) => (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };
  axios
    .get(`${baseUrl}/promos`, config)
    .then((res) => {
      dispatch({
        type: GET_ALL_PROMOS,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const addPromo = (promo, userToken) => (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };
  axios.post(`${baseUrl}/create-promo`, promo, config)
    .then(res => {
      dispatch({
        type: ADD_PROMO,
        payload: res.data
      })
    })
    .catch(err => console.log(err))
}

export const deletePromo = (id, userToken) => (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };
  axios.delete(`${baseUrl}/delete-promo/${id}`, config)
    .then(res => {
      dispatch({
        type: DELETE_PROMO,
        payload: res.data
      })
    })
}

// PROMOS ACTIONS