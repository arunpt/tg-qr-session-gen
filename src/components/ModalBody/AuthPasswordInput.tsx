import { useEffect, useState } from "react";
import { PasswordInputProps } from "../../utils/types";
import { useForm } from "react-hook-form";
import { ModalBody, ModalFooter, ModalHeader, Input, Button } from "@nextui-org/react";

type PassInput = {
  password: string;
};

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
    <>
      <ModalHeader className="font-bold text-xl">Enter your password</ModalHeader>
      <ModalBody>
        <p className="text-sm mb-2">Your account is protected with an additional password</p>
        <form onSubmit={handleSubmit(submitPin)} id="hook-form">
          <Input
            placeholder={passwordHint}
            errorMessage={errors.password?.message || passwordError}
            isInvalid={!!errors.password}
            {...register("password", {
              required: {
                value: true,
                message: "password is required",
              },
            })}
            variant="bordered"
            size="lg"
            radius="sm"
          />
        </form>
      </ModalBody>
      <ModalFooter>
        <Button
          fullWidth
          variant="flat"
          form="hook-form"
          type="submit"
          isLoading={isLoading}
          isDisabled={!isValid || isLoading}
          color="primary"
        >
          Submit
        </Button>
      </ModalFooter>
    </>
  );
};

export default AuthPasswordInput;
