import UserDropdown from "../dropdown/UserDropdown"
import { useSelector } from "react-redux";
import { RootState } from "../../redux/Store";

const Header = () => {
    const user = useSelector((state: RootState) => state.user.user);

  return (
    <div>
         {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">ArticleFeed</h1>
              <div className="hidden md:flex ml-10 space-x-8">
                <a href="#" className="text-indigo-600 font-medium">
                  Dashboard
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-gray-900 font-medium"
                >
                  My Articles
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              

              <div className="flex items-center">
                <img
                  src={
                    user?.image ||
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                  }
                  alt="User avatar"
                  className="h-8 w-8 rounded-full"
                />
                <span className="ml-2 font-medium text-gray-700">
                  {user?.firstName || "John"}
                </span>
                <UserDropdown />
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Header