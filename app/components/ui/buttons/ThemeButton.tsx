import React from "react";

type buttonType = "button" | "submit" | "reset";
type buttonSize = "small" | "medium" | "large";
type iconDirection = "end" | "start";
export type buttonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "success"
  | "primaryOutline"
  | "yellow"
  | "danger"
  | "dangerOutline";
interface ThemeButtonProps {
  label: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  type?: buttonType;
  size?: buttonSize;
  variant?: buttonVariant;
  minWidthClass?: string;
  iconDirection?: iconDirection;
}

const ThemeButton: React.FC<ThemeButtonProps> = ({
  label,
  onClick,
  icon,
  disabled,
  type = "button",
  size = "medium",
  variant = "primary",
  minWidthClass,
  iconDirection = "start",
}) => {
  const sizeClasses: Record<buttonSize, string> = {
    small: "px-3 py-1 text-sm ",
    medium: "md:px-5 p-2 md:p-2  text-base ",
    large: "px-6 py-2.5 text-base",
  };

  const baseClasses =
    "flex items-center group gap-1 xl:gap-2 whitespace-nowrap h-full justify-center w-full cursor-pointer font-semibold rounded-lg disabled:cursor-not-allowed";

  const variantClasses: Record<buttonVariant, string> = {
    primary: disabled
      ? "bg-gray-200 text-gray-400"
      : "bg-primary-green text-white hover:bg-primary-green-dark",
    secondary: "bg-primary-blue text-white hover:bg-primary-blue-dark",
    outline:
      "bg-white  text-gray-700 group-hover:!bg-gray-100 disabled:bg-gray-200 border border-gray-200 hover:bg-slate-50 disabled:text-gray-400 disabled:border-gray-200",
    success: "text-green-600 bg-green-50 group-hover:bg-green-200",
    primaryOutline:
      "text-primary-blue border border-primary-blue bg-white hover:bg-primary-blue hover:text-white group-hover:border-primary",
    danger:
      "text-white bg-red-500 border border-red-500 group-hover:bg-red-700 group-hover:border-red-700",
    yellow:
      "text-white bg-warning-500 border border-warning-500 group-hover:bg-warning-700 group-hover:border-warning-700",
    dangerOutline:
      "bg-white text-red-500 border border-red-500 hover:bg-red-700 hover:text-white group-hover:border-red-700",
  };

  const directionClasses =
    iconDirection === "start" ? "flex-row" : "flex-row-reverse";

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={`${baseClasses} ${directionClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${minWidthClass}`}
    >
      {icon && <span className="flex items-center ">{icon}</span>} {label}
    </button>
  );
};

export default ThemeButton;
