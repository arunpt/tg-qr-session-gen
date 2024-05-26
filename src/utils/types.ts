import { Dispatch, SetStateAction } from "react";

export type FormData = {
  library: string;
  apiId: number;
  apiHash: string;
};

export type ModalProps = {
  showModal: boolean;
  onQuitButtonPress: () => void;
  children: React.ReactNode;
};

export type PasswordInputProps = {
  passwordHint: string;
  passwordError: string;
  onPinSubmit: (pin: string) => void;
};

export type FormProps = {
  onFormSubmit: (data: FormData, setIsLoading: Dispatch<SetStateAction<boolean>>) => void;
};

export type SessionOutputProps = {
  sessionString: string;
  userInfo?: string;
};
