import { Request, Response } from "express";
import Article from "../models/articleModel";
import { articleValidationSchema } from "../validators/articleValidation";
import userModel from "../models/userModel";

export const publicArtilce = async (req: Request, res: Response) => {
  try {
    const { error, value } = articleValidationSchema.validate(req.body.articleDatas, { abortEarly: false });

    if (error) {
        console.log(error);
      return res.status(400).json({
        success: false,
        message: "Validation errors",
        errors: error.details.map((err) => err.message),
      });
      
    }
    const newArticle = new Article({
      postedBy: req.body.userId,
      title: value.title,
      category: value.category,
      content: value.content,
      coverImage: value.coverImage,
      tags: value.tags,
    });

    const savedArticle = await newArticle.save();

    return res.status(201).json({
      success: true,
      message: "Article published successfully",
      article: savedArticle,
    });
  } catch (error) {
    console.error("Error publishing article:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


export const getArticlesByPreference = async (req: Request, res: Response) => {
    try {
      console.log("Fetching articles based on user preference...");
  
      const { userId } = req.query;
  
      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
  
      console.log("User preferences count:", user.preferences?.length || 0);
  
      let articles;
  
      if (!user.preferences || user.preferences.length === 0) {
        console.log("No preferences found, returning all articles...");
        articles = await Article.find().populate("postedBy", "firstName lastName email image");
      } else {
        articles = await Article.find({
          category: { $in: user.preferences },
        }).populate("postedBy", "firstName lastName email image");
      }
  
      console.log("Articles fetched:", articles.length);
  
      return res.status(200).json({
        success: true,
        message: "Articles fetched successfully",
        articles,
      });
    } catch (error) {
      console.error("Error fetching articles:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };
  

  export const likeArticle = async (req: Request, res: Response) => {
    try {
      const { articleId, userId } = req.body;
  
      const article = await Article.findById(articleId);
      if (!article) {
        return res.status(404).json({ success: false, message: "Article not found" });
      }
  
      // If user has disliked before, remove from dislikes
      article.dislikes = article.dislikes.filter(id => id.toString() !== userId);
  
      // If user has already liked, remove the like
      if (article.likes.includes(userId)) {
        article.likes = article.likes.filter(id => id.toString() !== userId);
      } else {
        // Otherwise, add the like
        article.likes.push(userId);
      }
  
      await article.save();
  
      res.status(200).json({
        success: true,
        message: "Article liked successfully",
        likes: article.likes.length,
        dislikes: article.dislikes.length,
      });
    } catch (error) {
      console.error("Error liking article:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };
  
  export const dislikeArticle = async (req: Request, res: Response) => {
    try {
      const { articleId, userId } = req.body;
  
      const article = await Article.findById(articleId);
      if (!article) {
        return res.status(404).json({ success: false, message: "Article not found" });
      }
  
      // If user has liked before, remove from likes
      article.likes = article.likes.filter(id => id.toString() !== userId);
  
      // If user has already disliked, remove the dislike
      if (article.dislikes.includes(userId)) {
        article.dislikes = article.dislikes.filter(id => id.toString() !== userId);
      } else {
        // Otherwise, add the dislike
        article.dislikes.push(userId);
      }
  
      await article.save();
  
      res.status(200).json({
        success: true,
        message: "Article disliked successfully",
        likes: article.likes.length,
        dislikes: article.dislikes.length,
      });
    } catch (error) {
      console.error("Error disliking article:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };