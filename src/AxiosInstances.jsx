import axios from "axios";

const baseURL = "http://192.168.1.42:8000";

let access_token = localStorage.getItem("access_token")
  ? JSON.parse(localStorage.getItem("access_token"))
  : null;

const AxiosInstances = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${access_token && access_token}`,
    "access-control-allow-origin": "*",
    "Content-type": "application/json; charset=UTF-8",
  },
});

/* axios.interceptors.request.use(async (req) => {
  if (!access_token) {
    access_token = localStorage.getItem("access_token")
      ? JSON.parse(localStorage.getItem("access_token"))
      : null;
    req.headers.Authorization = `Bearer ${access_token}`;
  }
  console.log(req);
  return req;
}); */

/* function refreshApi() {
  AxiosInstances.post(
    "api/v1/testapp/refresh",
    JSON.parse(localStorage.getItem("refresh_token"))
  );
} */

axios.interceptors.response.use(
  (res) => res,
  async (error1) => {
    let originalReq = error1.config;
    if (error1?.response?.status === 401 && !originalReq._retry) {
      originalReq._retry = true;
      try {
        let refreshToken = localStorage.getItem("refresh_token");
        const newToken = await axios.post("api/v1/testapp/refresh", {
          refreshToken,
        });
        console.log("WORKING....");
        localStorage.setItem("access_token", newToken.access_token);
        AxiosInstances.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${access_token}`;
        return AxiosInstances(originalReq);
      } catch (error) {
        console.log("TOKEN REFRESHAPI ERROR", error);
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("username");
        Navigate("/login");
        return Promise.reject(error);
      }
    }
    return Promise.reject(error1);
  }
);

export default AxiosInstances;
