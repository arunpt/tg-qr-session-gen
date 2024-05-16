import { forwardRef, ForwardRefRenderFunction, SelectHTMLAttributes } from "react";

interface Option {
  value: string;
  key: string;
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options?: Option[];
}

const SelectField: ForwardRefRenderFunction<HTMLSelectElement, SelectFieldProps> = ({ label, options, ...props }, ref) => {
  return (
    <div className="space-y-3">
      {label && <label className="text-sm font-medium leading-none">{label}</label>}
      <select ref={ref} {...props} className="w-full rounded-md px-2 py-2 border text-gray-500 outline-none bg-white">
        {options?.map((option) => {
          return (
            <option value={option.value} key={option.value}>
              {option.key}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default forwardRef(SelectField);