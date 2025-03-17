import Joi from "joi";

export const updateProfileSchema = Joi.object({
  firstName: Joi.string().trim().min(2).max(30).optional().messages({
    "string.min": "First Name must be at least 2 characters",
    "string.max": "First Name must be less than 30 characters",
  }),
  lastName: Joi.string().trim().min(2).max(30).optional().messages({
    "string.min": "Last Name must be at least 2 characters",
    "string.max": "Last Name must be less than 30 characters",
  }),
  email: Joi.string().trim().email({ tlds: { allow: false } }).optional().messages({
    "string.email": "Invalid email format",
  }),
  phone: Joi.string()
    .trim()
    .pattern(/^\d{10,15}$/)
    .optional()
    .messages({
      "string.pattern.base": "Invalid phone number format",
    }),
  dob: Joi.string().optional().messages({
    "string.empty": "Date of Birth is required",
  }),
  currentPassword: Joi.string().when("newPassword", {
    is: Joi.exist(),
    then: Joi.required().messages({ "any.required": "Current password is required when updating password" }),
  }),
  newPassword: Joi.string().min(6).optional().messages({
    "string.min": "New password must be at least 6 characters long",
  }),
  confirmPassword: Joi.any().optional().valid(Joi.ref("newPassword")).messages({
    "any.only": "Passwords do not match",
    "string.empty": "Confirm Password is required",
  }),
  image: Joi.string().optional().messages({
    "string.empty": "Image is required",
  }),
  preferences: Joi.array().optional().messages({
    "array.min": "Please select at least one preferencee",
  }),
});

export const signUpSchema = Joi.object({
  firstName: Joi.string().trim().min(2).max(30).required().messages({
    "string.empty": "First Name is required",
    "string.min": "First Name must be at least 2 characters",
    "string.max": "First Name must be less than 30 characters",
  }),
  lastName: Joi.string().trim().min(2).max(30).required().messages({
    "string.empty": "Last Name is required",
    "string.min": "Last Name must be at least 2 characters",
    "string.max": "Last Name must be less than 30 characters",
  }),
  email: Joi.string().trim().email({ tlds: { allow: false } }).required().messages({
    "string.email": "Invalid email format",
    "string.empty": "Email is required",
  }),
  phone: Joi.string()
    .trim()
    .pattern(/^\d{10,15}$/)
    .required()
    .messages({
      "string.pattern.base": "Invalid phone number format",
      "string.empty": "Phone number is required",
    }),
  dob: Joi.string().required().messages({
    "string.empty": "Date of Birth is required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters",
    "string.empty": "Password is required",
  }),
  confirmPassword: Joi.any().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords do not match",
    "string.empty": "Confirm Password is required",
  }),
  preferences: Joi.array().optional().messages({
    "array.min": "Please select at least one preference",
  }),
});
