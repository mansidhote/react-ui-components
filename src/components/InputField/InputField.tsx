import React, { useState } from "react";
import { Eye, EyeOff, X, Loader2 } from "lucide-react";

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  loading?: boolean;
  type?: string;
  variant?: "filled" | "outlined" | "ghost";
  size?: "sm" | "md" | "lg";
  clearable?: boolean;
  passwordToggle?: boolean;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  value = "",
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  loading = false,
  type = "text",
  variant = "outlined",
  size = "md",
  clearable = false,
  passwordToggle = false,
  className = "",
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const sizeClasses = {
    sm: "px-2 py-1 text-sm rounded-md",
    md: "px-3 py-2 text-base rounded-lg",
    lg: "px-4 py-3 text-lg rounded-xl",
  };
  const variantClasses = {
    outlined:
      "border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900",
    filled:
      "bg-gray-100 dark:bg-zinc-700 dark:border-gray-600 dark:text-gray-100 border border-transparent focus:ring-2 focus:ring-blue-500",
    ghost:
      "border-b border-gray-300 dark:border-gray-600 bg-transparent focus:ring-0 focus:border-blue-500",
  };

  const stateClasses = invalid
    ? "border-red-500 focus:ring-red-500"
    : disabled
    ? "bg-gray-100 dark:bg-gray-100 cursor-not-allowed opacity-70"
    : "";

  return (
    <div className={`flex flex-col space-y-2 mb-6 w-full ${className}`}>
      {label && (
        <label className="font-medium text-gray-700 dark:text-gray-200">
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        <input
          type={passwordToggle ? (showPassword ? "text" : "password") : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full transition shadow-sm focus:outline-none 
            ${sizeClasses[size]} ${variantClasses[variant]} ${stateClasses}`}
        />

        {/* Clear button */}
        {clearable && value && !disabled && (
          <button
            type="button"
            onClick={() =>
              onChange?.({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>)
            }
            className="absolute right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X size={16} />
          </button>
        )}

        {/* Password toggle */}
        {passwordToggle && type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}

        {/* Loading spinner */}
        {loading && (
          <Loader2 className="absolute right-3 animate-spin text-gray-400" size={18} />
        )}
      </div>

      {/* Helper or error text */}
      {helperText && !invalid && (
        <span className="text-gray-500 text-sm">{helperText}</span>
      )}
      {invalid && errorMessage && (
        <span className="text-red-500 text-sm">{errorMessage}</span>
      )}
    </div>
  );
};

export default InputField;
