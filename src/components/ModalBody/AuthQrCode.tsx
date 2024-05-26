import QRCode from "../QRCode";
import { ModalHeader, ModalBody } from "@nextui-org/react";

const AuthQrCode = ({ qrCodeAuthUrl }: { qrCodeAuthUrl: string }) => {
  return (
    <>
      <ModalHeader className="flex flex-col ">Scan this Qr Code</ModalHeader>
      <ModalBody>
        <div className="flex flex-col items-center justify-center mb-5">
          <QRCode data={qrCodeAuthUrl} />
          <div className="mt-2 flex flex-col items-center">
            <p className="font-bold text-lg">Log in to Telegram by QR Code</p>
            <div className="mt-2">
              <ol className="text-sm list-decimal list-inside text-gray-500">
                <li>Open Telegram on your phone</li>
                <li>
                  Go to Settings {`>`} Devices {`>`} Link Desktop Device
                </li>
                <li>Point your phone at this screen to confirm login</li>
              </ol>
            </div>
          </div>
        </div>
      </ModalBody>
    </>
  );
};

export default AuthQrCode;
