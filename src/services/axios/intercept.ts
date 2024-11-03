import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { useSpinner as isSpinner } from "../../store/useSpinner";
import { useAuth as getAccessToken } from "../../store/useAuth";

const setSpinnerOption = (option: boolean) => {
  const { setIsSpinner, isSpinnerOpen } = isSpinner();
  if (isSpinnerOpen) setIsSpinner(option);
};

export const onReqSuccess = (config: InternalAxiosRequestConfig) => {
  setSpinnerOption(true);
  const { accessToken } = getAccessToken();

  if (config.headers && accessToken)
    config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
};

export const onReqError = (error: AxiosError) => {
  setSpinnerOption(false);
  return Promise.reject(error);
};

export const onResSuccess = (response: AxiosResponse) => {
  setSpinnerOption(false);
  return {
    ...response.data,
    status: response.status,
  };
};

export const onResError = (error: AxiosError) => {
  setSpinnerOption(false);
  return Promise.reject(error);
};
