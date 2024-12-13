import axios from "axios";

const baseURL = "http://192.168.1.42:8000";

const AxiosInstances = axios.create({
  baseURL,
});

AxiosInstances.interceptors.request.use(
  (req) => {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      /*  access_token = localStorage.getItem("access_token")
        ? JSON.parse(localStorage.getItem("access_token"))
        : null; */
      // console.log(access_token);
      // console.log(JSON.parse(access_token));

      req.headers["Authorization"] = `Bearer ${access_token}`;
    }
    console.log(req, "requestInterceptor");

    return req;
  },
  (err) => Promise.reject(err)
);

/* function refreshApi() {
  AxiosInstances.post(
    "api/v1/testapp/refresh",
    JSON.parse(localStorage.getItem("refresh_token"))
  );
} */

AxiosInstances.interceptors.response.use(
  (res) => res,
  async (error1) => {
    let originalReq = error1.config;
    if (error1?.response?.status === 401 && !originalReq._retry) {
      originalReq._retry = true;
      try {
        let refresh_token = localStorage.getItem("refresh_token");
        const newToken = await axios.post(
          "http://192.168.1.42:8000/api/v1/testapp/refresh",
          {},
          {
            headers: {
              refreshtoken: refresh_token,
            },
          }
        );
        console.log("WORKING....");
        console.log(newToken, "NEW TOKEN");
        localStorage.setItem("access_token", newToken.data.access_token);
        AxiosInstances.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newToken.access_token}`;
        return AxiosInstances(originalReq);
      } catch (refreshError) {
        console.log("INSIDE CATCH", refreshError);
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("username");
        // localStorage.setItem("expired", true);
        // navigate("/login");
        return Promise.reject(error1);
      }
    }
    return Promise.reject(error1);
  }
);

export default AxiosInstances;
