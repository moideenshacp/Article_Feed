/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ArticleCard from "./ArticleCard";
import ArticleModal from "./ArticleModal";
import { RootState } from "../../redux/Store";
import Header from "./Header";
import PublishArticleModal from "./PublishArticleModal";
import { getArticles } from "../../api/ArticleApi";
import { Empty } from "antd";

const Home = () => {
  const [activeArticle, setActiveArticle] = useState(null);
  const [articles, setArticles] = useState<any>([]);
  const [showModal, setShowModal] = useState(false);
  const user = useSelector((state: RootState) => state.user.user);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchArticle = async () => {
    const res = await getArticles(user?.id);

    const formattedArticles = res.data.articles
    .filter((article: any) => !user?.blockedArticles?.includes(article._id)) // Remove blocked articles
    .map((article: any) => ({
      id: article._id,
      title: article.title,
      author: `${article.postedBy.firstName} ${article.postedBy.lastName}`,
      authorAvatar: article?.postedBy?.image,
      category: article.category,
      excerpt: article.content.slice(0, 100) + "...", // First 100 chars as excerpt
      publishedDate: new Date(article.createdAt).toDateString(), // Format date
      coverImage: article.coverImage,
      tags: article.tags.split(","), // Convert comma-separated string to array
      likes: article.likes,
      dislikes: article.dislikes,
      isBlocked: user?.blockedArticles?.includes(article._id), //  Track if it's blocked
      isArchieved: article.isArchieved,
      publisherEmail: article.postedBy.email,
      content:article.content
    }));
  
  setArticles(formattedArticles);
  };
  useEffect(() => {
    fetchArticle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const handleArticleClick = (article: any) => {
    setActiveArticle(article);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome message */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Welcome back, {user?.firstName || "John"}!
            </h2>
            <p className="text-gray-600 mt-1">
              Here are some articles based on your preferences
            </p>
          </div>

          {/* Publish Article Button */}
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition"
            onClick={() => setIsModalOpen(true)}
          >
            Publish Article +
          </button>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.length > 0 ? (
            articles.map((article: any) => (
              <ArticleCard
                key={article.id}
                article={article}
                onClick={() => handleArticleClick(article)}
              />
            ))
          ) : (
            <div className="flex justify-center ml-96 items-center w-full h-[56vh]">
              <Empty description="No articles match your preferences. Try exploring other categories!" />
            </div>
          )}
        </div>
      </main>

      {/* Article Modal */}
      {showModal && activeArticle && (
        <ArticleModal
          article={activeArticle}
          onClose={handleCloseModal}
          userId={user?.id}
          fetchArticle={fetchArticle}
        />
      )}
      {isModalOpen && (
        <PublishArticleModal
          onClose={() => setIsModalOpen(false)}
          fetchArticle={fetchArticle}
        />
      )}
    </div>
  );
};

export default Home;
