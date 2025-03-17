import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/Store";
import PersonalInfromation from "./PersonalInfromation";
import ChangePassword from "./ChangePassword";
import ArticlePre from "./ArticlePre";
import axios from "axios";
import { handleUpdateProfile } from "../../api/Profile";
import { updateUser } from "../../redux/user/UserSlice";
import { message, Spin } from "antd";

const Profile = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState(user?.image);
  const [isUploading, setIsUploading] = useState(false);

  const dispatch = useDispatch();
  // Tabs for the profile section
  const tabs = [
    "Personal Information",
    "Change Password",
    "Article Preferences",
  ];
  const [activeTab, setActiveTab] = useState("Personal Information");

  const handleImageClick = () => {
    if (!isUploading) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = async () => {
    if (!fileInputRef.current || !fileInputRef.current.files?.length) return;

    const file = fileInputRef.current.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET as string
    );

    setIsUploading(true);

    try {
      const cloudinaryRes = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_NAME
        }/image/upload`,
        formData
      );

      const imageUrl = cloudinaryRes.data.secure_url;
      setImage(imageUrl);

      if (imageUrl && user?.id) {
        const res = await handleUpdateProfile({ image: imageUrl }, user.id);

        if (res.status === 200) {
          dispatch(updateUser(res.data.user));
          message.success("Profile image updated successfully!");
        }
      } else {
        message.error("Image upload failed.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      message.error("Image upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Profile Header */}
          <div className="bg-indigo-600 py-6 px-8">
            <div className="flex items-center">
              <div className="relative group">
                <div className="relative">
                  <img
                    src={
                      image ||
                      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                    }
                    alt="User avatar"
                    className={`h-16 w-16 rounded-full border-2 border-white object-cover ${
                      isUploading ? "opacity-50" : ""
                    }`}
                  />
                  {isUploading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Spin size="large" />
                    </div>
                  )}
                </div>

                <div
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-30 rounded-full transition-all duration-200 cursor-pointer"
                  onClick={handleImageClick}
                >
                  {!isUploading && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  )}
                </div>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*"
                  disabled={isUploading}
                />
              </div>
              <div className="ml-4">
                <h1 className="text-2xl font-bold text-white">
                  {user?.firstName || "John"} {user?.lastName || "Doe"}
                </h1>
                <p className="text-indigo-100">
                  {user?.email || "john.doe@example.com"}
                </p>
              </div>
            </div>
          </div>

          {/* Profile Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                  }}
                  className={`px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 ${
                    activeTab === tab
                      ? "border-indigo-600 text-indigo-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Personal Information Tab */}
            {activeTab === "Personal Information" && <PersonalInfromation />}
            {/* Change Password Tab */}
            {activeTab === "Change Password" && <ChangePassword />}

            {/* Article Preferences Tab */}
            {activeTab === "Article Preferences" && <ArticlePre />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
