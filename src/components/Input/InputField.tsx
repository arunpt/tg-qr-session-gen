import React, { useState } from 'react';
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';
import { twMerge } from 'tailwind-merge';


const InputField = React.forwardRef<HTMLInputElement, {
  placeholder?: string;
  label?: string;
  errorMessage?: string;
  className?: string;
  enableShowPassword?: boolean;
  type?: string;
}>(({ placeholder, label, errorMessage, className, enableShowPassword = false, type, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div>
      {!!label && <label className="text-sm font-medium leading-none">{label}</label>}
      <div className="w-full relative">
        <input
          placeholder={placeholder}
          {...props}
          ref={ref}
          type={showPassword ? "text" : type}
          className={twMerge(
            "w-full rounded-md border px-3 py-3 text-sm outline-none",
            errorMessage && "border-red-500",
            className
          )}
        />
        {!!enableShowPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -my-2 bg-transparent border-none cursor-pointer text-gray-500"
          >
            {showPassword ? <IoIosEye /> : <IoIosEyeOff />}
          </button>
        )}
      </div>
      {!!errorMessage && <p className="text-red-500 ml-1 text-xs">{errorMessage}</p>}
    </div>
  );
});

export default InputField