import { Link } from "react-router-dom";
import Button from "../../shared/Button";
import InputField from "../../shared/InputField";
import React, { useState } from "react";
import { handleUpdateProfile } from "../../api/Profile";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/Store";
import { message } from "antd";

const ChangePassword = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [err, setErr] = useState("");
  const [passwordInfo, setPasswordInfo] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErr("");
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (passwordInfo.newPassword.length < 6) {
      setErr("Password length should min 6");
      setIsSubmitting(false);
      return;
    }
    // Validate passwords
    if (passwordInfo.newPassword !== passwordInfo.confirmPassword) {
      setErr("Passwords do not match");
      setIsSubmitting(false);
      return;
    }

    try {

      const res = await handleUpdateProfile(passwordInfo, user?.id);
      if (res.status === 200) {
        message.success("Password updated sucessfully");
        setPasswordInfo({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
      setIsSubmitting(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong!";

      setIsSubmitting(false);
      message.error(errorMessage);
    }
  };
  return (
    <div>
      <form onSubmit={handlePasswordSubmit}>
        <div className="space-y-6">
          <InputField
            label="Current Password"
            type="password"
            id="currentPassword"
            name="currentPassword"
            value={passwordInfo.currentPassword}
            onChange={handlePasswordChange}
            placeholder="••••••••"
            required
          />

          <InputField
            label="New Password"
            type="password"
            id="newPassword"
            name="newPassword"
            value={passwordInfo.newPassword}
            onChange={handlePasswordChange}
            placeholder="••••••••"
            required
          />

          <InputField
            label="Confirm New Password"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={passwordInfo.confirmPassword}
            onChange={handlePasswordChange}
            placeholder="••••••••"
            required
          />
          {err && <p className="text-red-500 text-sm">{err}</p>}
        </div>

        <div>
          <div className="mt-6">
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
              isLoading={isSubmitting}
            >
              {isSubmitting ? "Changing..." : "Change Password"}
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

export default ChangePassword;
