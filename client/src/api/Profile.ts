/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { IprofileUpdate } from "../interface/ProfileUpdate";

export const handleUpdateProfile = async (updateDatas: IprofileUpdate,userId:string | undefined) => {
  try {    
    const res = await axios.patch(
      `${import.meta.env.VITE_SERVER_BASE_URL}/auth/update-profile`,
      {
        datas: updateDatas,
        userId
      },
      {
        withCredentials: true,
      }
    );

    return res;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || "Something went wrong");
    } else {
      throw new Error("Network Error. Please try again.");
    }
  }
};
