import React, { useState } from "react";
import InputField from "../../shared/InputField";
import Button from "../../shared/Button";
import { ImagePlus, X } from "lucide-react";
import { RootState } from "../../redux/Store";
import { useSelector } from "react-redux";
import {  publishArticle } from "../../api/ArticleApi";
import axios from "axios";
import { message } from "antd";

interface PublishArticleModalProps {
  onClose: () => void;
  fetchArticle:()=>void
}

const PublishArticleModal: React.FC<PublishArticleModalProps> = ({
  onClose,
  fetchArticle
}) => {
  const user = useSelector((state: RootState) => state.user.user);

  const [articleData, setArticleData] = useState({
    title: "",
    category: "",
    content: "",
    tags: "",
  });

  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State for individual field errors
  const [errors, setErrors] = useState({
    title: "",
    category: "",
    content: "",
    coverImage: "",
  });

  const categories = [
    "Technology",
    "Health",
    "Finance",
    "Sports",
    "Entertainment",
    "News",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setArticleData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Remove error for the field when user starts typing
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    const file = e.target.files[0];
    setCoverImage(file);

    // Create preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setPreviewUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);

    // Remove error when image is uploaded
    setErrors((prev) => ({
      ...prev,
      coverImage: "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      title: "",
      category: "",
      content: "",
      coverImage: "",
    };

    // Validation for each field
    if (!articleData.title.trim()) newErrors.title = "Title is required";
    if (!articleData.category) newErrors.category = "Category is required";
    if (!articleData.content.trim()) newErrors.content = "Content is required";
    if (!coverImage) newErrors.coverImage = "Cover image is required";

    // If any errors exist, update state and stop form submission
    if (Object.values(newErrors).some((error) => error !== "")) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      let imageUrl = "";

      if (coverImage) {
        const formData = new FormData();
        formData.append("file", coverImage);
        formData.append(
          "upload_preset",
          import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET as string
        );

        const cloudinaryRes = await axios.post(
          `https://api.cloudinary.com/v1_1/${
            import.meta.env.VITE_CLOUDINARY_NAME
          }/image/upload`,
          formData
        );

        imageUrl = cloudinaryRes.data.secure_url;
      }

      // Submit the article with the uploaded image URL
      const articleDatas = {
        ...articleData,
        coverImage: imageUrl,
      };

      const res = await publishArticle(articleDatas, user?.id);
      if (res.status === 201) {
        message.success("Article published sucessfully!!");
        fetchArticle()
        onClose();
      }
      setIsSubmitting(false);
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="bg-indigo-600 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Publish New Article</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-indigo-200"
          >
            <X className="h-6 w-6 text-current" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto flex-grow">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Title */}
              <div>
                <InputField
                  label="Article Title"
                  type="text"
                  id="title"
                  name="title"
                  value={articleData.title}
                  onChange={handleInputChange}
                  placeholder="Enter a catchy title for your article"
                  required
                />
                {errors.title && (
                  <p className="text-sm text-red-500">{errors.title}</p>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={articleData.category}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-sm text-red-500">{errors.category}</p>
                )}
              </div>

              {/* Cover Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cover Image
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  {previewUrl ? (
                    <div className="space-y-2 text-center">
                      <img
                        src={previewUrl}
                        alt="Cover preview"
                        className="mx-auto h-48 w-full object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setCoverImage(null);
                          setPreviewUrl("");
                        }}
                        className="text-sm text-indigo-600 hover:text-indigo-500"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-1 text-center">
                      <ImagePlus className="mx-auto h-12 w-12 text-gray-400" />
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                        <span>Upload a file</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          onChange={handleImageChange}
                        />
                      </label>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  )}
                </div>
                {errors.coverImage && (
                  <p className="text-sm text-red-500">{errors.coverImage}</p>
                )}
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Article Content
                </label>
                <textarea
                  id="content"
                  name="content"
                  rows={8}
                  value={articleData.content}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                ></textarea>
                {errors.content && (
                  <p className="text-sm text-red-500">{errors.content}</p>
                )}

                <div>
                  <br /> {/* Tags */}
                  <InputField
                    label="Tags"
                    type="text"
                    id="tags"
                    name="tags"
                    value={articleData.tags}
                    onChange={handleInputChange}
                    placeholder="Enter tags separated by commas (e.g., technology, ai, future)"
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <br />
            <div className="border-t border-gray-200 px-6 py-4 flex justify-end space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting}
                isLoading={isSubmitting}
              >
                {isSubmitting ? "Publishing..." : "Publish Article"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PublishArticleModal;
