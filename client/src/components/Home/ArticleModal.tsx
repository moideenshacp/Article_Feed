/* eslint-disable @typescript-eslint/no-explicit-any */
import { Ban, ThumbsDown, ThumbsUp, X } from "lucide-react";
import React, { useState } from "react";
import {
  archieveArticle,
  blockArticle,
  disLikeArticle,
  likeArticle,
} from "../../api/ArticleApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/Store";
import { updateBlock } from "../../redux/user/UserSlice";

const ArticleModal: React.FC<any> = ({
  article,
  onClose,
  userId,
  fetchArticle,
}) => {
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const [isBlocked, setIsBlocked] = useState(article.isBlocked);
  const [isLiked, setIsLiked] = useState(article.likes.includes(userId));
  const [isArchived, setIsArchived] = useState(article.isArchieved);
  const [isDisliked, setIsDisliked] = useState(
    article.dislikes.includes(userId)
  );
  const [likeCount, setLikeCount] = useState(article.likes.length);
  const [dislikeCount, setDislikeCount] = useState(article.dislikes.length);

  const handleLike = async () => {
    try {
      const response = await likeArticle(article.id, userId);

      setLikeCount(response.data.likes);
      setDislikeCount(response.data.dislikes);
      setIsLiked(!isLiked);
      if (isDisliked) setIsDisliked(false);
      fetchArticle();
    } catch (error) {
      console.error("Error liking article:", error);
    }
  };

  const handleDislike = async () => {
    try {
      const response = await disLikeArticle(article.id, userId);

      setLikeCount(response.data.likes);
      setDislikeCount(response.data.dislikes);
      setIsDisliked(!isDisliked);
      fetchArticle();
      if (isLiked) setIsLiked(false);
    } catch (error) {
      console.error("Error disliking article:", error);
    }
  };
  const handleBlock = async () => {
    try {

      const response = await blockArticle(article.id, user?.id);
      const isBlocked = response.data.isBlocked;

      setIsBlocked(isBlocked);
      fetchArticle();
      dispatch(updateBlock({ articleId: article.id, isBlocked }));

    } catch (error) {
      console.error("Error blocking article:", error);
    }
  };

  const handleArchive = async () => {
    try {
      const response = await archieveArticle(article.id);
      setIsArchived(response.data.isArchieved);
      fetchArticle();
    } catch (error) {
      console.error("Error archiving/unarchiving article:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-white rounded-full p-1 shadow-md z-10"
        >
          <X className="h-6 w-6 text-gray-500 hover:text-gray-900" />
        </button>

        {/* Article header image */}
        <div className="h-64 w-full">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article content */}
        <div className="p-6 overflow-y-auto flex-grow">
          <div className="flex items-center space-x-2 mb-4">
            <span className="px-3 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">
              {article.category}
            </span>
            <span className="text-sm text-gray-500">
              {article.publishedDate} • {article.readTime}
            </span>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {article.title}
          </h2>

          <div className="flex items-center mb-6">
            <img
              src={article.authorAvatar}
              alt={article.author}
              className="h-10 w-10 rounded-full mr-3"
            />
            <div>
              <p className="font-medium text-gray-900">{article.author}</p>
              <p className="text-sm text-gray-500">Author</p>
            </div>
          </div>
    
          {/* Dummy article content */}
          <div className="prose max-w-none">
            <p className="mb-4">{article.excerpt}</p>
          </div>

          {/* Tags */}
          <div className="mt-6 flex flex-wrap gap-2">
            {article.tags.map((tag: any, index: number) => (
              <span
                key={index}
                className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Actions footer */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <button
                onClick={handleLike}
                className={`flex items-center space-x-1 ${
                  isLiked ? "text-indigo-600" : "text-gray-600"
                }`}
              >
                <ThumbsUp
                  className="h-6 w-6"
                  fill={isLiked ? "currentColor" : "none"}
                  strokeWidth={isLiked ? 0 : 2}
                />

                <span>{likeCount} Like</span>
              </button>

              <button
                onClick={handleDislike}
                className={`flex items-center space-x-1 ${
                  isDisliked ? "text-red-600" : "text-gray-600"
                }`}
              >
                <ThumbsDown
                  className="h-6 w-6"
                  fill={isDisliked ? "currentColor" : "none"}
                  strokeWidth={isDisliked ? 0 : 2}
                />

                <span>{dislikeCount} Dislike</span>
              </button>
            </div>

            {user?.email === article.publisherEmail ? (
              <button
                onClick={handleArchive}
                className={`flex items-center space-x-1 ${
                  isArchived ? "text-gray-600" : "text-blue-600"
                }`}
              >
                <Ban className="h-6 w-6" />
                <span>{isArchived ? "Unarchive" : "Archive"}</span>
              </button>
            ) : (
              <button
                onClick={handleBlock}
                className={`flex items-center space-x-1 ${
                  isBlocked ? "text-green-600" : "text-red-600"
                }`}
              >
                <Ban className="h-6 w-6" />
                <span>{isBlocked ? "Unblock" : "Block"}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleModal;
