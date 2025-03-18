/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { IarticleData } from "../interface/IarticleData";

export const publishArticle = async (
  articleDatas: IarticleData,
  userId: string | undefined
) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_SERVER_BASE_URL}/article/publish-article`,
      {
        articleDatas,
        userId,
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

export const getArticles = async (userId: string | undefined,publisher?:boolean) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_SERVER_BASE_URL}/article/get-articles`,
      { params: { userId ,publisher}, withCredentials: true }
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

export const likeArticle = async (
  articleId: string,
  userId: string | undefined
) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_SERVER_BASE_URL}/article/like`,
      {
        articleId,
        userId,
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

export const disLikeArticle  = async (
  articleId: string,
  userId: string | undefined
) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_SERVER_BASE_URL}/article/dislike`,
      {
        articleId,
        userId,
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


export const blockArticle  = async (
    articleId: string,
    userId:string | undefined
  ) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_SERVER_BASE_URL}/article/block-article`,
        {
          articleId,
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

  export const archieveArticle  = async (
    articleId: string,
  ) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_SERVER_BASE_URL}/article/archieve-article`,
        {
          articleId,
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
  
  

  export const editArticle  = async (
    articleDatas:any,
    articleId: string,
  ) => {
    console.log("ellarum indooooooooooooooooooooo",articleDatas);
    
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/article/edit-article`,
        {
            articleDatas,
            articleId,
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