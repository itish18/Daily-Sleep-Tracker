const API_URL = "http://localhost:5000/api/users/";

//login user
const login = async (userData) => {
  const response = await fetch(API_URL + "login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (response.status !== 200) {
    throw new Error(data.message);
  }
  if (data) {
    localStorage.setItem("sleepTrackUser", JSON.stringify(data));
  }
  return data;
};

//register user
const register = async (userData) => {
  const response = await fetch(API_URL + "register", {
    method: "POST",
    // headers: {
    //   Accept: "application/json",
    //   "Content-Type": "multipart/form-data",
    // },
    body: userData,
  });

  const data = await response.json();

  if (data) {
    localStorage.setItem("sleepTrackUser", JSON.stringify(data));
  }
  return data;
};

//logout user
const logout = () => localStorage.removeItem("sleepTrackUser");

const authService = {
  login,
  register,
  logout,
};

export default authService;
