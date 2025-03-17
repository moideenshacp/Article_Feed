/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ArticleCard from "./ArticleCard";
import ArticleModal from "./ArticleModal";
import { RootState } from "../../redux/Store";
import Header from "./Header";
import PublishArticleModal from "./PublishArticleModal";
import { getArticles } from "../../api/ArticleApi";

const Home = () => {
  const [activeArticle, setActiveArticle] = useState(null);
  const [articles,setArticles] = useState<any>([])
  const [showModal, setShowModal] = useState(false);
  const user = useSelector((state: RootState) => state.user.user);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchArticle = async()=>{    
      const res = await getArticles(user?.id)
      console.log(res.data.articles,"ogggggggggggggggg");
      
    const formattedArticles = res.data.articles.map((article: any) => ({
        
        
        id: article._id,
        title: article.title,
        author: `${article.postedBy.firstName} ${article.postedBy.lastName}`, 
        authorAvatar: article?.postedBy?.image, 
        category: article.category,
        excerpt: article.content.slice(0, 100) + "...", // First 100 chars as excerpt
        publishedDate: new Date(article.createdAt).toDateString(), // Format date
        coverImage: article.coverImage,
        tags: article.tags.split(","), // Convert comma-separated string to array
        likes:article.likes,
        dislikes:article.dislikes
      }));
  
      setArticles(formattedArticles);
      
  }
  useEffect(()=>{    
    fetchArticle()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[user?.id])

  console.log(articles,);
  

//   // Dummy data for articles
//   const dummyArticles = [
//     {
//       id: 1,
//       title: "The Future of Renewable Energy",
//       author: "Alex Johnson",
//       authorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
//       category: "Technology",
//       excerpt:
//         "Exploring the latest innovations in sustainable energy solutions and their impact on global climate goals.",
//       publishedDate: "Mar 15, 2025",
//       readTime: "5 min read",
//       likes: 124,
//       coverImage:
//         "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&auto=format&fit=crop",
//       tags: ["renewable", "climate", "technology"],
//     },
//     {
//       id: 2,
//       title: "Artificial Intelligence in Healthcare",
//       author: "Sarah Williams",
//       authorAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
//       category: "Health",
//       excerpt:
//         "How AI is revolutionizing diagnostics, treatment plans, and patient care in modern medical facilities.",
//       publishedDate: "Mar 14, 2025",
//       readTime: "8 min read",
//       likes: 89,
//       coverImage:
//         "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop",
//       tags: ["healthcare", "AI", "medicine"],
//     },
//     {
//       id: 3,
//       title: "Financial Markets: 2025 Outlook",
//       author: "Michael Chen",
//       authorAvatar: "https://randomuser.me/api/portraits/men/67.jpg",
//       category: "Finance",
//       excerpt:
//         "Analysis of current trends and predictions for financial markets in the coming year.",
//       publishedDate: "Mar 12, 2025",
//       readTime: "7 min read",
//       likes: 56,
//       coverImage:
//         "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop",
//       tags: ["finance", "investment", "economy"],
//     },
//     {
//       id: 4,
//       title: "The Psychology of Productivity",
//       author: "Emma Thompson",
//       authorAvatar: "https://randomuser.me/api/portraits/women/22.jpg",
//       category: "Psychology",
//       excerpt:
//         "Understanding how our minds work to optimize productivity and achieve better work-life balance.",
//       publishedDate: "Mar 10, 2025",
//       readTime: "6 min read",
//       likes: 112,
//       coverImage:
//         "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop",
//       tags: ["productivity", "psychology", "wellbeing"],
//     },
//     {
//       id: 5,
//       title: "Sustainable Urban Planning",
//       author: "David Garcia",
//       authorAvatar: "https://randomuser.me/api/portraits/men/42.jpg",
//       category: "Environment",
//       excerpt:
//         "How cities are redesigning infrastructure to support growing populations while reducing environmental impact.",
//       publishedDate: "Mar 8, 2025",
//       readTime: "9 min read",
//       likes: 76,
//       coverImage:
//         "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&auto=format&fit=crop",
//       tags: ["urban", "sustainability", "environment"],
//     },
//     {
//       id: 6,
//       title: "Advancements in Quantum Computing",
//       author: "Lisa Patel",
//       authorAvatar: "https://randomuser.me/api/portraits/women/65.jpg",
//       category: "Technology",
//       excerpt:
//         "Recent breakthroughs in quantum computing and what they mean for future technological capabilities.",
//       publishedDate: "Mar 5, 2025",
//       readTime: "10 min read",
//       likes: 98,
//       coverImage:
//         "https://images.unsplash.com/photo-1510906594845-bc082582c8cc?w=800&auto=format&fit=crop",
//       tags: ["quantum", "computing", "technology"],
//     },
//   ];

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
          {articles.map((article:any) => (
            <ArticleCard
              key={article.id}
              article={article}
              onClick={() => handleArticleClick(article)}
            />
          ))}
        </div>
      </main>
  
      {/* Article Modal */}
      {showModal && activeArticle && (
        <ArticleModal article={activeArticle} onClose={handleCloseModal} userId={user?.id} />
      )}
      {isModalOpen && <PublishArticleModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
  
};

export default Home;
