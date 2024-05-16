import { TelegramClient, Api } from "telegram";
import { LogLevel } from "telegram/extensions/Logger";
import { StringSession } from "telegram/sessions";

export class Telegram {
  apiId: number;
  apiHash: string;
  client: TelegramClient;

  constructor(apiId: number, apiHash: string) {
    this.apiId = apiId;
    this.apiHash = apiHash;
    this.client = new TelegramClient(new StringSession(""), Number(apiId), apiHash, {
      timeout: 5,
      deviceModel: "QR Web Session Gen",
      requestRetries: 2,
    });
    this.client.setLogLevel(LogLevel.NONE);
  }

  connect = async (): Promise<TelegramClient> => {
    if (this.client.connected) await this.client.disconnect();
    await this.client.connect();
    return this.client;
  };

  loginWithQr = async ({
    onQrGen,
    onAuthError,
    onPassword,
  }: {
    onQrGen: (code: string) => void;
    onAuthError: (error: string) => void;
    onPassword: (hint?: string) => Promise<string>;
  }): Promise<Api.TypeUser> => {
    let passwordAttempts = 0;
    const user: Api.TypeUser = await this.client.signInUserWithQrCode(
      { apiId: this.apiId, apiHash: this.apiHash },
      {
        onError: async (err) => {
          passwordAttempts++;
          if (/PASSWORD_HASH_INVALID/.test(err.message)) {
            onAuthError(`wrong password: attempt ${passwordAttempts}`);
            return false;
          } else {
            onAuthError(err.message);
            return true;
          }
        },
        qrCode: async (code) => {
          const bs4Token = btoa(String.fromCharCode(...code.token))
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
            .replace(/=+$/, "");
          onQrGen(bs4Token);
        },
        password: async (hint): Promise<string> => onPassword(hint),
      }
    );
    return user;
  };

  get dcIps(): { [key: number]: string } {
    return { 1: "149.154.175.50", 2: "149.154.167.51", 3: "149.154.175.100", 4: "149.154.167.91", 5: "149.154.171.5" };
  }
}
