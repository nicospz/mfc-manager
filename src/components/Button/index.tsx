import React from "react";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button
      {...props}
      className="flex items-center h-10 gap-2 px-3 transition-colors rounded-lg bg-slate-50 disabled:bg-slate-400 hover:bg-slate-200"
    />
  );
};

export default Button;
