import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FormData, FormProps } from "../utils/types";
import Button from "./Button";
import InputField from "./Input/InputField";
import SelectField from "./Input/SelectField";


const Form: React.FC<FormProps> = ({ onFormSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ mode: "all" });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data: FormData) => onFormSubmit(data, setIsLoading);

  return (
    <div className="flex w-full justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-96 space-y-3">
        <div>
          <SelectField
            {...register("library", { required: true })}
            label="Library"
            options={[
              { key: "Pyrogram", value: "pyrogram" },
              { key: "Telethon", value: "telethon" },
              { key: "GramJS", value: "gramjs" },
            ]}
          />
        </div>
        <div>
          <InputField
            label="API ID"
            placeholder="12345"
            {...register("apiId", {
              required: {
                value: true,
                message: "api id required",
              },
              pattern: {
                value: /^\d+$/,
                message: "api id should be an integer",
              },
              minLength: {
                value: 4,
                message: "API id should contain at least 4 numbers",
              },
            })}
            type="text"
            errorMessage={errors.apiId?.message}
          />
        </div>
        <div>
          <InputField
            label="API HASH"
            placeholder="0123456789abcdef0123456789abcdef"
            {...register("apiHash", {
              required: {
                value: true,
                message: "api hash is required",
              },
              minLength: {
                value: 32,
                message: "32 characters expected, seems like you are missing something.",
              },
              maxLength: {
                value: 32,
                message: "Only 32 characters required, are you gonna write a paragraph?",
              },
            })}
            type="text"
            errorMessage={errors.apiHash?.message}
          />
        </div>
        <div className="pt-4">
          <Button
            buttonType="submit"
            buttonText="Generate QR"
            className="py-3"
            isLoading={isLoading}
            disabled={!isValid || isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default Form;