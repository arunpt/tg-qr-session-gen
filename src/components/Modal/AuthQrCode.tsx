import QRCode from '../QRCode'

const AuthQrCode = ({ qrCodeAuthUrl }: { qrCodeAuthUrl: string }) => {
  return (
    <div className="flex flex-col items-center justify-center m-8">
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
  )
}

export default AuthQrCode