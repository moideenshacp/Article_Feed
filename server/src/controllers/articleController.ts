import { Request, Response } from "express";
import Article from "../models/articleModel";
import { articleValidationSchema } from "../validators/articleValidation";
import userModel from "../models/userModel";

export const publicArtilce = async (req: Request, res: Response) => {
  try {
    const { error, value } = articleValidationSchema.validate(req.body.articleDatas, { abortEarly: false });

    if (error) {
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
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


export const getArticlesByPreference = async (req: Request, res: Response) => {
    try {
        const { userId, publisher } = req.query;

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        let articles;

        if (publisher) {  
            articles = await Article.find({ postedBy: userId})
                .populate("postedBy", "firstName lastName email image");
        } else if (!user.preferences || user.preferences.length === 0) {
            articles = await Article.find({ isArchieved:false })
                .populate("postedBy", "firstName lastName email image ");
        } else {
            articles = await Article.find({
                category: { $in: user.preferences },
                isArchieved:false
            }).populate("postedBy", "firstName lastName email image ");
        }
        return res.status(200).json({
            success: true,
            message: "Articles fetched successfully",
            articles,
        });
    } catch (error) {
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
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };

  export const blockArticle = async (req: Request, res: Response) => {
    try {
      const { articleId, userId } = req.body;
  
      // Find the user
      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }      
  
      // Check if the article is already blocked
      const isBlocked = user.blockedArticles.includes(articleId);
  
      if (isBlocked) {
        // Unblock the article by removing it from the array
        user.blockedArticles = user.blockedArticles.filter(id => id.toString() !== articleId);
      } else {
        // Block the article by adding it to the array
        user.blockedArticles.push(articleId);
      }
  
      await user.save();
  
      return res.status(200).json({
        success: true,
        message: isBlocked ? "Article unblocked successfully" : "Article blocked successfully",
        isBlocked: !isBlocked,
      });
  
    } catch (error) {
      return res.status(500).json({ success: false, message: "Internal server error" });
    }
  };
  

  export const archieveArticle = async (req:Request, res:Response) => {
    try {
      const { articleId } = req.body;
  
      // Toggle the archieve state
      const article = await Article.findById(articleId);
      if (!article) {
        return res.status(404).json({ success: false, message: "Article not found" });
      }
  
      article.isArchieved = !article.isArchieved;
      await article.save();
  
      return res.status(200).json({
        success: true,
        message: article.isArchieved ? "Article archieved successfully" : "Article unarchieved successfully",
        isArchieved: article.isArchieved,
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Internal server error" });
    }
  };

  export const updateArticle = async (req: Request, res: Response) => {
    try {        
      const { articleId } = req.body;
      const { error, value } = articleValidationSchema.validate(req.body.articleDatas, { abortEarly: false });
  
      if (error) {        
        return res.status(400).json({
          success: false,
          message: "Validation errors",
          errors: error.details.map((err) => err.message),
        });
      }
  
      const article = await Article.findById(articleId);
  
      if (!article) {
        return res.status(404).json({
          success: false,
          message: "Article not found",
        });
      }
  
      article.title = value.title;
      article.category = value.category;
      article.content = value.content;
      article.coverImage = value.coverImage;
      article.tags = value.tags;
  
      const updatedArticle = await article.save();
  
      return res.status(200).json({
        success: true,
        message: "Article updated successfully",
        article: updatedArticle,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };