import axios from "axios";
import AuthContext from "./auth-context";
// Servis koji izvršava HTTP pozive

export const userLogin = async (data) => {
  try {
    const response = await axios.post(
      "https://localhost:7146/Users/Authenticate",
      data
    );
    return response;
  } catch (error) {
    alert(error.response.data.message);
  }
};

export const userRegister = async (data) => {
  try {
    const response = await axios.post(
      "https://localhost:7146/Users/register",
      data
    );
    return response.data;
  } catch (error) {
    alert(error.response.data.message);
  }
};

export const userUpdate = async (data, header) => {
  try {
    const response = await axios.put(
      "https://localhost:7146/Users/update",
      data,
      {
        headers: {
          Token: header,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    alert(error.response.data.message);
  }
};

export const userVerify = async (data, header) => {
  try {
    const response = await axios.post(
      "https://localhost:7146/Users/Authenticate",
      data,
      {
        headers: {
          header,
        },
      }
    );
    return response.data;
  } catch (error) {
    alert(error.response.data.message);
  }
};

export const userWaitlist = async (data, header) => {
  try {
    const response = await axios.post(
      "https://localhost:7146/Users/Authenticate",
      data,
      {
        headers: {
          header,
        },
      }
    );
    return response.data;
  } catch (error) {
    alert(error.response.data.message);
  }
};

export const userGetProfile = async (header) => {
  try {
    const response = await axios.get("https://localhost:7146/User", {
      headers: {
        Token: header,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
    alert(error.response.data);
  }
};
