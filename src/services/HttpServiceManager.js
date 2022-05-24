//
//  HttpServiceManager.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:37:25 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import axios from "axios";
import { showSpinner, hideSpinner } from "react-native-globalspinner";
import { UPLOAD_PROGRESS } from "../actions/ActionTypes";
import { defaultAction, logout } from "../actions/ServiceAction";
import { FlashMessage } from "../reuseableComponents";
import { callDispatch } from "../reuseableFunctions";
import singleton from "../singleton";

const log = (...msgs) => {
  if (process.env.NODE_ENV === "development") console.log(...msgs);
};

global.log = log;

class HttpServiceManager {

  lastErrorCode = 0;
  tokenExists = true
  static myInstance = null;
  static axiosInstance = null;
  userToken = "";

  static getInstance() {
    if (HttpServiceManager.myInstance == null) {
      HttpServiceManager.myInstance = new HttpServiceManager();
    }
    return this.myInstance;
  }

  static initialize = (baseURL, authHeader) => {
    HttpServiceManager.getInstance().axiosInstance = axios.create({
      baseURL: baseURL,
      timeout: 60000,
      headers: authHeader
    });
    HttpServiceManager.getInstance().axiosInstance.interceptors.request.use(
      function (config) {
        config.headers[
          "Authorization"
        ] = HttpServiceManager.getInstance().userToken;
        return config;
      },
      function (error) {
        global.log("header Config err:", error);
        return error;
      }
    );
  };

  multipleRequest = (RequestArray, showHud) => {
    if (showHud) {
      showSpinner();
    }
    if (HttpServiceManager.getInstance().axiosInstance !== null) {
      return new Promise((resolve, reject) => {
        axios
          .all(RequestArray)
          .then(response => {
            resolve(response);
            hideSpinner();
          })
          .catch(error => {
            reject(HttpServiceManager.checkError(error));
            hideSpinner();
          });
      });
    } else {
      console.warn(
        'HttpServiceManager method "initialize" is not called, call it in App.js componentDidMount'
      );
    }
  };

  getRequestObject = (requestName, parameters, method) => {
    // showLoader(showHud);
    if (HttpServiceManager.getInstance().axiosInstance !== null) {
      return HttpServiceManager.getInstance().axiosInstance.request({
        method: method,
        url: requestName,
        params: parameters
      });
    } else {
      console.warn(
        'HttpServiceManager method "initialize" is not called, call it in App.js componentDidMount'
      );
    }
  };

  uploadProgress = progressEvent => {
    callDispatch(
      defaultAction(UPLOAD_PROGRESS, {
        progress: (progressEvent.loaded / progressEvent.total) * 100,
      }),
    );
  };

  request = (requestName, parameters, method, showHud = true, progress) => {
    if (showHud) {
      showSpinner();
    }
    const data = method === "get" ? null : parameters;
    if (HttpServiceManager.getInstance().axiosInstance !== null) {
      return new Promise((resolve, reject) => {
        let reqParam = {
          method: method,
          url: requestName,
          data: data,
          params: parameters,
          // onUploadProgress: progressEvent =>
          //   this.uploadProgress(progressEvent),
        };

        if (progress) {
          reqParam['onUploadProgress'] = this.uploadProgress
        }
        global.log(
          "--------------------------------------------------------------------------------------",
          "\n- REQUEST : ",
          reqParam,
          "\n--------------------------------------------------------------------------------------"
        );
        HttpServiceManager.getInstance()
          .axiosInstance.request(reqParam)
          .then(response => {
            global.log(
              "--------------------------------------------------------------------------------------",
              "\n- RESPONSE : (" + requestName + ")",
              response,
              "\n--------------------------------------------------------------------------------------"
            );
            if (response.status === 200) {
              HttpServiceManager.getInstance().tokenExists = true
              resolve({
                data: response.data?.data,
                meta: response.data?.pagination?.meta ?? constant.serviceMeta,
                message: response.data?.message ?? '',
                status: response.status
              });
            }
            hideSpinner();
          })
          .catch(error => {
            hideSpinner();
            reject(HttpServiceManager.checkError(error));
          });
      });
    } else {
      console.warn(
        'HttpServiceManager method "initialize" is not called, call it in App.js componentDidMount'
      );
    }
  };

  static checkError = error => {
    console.log(
      "--------------------------------------------------------------------------------------",
      "\n- ERROR : ",
      error.response,
      "\n--------------------------------------------------------------------------------------"
    );
    var showError = null;

    if (error?.response) {

      const status = error.response.status;

      if (status == 500) {

        showError = 'Something went wrong';

      } else if (status == 401 && this.lastErrorCode != 401) {

        singleton.storeRef.dispatch(logout());
        showError = 'Authentication Failed';

      } else if (error.response.data?.data && status != 401) {

        data = error.response.data.data;
        if (Array.isArray(data)) {
          data = error.response.data.data[0];
        }
        var values = Object.keys(data).map(key => {
          return data[key];
        });
        showError = "• " + values.join("\n• ");

      }

      showError && FlashMessage({ message: showError });
      this.lastErrorCode = status;
      showError = null;

    }

    return error.response;
    // if (error?.response?.status) {
    //   const status = error.response.status
    //   if (status == 500) {

    //   } else if (status == 401) {

    //   }
    // }

    // if (error?.response?.data?.data) {
    //   data = error.response.data.data;
    //   if (Array.isArray(data)) {
    //     data = error.response.data.data[0];
    //   }
    //   var values = Object.keys(data).map(key => {
    //     return data[key];
    //   });
    //   showError = "• " + values.join("\n• ");
    // }

    // FlashMessage({ message: showError });
    // return error.response;
  };
}

export default HttpServiceManager;
