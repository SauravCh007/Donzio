import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import customFunctions from "../../util/CustomFunctions";
import SharedService from "../SharedService/sharedServices";
let payload = [];
export default {
  setupInterceptors: async () => {
    await axios.interceptors.request.use(
      async (config) => {
        config.headers["Content-Type"] = "application/json"; // eslint-disable-line
        config.headers["Access-Key"] =
          "AE698wLwHGPLvtuzF46V4P2h4yh3ru2MmkBKpsEA7bzQSHjQ3F"; // eslint-disable-line
        const userInfo = await customFunctions.jsonParse(
          await AsyncStorage.getItem("usertoken")
        );
        if (userInfo) config.headers.Authorization = `Bearer ${userInfo}`; // eslint-disable-line
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );

    await axios.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        if (
          error &&
          typeof error === "object" &&
          error.message === "Request failed with status code 401"
        ) {
          //  await AsyncStorage.removeItem("usertoken")
          SharedService.isLogOut.next(true);
        }
        return Promise.reject(error);
      }
    );
  },
};
