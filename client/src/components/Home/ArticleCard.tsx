/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/Store";
import { FaEdit } from "react-icons/fa";

const ArticleCard: React.FC<any> = ({ article, onClick, onEdit }) => {
  const user = useSelector((state: RootState) => state.user.user);
  const userHasLiked = article.likes.includes(user?.id);
  const isPublisher = user?.email=== article.publisherEmail; 

  return (
    <div
      className={`bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 cursor-pointer ${
        article.isArchieved ? "border border-gray-300" : ""
      }`}
      onClick={onClick}
    >
      <div className="h-48 overflow-hidden relative">
        <img
          src={article.coverImage}
          alt={article.title}
          className={`w-full h-full object-cover ${
            article.isArchieved ? "opacity-70" : ""
          }`}
        />
        {isPublisher && (
          <button
            className="absolute top-3 right-3 bg-white p-1 rounded-full shadow-md hover:bg-gray-200"
            onClick={(e) => {
                e.stopPropagation();
                onEdit(article); 
              }}
          >
            <FaEdit className="text-gray-700" size={18} />
          </button>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="inline-block px-3 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">
            {article.category}
          </span>
        </div>
        <h3
          className={`text-lg font-bold mb-2 line-clamp-2 ${
            article.isArchieved ? "text-gray-600" : "text-gray-900"
          }`}
        >
          {article.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{article.excerpt}</p>

        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img
              src={article.authorAvatar}
              alt={article.author}
              className="h-8 w-8 rounded-full mr-2"
            />
            <div>
              <p className="text-sm font-medium text-gray-900">{article.author}</p>
              <p className="text-xs text-gray-500">{article.publishedDate}</p>
            </div>
          </div>
          <div className="flex items-center text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 mr-1 ${userHasLiked ? "text-red-500" : "text-gray-500"}`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm">{article.likes.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;