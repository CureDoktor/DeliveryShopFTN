export const userLoginGoogle = async (username, password) => {
  return fetch(process.env.REACT_APP_LOGIN_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
};

export const userLogin = async (username, password) => {
  return fetch(process.env.REACT_APP_LOGIN_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
};

export const userRegister = async (formData) => {
  console.log(process.env);
  console.log("IDE OVDE JEBIGA");
  console.log(process.env.REACT_APP_REGISTER_ENDPOINT);
  console.log("IDE OVDE JEBIGA");
  return fetch(`${process.env.REACT_APP_REGISTER_ENDPOINT}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
};

export const apiProductId = async (productId, token) => {
  return fetch(`${process.env.REACT_APP_PRODUCT_ID}${productId}`, {
    headers: {
      Token: token,
    },
  });
};
export const productUpdate = async (token, productData) => {
  return fetch(process.env.REACT_APP_PRODUCT_UPDATE, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Token: token,
    },
    body: JSON.stringify(productData),
  });
};

export const apiProduct = async (token) => {
  return fetch(process.env.REACT_APP_API_PRODUCT, {
    headers: {
      Token: token,
    },
  });
};

export const deleteProduct = async (productId, token) => {
  return fetch(`${process.env.REACT_APP_DELETE_PRODUCT}${productId}`, {
    method: "DELETE",
    headers: {
      Token: token,
    },
  });
};
export const ordersSellers = async (token) => {
  return fetch(process.env.REACT_APP_ORDERS_SELLERS, {
    headers: {
      Token: token,
    },
  });
};

export const sellersOldOrders = async (token) => {
  return fetch(process.env.REACT_APP_SELLERS_OLD_ORDERS, {
    headers: {
      Token: token,
    },
  });
};

export const Users = async (token) => {
  return fetch(process.env.REACT_APP_USERS, {
    headers: {
      Token: token,
    },
  });
};

export const usersUpdate = async (token, formData) => {
  return fetch(process.env.REACT_APP_USERS_UPDATE, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Token: token,
    },
    body: JSON.stringify(formData),
  });
};

export const postProduct = async (token, formData) => {
  return fetch(process.env.REACT_APP_POST_PRODUCT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Token: token,
    },
    body: JSON.stringify(formData),
  });
};

export const postOrders = async (token, orderData) => {
  return fetch(process.env.REACT_APP_POST_ORDERS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Token: token,
    },
    body: JSON.stringify(orderData),
  });
};

export const apiOrders = async (token) => {
  return fetch(process.env.REACT_APP_API_ORDERS, {
    headers: {
      Token: token,
    },
  });
};

export const getAllSellers = async (token) => {
  return fetch(process.env.REACT_APP_GET_ALL_SELLERS, {
    headers: {
      Token: token,
    },
  });
};

export const usersVerify = async (selectedUser, status, headers) => {
  return fetch(
    `${process.env.REACT_APP_USERS_VERIFY}${selectedUser.id}?status=${status}`,
    {
      method: "POST",
      headers: headers,
    }
  );
};
