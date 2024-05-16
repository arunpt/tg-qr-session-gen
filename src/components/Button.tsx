import { CgSpinner } from 'react-icons/cg'
import { twMerge } from 'tailwind-merge'
import { ButtonProps } from '../utils/types'


const Button = ({ isLoading = false, buttonType, onTap = () => { }, className, buttonText, disabled = false }: ButtonProps) => {
  return (
    <button
      type={buttonType as "button" | "submit" | "reset" | undefined}
      disabled={disabled}
      onClick={onTap}
      className={twMerge(
        "flex w-full items-center justify-center outline-none whitespace-nowrap rounded-md bg-black hover:opacity-85 px-4 py-2 text-sm font-medium text-white duration-300 disabled:cursor-not-allowed disabled:opacity-75",
        className
      )}
    >
      {isLoading ? <CgSpinner className="animate-spin w-6 h-6" /> : buttonText}
    </button>
  )
}


export default Button
