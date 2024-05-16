import { useEffect, useState } from 'react'

import Button from '../Button'
import InputField from '../Input/InputField'
import { PasswordInputProps } from '../../utils/types'
import { useForm } from "react-hook-form";

type PassInput = {
  password: string
}

const AuthPasswordInput = ({ onPinSubmit, passwordError, passwordHint }: PasswordInputProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<PassInput>({ mode: "all" });

  const submitPin = (data: PassInput) => {
    setIsLoading(true);
    onPinSubmit(data.password);
  };

  useEffect(() => {
    setIsLoading(false);
  }, [passwordError]);

  return (
    <div className="mx-3 my-5">
      <div className="flex flex-col justify-center items-center mb-10 mt-3 gap-3">
        <p className="font-bold text-xl">Enter your password</p>
        <p className="text-sm">Your account is protected with an additional password</p>
      </div>
      <form onSubmit={handleSubmit(submitPin)}>
        <InputField
          placeholder={passwordHint}
          errorMessage={errors.password?.message || passwordError}
          enableShowPassword
          type="password"
          {...register("password", {
            required: {
              value: true,
              message: "password is required",
            }
          })}
        />
        <div className="mt-5">
          <Button
            buttonText="Submit"
            isLoading={isLoading}
            disabled={!isValid || isLoading}
            buttonType='submit'
          />
        </div>
      </form>
    </div>
  );
}

export default AuthPasswordInput