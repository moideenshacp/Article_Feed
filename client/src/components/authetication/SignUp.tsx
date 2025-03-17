import { Link, useNavigate } from "react-router-dom";
import Button from "../../shared/Button";
import Checkbox from "../../shared/CheckBox";
import InputField from "../../shared/InputField";
import PreferenceOption from "../../shared/PreferenceOption";
import { DatePicker, message } from "antd";
import {
  entertainmentIcon,
  financeIcon,
  healthIcon,
  newsIcon,
  sportsIcon,
  techIcon,
} from "../../icons/SignUpIcons";
import { useState } from "react";
import { Isignup } from "../../interface/ISignUp";
import dayjs from "dayjs";
import { handleSignUp } from "../../api/AuthApi";
import { signUpSchema } from "../../validators/SignUpValidatort";

const SignUp = () => {
  const [datas, setDatas] = useState<Isignup>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    password: "",
    confirmPassword: "",
    preferences: [],
  });
  const [emailErr,setEmailErr] = useState("")
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading,setIsLoading] = useState(false)

  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDatas((pre) => ({
      ...pre,
      [name]: value,
    }));
    setErrors({})
    setEmailErr("")
  };
  const handleDateChange = (date: dayjs.Dayjs | null) => {
    if (date) {
      setDatas((prev) => ({
        ...prev,
        dob: date.format("YYYY-MM-DD"), // Store as a string (ISO format)
      }));
    }
    setErrors({})
    setEmailErr("")
  };
  const handleArticleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;

    setDatas((prev) => ({
      ...prev,
      preferences: checked
        ? [...(prev.preferences || []), id] // Add if checked
        : (prev.preferences || []).filter((item) => item !== id), // Remove if unchecked
    }));
    setErrors({})
    setEmailErr("")
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true)
    console.log("koii");
    
    const { error } = signUpSchema.validate(datas, { abortEarly: false });
    if (error) {
      const newErrors: { [key: string]: string } = {};
      error.details.forEach((err) => {
        newErrors[err.path[0] as string] = err.message;
      });
      setErrors(newErrors);
      setIsLoading(false)
      return;
    }

    setErrors({});
    try {
      const res = await handleSignUp(datas);
console.log("jiii");

      console.log(res, "Response from signup");
        setIsLoading(false)
      if (res?.status === 201) {
        message.success("Sign up successfully completed, Please Login now!!");
        navigate("/sign-in");
      } else {
        message.error("Something went wrong. Please try again.");
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      console.error("Signup Error:", error);
      setIsLoading(false)
      const errorMessage = error.response?.data?.message || error.message || "Something went wrong!";
      if(errorMessage === "Email already registered."){        
        setEmailErr("Email already registered.")
      }
  
      message.success(errorMessage);
      message.error("Signup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Create Your Account
          </h1>
          <p className="mt-2 text-gray-600">
            Join our community and customize your article feeds
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <InputField
                    label="First Name"
                    type="text"
                    id="firstName"
                    placeholder="John"
                    required
                    onChange={handleChange}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.firstName}
                    </p>
                  )}
                </div>
                <div>
                  <InputField
                    label="Last Name"
                    type="text"
                    id="lastName"
                    placeholder="Doe"
                    required
                    onChange={handleChange}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.lastName}
                    </p>
                  )}
                </div>
                <div>
                  <InputField
                    label="Email"
                    type="email"
                    id="email"
                    placeholder="youremail@example.com"
                    required
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                  {emailErr && (
                    <p className="text-red-500 text-xs mt-1">{emailErr}</p>
                  )}
                </div>
                <div>
                  <InputField
                    label="Phone Number"
                    type="tel"
                    id="phone"
                    placeholder="(123) 456-7890"
                    onChange={handleChange}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Birth
                  </label>
                  <DatePicker
                    
                    style={{ width: "100%", height: "70%" }}
                    onChange={handleDateChange}
                  />
                  {errors.dob && (
                    <p className="text-red-500 text-xs mt-1">{errors.dob}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Password Section */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Security
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <InputField
                    label="Password"
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    required
                    onChange={handleChange}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>
                <div>
                  <InputField
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    placeholder="••••••••"
                    required
                    onChange={handleChange}
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>
            
            </div>

            {/* Article Preferences */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Article Preferences
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Select categories you're interested in:
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                <PreferenceOption
                  id="news"
                  label="News"
                  icon={newsIcon}
                  onChange={handleArticleChange}
                />
                <PreferenceOption
                  id="technology"
                  label="Technology"
                  icon={techIcon}
                  onChange={handleArticleChange}
                />
                <PreferenceOption
                  id="sports"
                  label="Sports"
                  icon={sportsIcon}
                  onChange={handleArticleChange}
                />
                <PreferenceOption
                  id="health"
                  label="Health"
                  icon={healthIcon}
                  onChange={handleArticleChange}
                />
                <PreferenceOption
                  id="finance"
                  label="Finance"
                  icon={financeIcon}
                  onChange={handleArticleChange}
                />
                <PreferenceOption
                  id="entertainment"
                  label="Entertainment"
                  icon={entertainmentIcon}
                  onChange={handleArticleChange}
                />
              </div>
              
            </div>

            {/* Terms and Privacy */}
            <div className="space-y-3">
              <Checkbox
                id="terms"
                label={
                  <span>
                    I agree to the{" "}
                    <a
                      href="#"
                      className="text-indigo-600 hover:text-indigo-500"
                    >
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      href="#"
                      className="text-indigo-600 hover:text-indigo-500"
                    >
                      Privacy Policy
                    </a>
                  </span>
                }
              />
            </div>

            <Button type="submit" variant="primary" disabled={isLoading} isLoading={isLoading}>
              
            {isLoading ? "Loading.." : "Create Account"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/sign-in">
              <a className="font-medium text-indigo-600 hover:text-indigo-500">
                Sign in
              </a>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
