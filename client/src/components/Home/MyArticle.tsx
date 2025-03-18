/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Empty } from "antd";
import ArticleCard from "./ArticleCard";
import ArticleModal from "./ArticleModal";
import { RootState } from "../../redux/Store";
import Header from "./Header";
import PublishArticleModal from "./PublishArticleModal";
import { getArticles } from "../../api/ArticleApi";

const MyArticles = () => {
  const [activeArticle, setActiveArticle] = useState(null);
  const [userArticles, setUserArticles] = useState<any>([]);
  const [showModal, setShowModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useSelector((state: RootState) => state.user.user);
  const [editArticle, setEditArticle] = useState<any>(null);

  const handleEditArticle = (article: any) => {
    setEditArticle(article);  
    setIsModalOpen(true);  
  };
  

  const fetchUserArticles = async () => {
    if (!user?.id) return;
    
    try {
      const res = await getArticles(user.id,true); 
      console.log(res.data.articles, "User's articles");

      const formattedArticles = res.data.articles
        .filter((article: any) => article.postedBy._id === user.id)
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
          isBlocked :article.isBlocked,
          publisherEmail:article.postedBy.email,
          isArchieved:article.isArchieved,
          content:article.content
        }));

      setUserArticles(formattedArticles);
    } catch (error) {
      console.error("Error fetching user articles:", error);
    }
  };

  useEffect(() => {
    fetchUserArticles();
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
        {/* Page heading */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">My Articles</h2>
            <p className="text-gray-600 mt-1">
              Manage and view all articles you've published
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
          {userArticles.length > 0 ? (
            userArticles.map((article: any) => (
              <ArticleCard
                key={article.id}
                article={article}
                onClick={() => handleArticleClick(article)}
                onEdit={handleEditArticle}
              />
            ))
          ) : (
            <div className="flex justify-center col-span-3 items-center w-full h-[56vh]">
              <Empty 
                description="You haven't published any articles yet." 
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
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
          fetchArticle={fetchUserArticles}
        />
      )}
      
      {/* Publish Article Modal */}
      {isModalOpen && (
        <PublishArticleModal
        onClose={() => {
            setIsModalOpen(false);
            setEditArticle(null); // Reset after closing
          }}
          fetchArticle={fetchUserArticles}
          article={editArticle}
        />
      )}
    </div>
  );
};

export default MyArticles;