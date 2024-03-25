import { ServerConfig } from "../config/ServerConfig";
import { ClientEnum } from "../ClientEnum"
import axios from "axios";

export default class DefaultService {
  static instance = DefaultService.instance || new DefaultService();

  getUserByEmail(email){
    const storedUserDataString = localStorage.getItem('userData');
    const userDataArr =  JSON.parse(storedUserDataString);
    var userData = null
    userDataArr.forEach((user) => {
      if (user.email === email ) {
          userData = user;
    }
    });
    return userData;
  }

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


        const userData = this.getUserByEmail(payload.email);
        if(userData){
          if(userData.password === payload.password){
              return {
                status: true,
                data : {role : userData.role}
              }
          }
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
        // const loginResponse = await axios.post(
        //   ServerConfig.url.API_URL + "/user/signup",
        //   payload,
        //   DefaultService.instance.getHeader(),
        // );

        // if (loginResponse.status == "200") {
        //   return {
        //     status: true,
        //     data: loginResponse.data,
        //   };
        // }
        if(!this.getUserByEmail(payload.email)){
          const storedUserDataString = localStorage.getItem('userData');
          const userDataArr =  JSON.parse(storedUserDataString);
          userDataArr.push(payload)
          localStorage.setItem('userData',JSON.stringify(userDataArr))
          return {
                status: true,
                data: "Success",
              };
        }
        else{
          return {
            status: false,
            data: "User already exists",
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
