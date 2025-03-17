/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { Isignin, Isignup } from "../interface/ISignUp";

export const handleSignUp = async (singUpDatas: Isignup) => {
  try {

    const res = await axios.post(
      `${import.meta.env.VITE_SERVER_BASE_URL}/auth/sign-up`,
      {
        datas: singUpDatas,
      },
      {
        withCredentials: true,
      }
    );

    return res;
  } catch (error:any) {
    if (error.response) {
        throw new Error(error.response.data.message || "Something went wrong");
    } else {
        throw new Error("Network Error. Please try again.");
    }
  }
};

export const handleSignIn = async (singInDatas: Isignin) => {
    try {
  
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/auth/sign-in`,
        {
          datas: singInDatas,
        },
        {
          withCredentials: true,
        }
      );
  
      return res;
    } catch (error:any) {
        if (error.response) {
            throw new Error(error.response.data.message || "Something went wrong");
        } else {
            throw new Error("Network Error. Please try again.");
        }
    }
  };