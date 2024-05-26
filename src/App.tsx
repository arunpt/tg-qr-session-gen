import { Dispatch, SetStateAction, useState } from "react";
import Form from "./components/Form";
import Modal from "./components/Modal";
import { FormData } from "./utils/types";
import toast, { Toaster } from "react-hot-toast";
import OutputSessionString from "./components/ModalBody/OutputSessionString";
import { Telegram } from "./utils/telegram";
import AuthQrCode from "./components/ModalBody/AuthQrCode";
import AuthPasswordInput from "./components/ModalBody/AuthPasswordInput";
import { SessionSerializer } from "./utils/serializers";
import { Api } from "telegram";
import { PiTelegramLogoBold } from "react-icons/pi";

const App = () => {
  const [appState, setAppState] = useState({
    showModal: false,
    qrUrl: "",
    resolvePasswordPromise: (_pass: string) => {},
    hasPassword: false,
    passwordHint: "",
    sessionString: "",
    userInfo: "",
  });
  const [passwordError, setPasswordError] = useState("");

  const onQrGenerate = (qrCodeToken: string) => {
    setAppState((prev) => ({ ...prev, qrUrl: `tg://login?token=${qrCodeToken}`, showModal: true }));
  };

  const onQrAuthError = (error: string) => {
    setPasswordError(error);
  };

  const onPasswordPrompt = async (hint?: string): Promise<string> => {
    return new Promise((resolve) => {
      setAppState((prev) => ({
        ...prev,
        passwordHint: hint || "password",
        hasPassword: true,
        resolvePasswordPromise: (pass: string) => resolve(pass),
      }));
    });
  };

  const submitForm = async (creds: FormData, setIsLoading: Dispatch<SetStateAction<boolean>>) => {
    setIsLoading(true);
    const telegram = new Telegram(creds.apiId, creds.apiHash);
    const conn = telegram.connect();
    conn
      .then(async (client) => {
        const user = await telegram.loginWithQr({
          onQrGen: onQrGenerate,
          onAuthError: onQrAuthError,
          onPassword: onPasswordPrompt,
        });
        const { dcId, authKey, port } = client.session;
        const key = authKey?.getKey();
        const ipAddress = telegram.dcIps[dcId];
        if (user instanceof Api.UserEmpty || key == undefined) {
          return toast.error("Something went wrong, try again later");
        }

        const serializer = new SessionSerializer();
        let sessionString: string | null = null;
        switch (creds.library) {
          case "pyrogram":
            console.log("generating pyro string");
            sessionString = serializer.pyrogram(dcId, creds.apiId, key, BigInt(user.id.toString()), false, false);
            break;
          case "telethon":
            console.log("generating telethon string");
            sessionString = serializer.telethon(dcId, ipAddress, port, key);
            break;
          case "gramjs":
            console.log("generating gramjs string");
            sessionString = serializer.gramjs(dcId, ipAddress, port, key);
            break;
          default:
            break;
        }
        setAppState((prev) => ({
          ...prev,
          sessionString: sessionString ?? "",
          userInfo: user?.username ?? "",
        }));
      })
      .catch((err) => {
        toast.error(`Telegram Says: ${err}`);
      })
      .finally(() => setIsLoading(false));

    toast.promise(conn, {
      loading: "Connecting to Telegram servers...",
      success: "Connection successful!",
      error: "Couldn't communicate with Telegram servers.",
    });
  };

  const submitPin = (pin: string) => {
    appState.resolvePasswordPromise(pin);
  };

  return (
    <div className="w-full">
      <div className="mt-16 flex justify-center">
        <div className="mx-8">
          <span className="flex gap-1 text-cyan-500">
            <p className="text-2xl font-black">Telegram</p>
            <PiTelegramLogoBold />
          </span>
          <p className="text-3xl font-black">QR Code Session String Generator</p>
        </div>
      </div>
      <div className="mt-24">
        <Form onFormSubmit={submitForm} />
      </div>
      <Modal
        showModal={appState.showModal}
        onQuitButtonPress={() => setAppState((prev) => ({ ...prev, showModal: false }))}
      >
        {appState.sessionString ? (
          <OutputSessionString sessionString={appState.sessionString} userInfo={appState.userInfo} />
        ) : appState.hasPassword ? (
          <AuthPasswordInput
            onPinSubmit={submitPin}
            passwordHint={appState.passwordHint}
            passwordError={passwordError}
          />
        ) : (
          appState.qrUrl && <AuthQrCode qrCodeAuthUrl={appState.qrUrl} />
        )}
      </Modal>
      <Toaster position="top-right" />
    </div>
  );
};

export default App;
