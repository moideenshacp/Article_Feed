import Joi from "joi";

export const articleValidationSchema = Joi.object({
  title: Joi.string().trim().required().messages({
    "string.empty": "Title is required",
  }),
  category: Joi.string().trim().required().messages({
    "string.empty": "Category is required",
  }),
  content: Joi.string().trim().required().messages({
    "string.empty": "Content is required",
  }),
  tags: Joi.string().trim().required().messages({
    "string.empty": "Tags are required",
  }),
  coverImage: Joi.string().uri().required().messages({
    "string.uri": "Invalid image URL",
    "string.empty": "Cover image is required",
  }),
  userId: Joi.string().optional().hex().length(24).messages({
    "string.hex": "Invalid User ID",
    "string.length": "User ID must be 24 characters",
  }),
});
