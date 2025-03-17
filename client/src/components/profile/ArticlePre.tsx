import { Link } from "react-router-dom";
import Button from "../../shared/Button";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/Store";
import { message } from "antd";
import { handleUpdateProfile } from "../../api/Profile";
import { IprofileUpdate } from "../../interface/ProfileUpdate";
import { updateUser } from "../../redux/user/UserSlice";

const ArticlePre = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Dummy categories for article preferences
  const categories = [
    "Technology",
    "Health",
    "Finance",
    "Sports",
    "Entertainment",
    "News",
  ];

  const [selectedPreferences, setSelectedPreferences] = useState(
    user?.preferences
      ? user.preferences.map(
          (pref) => pref.charAt(0).toUpperCase() + pref.slice(1)
        )
      : []
  );

  // Toggle category selection
  const toggleCategory = (category: string) => {
    setSelectedPreferences((prev: string[]) => {
      if (prev.includes(category)) {
        return prev.filter((item) => item !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const handlePreferencesSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload: IprofileUpdate = {
        preferences: selectedPreferences,
      };

      const res = await handleUpdateProfile(payload, user?.id);
      if (res.status === 200) {
        dispatch(updateUser(res.data.user));
        message.success("Preference updated successfully..");
      }
      setIsSubmitting(false);
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <form onSubmit={handlePreferencesSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select categories you're interested in:
          </label>
          <p className="text-sm text-gray-500 mb-4">
            Articles from these categories will appear on your dashboard
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {categories.map((category) => (
              <div
                key={category}
                onClick={() => toggleCategory(category)}
                className={`
                          flex items-center px-4 py-3 rounded-lg cursor-pointer transition-colors
                          ${
                            selectedPreferences?.includes(category)
                              ? "bg-indigo-100 border border-indigo-300"
                              : "bg-gray-50 border border-gray-200 hover:bg-gray-100"
                          }
                        `}
              >
                <div
                  className={`
                          w-5 h-5 rounded border flex items-center justify-center
                          ${
                            selectedPreferences?.includes(category)
                              ? "bg-indigo-600 border-indigo-600"
                              : "border-gray-300"
                          }
                        `}
                >
                  {selectedPreferences?.includes(category) && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
                <span className="ml-2 text-sm font-medium">{category}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="mt-6">
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
              isLoading={isSubmitting}
            >
              {isSubmitting ? "Updating..." : "Update Preferences"}
            </Button>
          </div>
          <div>
            <br />
            <Link to="/home">
              <Button type="submit" variant="primary">
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ArticlePre;
