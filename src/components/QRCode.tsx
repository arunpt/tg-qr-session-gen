import QRCodeStyling from "qr-code-styling";
import { useEffect, useMemo, useRef, useState } from "react";
import TelegramLogo from "../assets/telegram_logo.svg";


type QrCodeProps = {
  data: string
}

const QRCode = ({ data }: QrCodeProps) => {
  const QrCode = useMemo(() => {
    return new QRCodeStyling({
      width: 280,
      height: 280,
      image: TelegramLogo,
      margin: 10,
      type: "svg",
      dotsOptions: {
        type: "rounded",
      },
      cornersSquareOptions: {
        type: "extra-rounded",
      },
      imageOptions: {
        imageSize: 0.4,
        margin: 8,
      },
      qrOptions: {
        errorCorrectionLevel: "M",
      },
    });
  }, []);
  const [isQrMounted, setisQrMounted] = useState(false);
  const qrCodeRef = useRef(null);

  useEffect(() => {
    if (!qrCodeRef.current) return;
    if (!isQrMounted) {
      QrCode.append(qrCodeRef.current);
      setisQrMounted(true);
    }
    QrCode.update({ data: data });
  }, [QrCode, qrCodeRef, data, isQrMounted]);

  return <div ref={qrCodeRef} />;
}

export default QRCode