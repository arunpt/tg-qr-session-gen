import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { FormData, FormProps } from "../utils/types";
import { Select, SelectItem, Input, Button } from "@nextui-org/react";

const Form: React.FC<FormProps> = ({ onFormSubmit }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<FormData>({ mode: "all" });

  const libs = [
    { key: "Pyrogram", value: "pyrogram" },
    { key: "Telethon", value: "telethon" },
    { key: "GramJS", value: "gramjs" },
  ];

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data: FormData) => onFormSubmit(data, setIsLoading);

  return (
    <div className="mx-5 md:flex md:justify-center">
      <form className="md:w-1/4" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <Controller
            rules={{
              required: { value: true, message: "Library is required" },
            }}
            control={control}
            name="library"
            render={({ field }) => (
              <Select
                fullWidth
                isRequired
                label="Library"
                placeholder="Select a library"
                variant="bordered"
                size="lg"
                labelPlacement="outside"
                radius="sm"
                classNames={{
                  label: "font-medium",
                }}
                {...field}
                isInvalid={!!errors.library}
                errorMessage={errors.library?.message}
                onChange={(value) => field.onChange(value)}
              >
                {libs.map((lib) => (
                  <SelectItem key={lib.value} value={lib.value}>
                    {lib.key}
                  </SelectItem>
                ))}
              </Select>
            )}
          ></Controller>
          <Input
            fullWidth
            isRequired
            placeholder="12345"
            label="API ID"
            variant="bordered"
            size="lg"
            labelPlacement="outside"
            radius="sm"
            classNames={{
              label: "font-medium",
            }}
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
            errorMessage={errors.apiId?.message}
            isInvalid={!!errors.apiId}
          />
          <Input
            fullWidth
            isRequired
            placeholder="0123456789abcdef0123456789abcdef"
            label="API HASH"
            variant="bordered"
            size="lg"
            labelPlacement="outside"
            radius="sm"
            classNames={{
              label: "font-medium",
            }}
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
            errorMessage={errors.apiHash?.message}
            isInvalid={!!errors.apiHash}
          />
        </div>
        <div className="pt-6">
          <Button
            className="font-semibold"
            variant="shadow"
            color="primary"
            fullWidth
            size="lg"
            type="submit"
            isDisabled={!isValid || isLoading}
            isLoading={isLoading}
          >
            Generate QR
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Form;
