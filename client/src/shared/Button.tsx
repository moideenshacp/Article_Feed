interface ButtonProps {
    children: string;
    type: "button" | "submit" | "reset";
    fullWidth?: boolean;
    variant: "primary" | "secondary" | "outline";
    disabled?: boolean;
    isLoading?: boolean;
  }
  
  const Button: React.FC<ButtonProps> = ({
    type = "button",
    fullWidth = true,
    children,
    disabled = false,
    isLoading = false,
    variant = "primary",
  }) => {
    const baseClasses =
      "px-6 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
    const variantClasses = {
      primary:
        "bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500",
      secondary:
        "bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500",
      outline:
        "bg-transparent border border-indigo-600 text-indigo-600 hover:bg-indigo-50 focus:ring-indigo-500",
    };
  
    return (
      <button
        type={type}
        disabled={disabled || isLoading}
        className={`${baseClasses} ${
          isLoading
            ? "bg-gray-400 cursor-not-allowed"
            : variantClasses[variant]
        } ${fullWidth ? "w-full" : ""}`}
      >
        {isLoading ? "Loading..." : children}
      </button>
    );
  };
  
  export default Button;
  