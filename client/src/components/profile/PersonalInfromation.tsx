import { useDispatch, useSelector } from "react-redux";
import Button from "../../shared/Button";
import InputField from "../../shared/InputField";
import { RootState } from "../../redux/Store";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { handleUpdateProfile } from "../../api/Profile";
import { updateUser } from "../../redux/user/UserSlice";
import { message } from "antd";
import { personalInfoSchema } from "../../validators/PersonalInfoSchema";

const PersonalInfromation = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Form states
  const [personalInfo, setPersonalInfo] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    dob: user?.dob || "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Handle changes in form fields
  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersonalInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const { error } = personalInfoSchema.validate(personalInfo, {
      abortEarly: false,
    });

    if (error) {
      const validationErrors: { [key: string]: string } = {};
      error.details.forEach((err) => {
        validationErrors[err.path[0] as string] = err.message;
      });
      setErrors(validationErrors);
      return false;
    }

    return true;
  };

  // Handle form submissions
  const handlePersonalInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }
    try {
      const res = await handleUpdateProfile(personalInfo, user?.id);
      setIsSubmitting(false);
      if (res.status === 200) {
        dispatch(updateUser(res.data.user));
        message.success("Profile updated successfully!");
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      console.log(error);
      const errorMessage = error.response?.data?.message || error.message || "Something went wrong!";
  
        message.error(errorMessage);
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <form onSubmit={handlePersonalInfoSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <InputField
              label="First Name"
              type="text"
              id="firstName"
              name="firstName"
              value={personalInfo.firstName}
              onChange={handlePersonalInfoChange}
              placeholder="Your first name"
              required
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName}</p>
            )}
          </div>

          <div>
            <InputField
              label="Last Name"
              type="text"
              id="lastName"
              name="lastName"
              value={personalInfo.lastName}
              onChange={handlePersonalInfoChange}
              placeholder="Your last name"
              required
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName}</p>
            )}
          </div>
          <div>
            <InputField
              label="Email Address"
              type="email"
              id="email"
              name="email"
              value={personalInfo.email}
              onChange={handlePersonalInfoChange}
              placeholder="Your email address"
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          <div>
            <InputField
              label="Phone Number"
              type="tel"
              id="phone"
              name="phone"
              value={personalInfo.phone}
              onChange={handlePersonalInfoChange}
              placeholder="Your phone number"
              required
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>
          <div>
            <InputField
              label="Date of Birth"
              type="date"
              id="dob"
              name="dob"
              value={personalInfo.dob}
              onChange={handlePersonalInfoChange}
              required
            />
            {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
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
              {isSubmitting ? "Updating..." : "Update Information"}
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

export default PersonalInfromation;
