import { ServerConfig } from "../config/ServerConfig";
import { ClientEnum } from "../ClientEnum"
import axios from "axios";

export default class DefaultService {
  static instance = DefaultService.instance || new DefaultService();

  getHeader() {
    return {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
  }
  getHeaderWithToken() {
    const currentUserData = JSON.parse(localStorage.getItem("currentUserData"));
    // add bearer token
    const bearerToken = "Bearer " + currentUserData.userJWT;

    return {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: bearerToken,
      },
    };
  }
  defaultResponse() {
    return {
      status: false,
      responseMessage: ClientEnum.RESPONSE_CONNECTION_ERROR,
    };
  }

  async login(payload) {
    let retry = 0;

    while (retry++ < 2) {
      try {
        const loginResponse = await axios.post(
          ServerConfig.url.API_URL + "/user/login",
          payload,
          DefaultService.instance.getHeader(),
        );
        if (loginResponse.status == "200") {
          return {
            status: true,
            data: loginResponse.data,
          };
        }
      } catch (error) {
        console.log(error);
        retry++;
      }
    }
    return DefaultService.instance.defaultResponse();
  }

  async signup(payload) {
    let retry = 0;

    while (retry++ < 2) {
      try {
        const loginResponse = await axios.post(
          ServerConfig.url.API_URL + "/user/signup",
          payload,
          DefaultService.instance.getHeader(),
        );

        if (loginResponse.status == "200") {
          return {
            status: true,
            data: loginResponse.data,
          };
        }
      } catch (error) {
        console.log(error);
        retry++;
      }
    }
    return DefaultService.instance.defaultResponse();
  }

  async resetPassword(payload) {
    let retry = 0;

    while (retry++ < 2) {
      try {
        const loginResponse = await axios.post(
          ServerConfig.url.API_URL + "/user/reset_password",
          payload,
          DefaultService.instance.getHeaderWithToken(),
        );

        if (loginResponse.status == "200") {
          return {
            status: true,
            data: loginResponse.data,
          };
        }
      } catch (error) {
        console.log(error);
        retry++;
      }
    }
    return DefaultService.instance.defaultResponse();
  }
}
