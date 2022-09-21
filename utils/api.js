import axios from "axios";
import {
  refreshAccessTokenAction,
  logoutAction,
} from "../redux/slices/userSlice";

export const instance = axios.create();

const setupInterceptors = (userAuth, dispatch) => {
  /*** by default attach accessToken ***/
  instance.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${userAuth?.accessToken}`;
  /*** interceptors setting ***/
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      console.log(error);
      /*** define original request ***/
      const originalRequest = error.config;

      if (
        error?.response?.data?.message === "jwt expired" &&
        !originalRequest._retry &&
        error.config.url !== "/api/users/refresh-access-token"
      ) {
        /*** config retry & headers with refreshToken ***/
        originalRequest._retry = true;
        instance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${userAuth?.refreshToken}`;
        try {
          /*** request to refresh the access token ***/
          const response = await instance.get(
            "/api/users/refresh-access-token"
          );
          const refreshAccessToken = response.data;
          /*** update store and localStorage ***/
          dispatch(refreshAccessTokenAction(refreshAccessToken));

          /*** config and execute the original request with refresh access token ***/
          instance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${refreshAccessToken}`;

          originalRequest.headers[
              "Authorization"
            ] = `Bearer ${refreshAccessToken}`;
        } catch (error) {
          // dispatch(logoutAction());
          throw error;
        }
        return instance(originalRequest);
      } else {
        throw error;
      }
    }
  );
};
export default setupInterceptors;
