import toast from 'react-hot-toast'
import { useCopyToClipboard } from 'usehooks-ts'
import { SessionOutputProps } from '../../utils/types'
import Button from '../Button'


const OutputSessionString = ({ sessionString, userInfo }: SessionOutputProps) => {
  const [, copyToClipboard] = useCopyToClipboard()

  const handleCopy = (text: string) => {
    copyToClipboard(text)
    toast.success("Copied to clipboard")
  }

  return (
    <div className="mt-3 mb-4 space-y-5 mx-5">
      <div className="space-y-1">
        <p className="text-xl font-bold">Session String Successfully Generated</p>
        <p className="text-gray-500 font-semibold text-sm">Username: {userInfo || "n/a"}</p>
      </div>
      <div className="pt-3">
        <div className="break-words">{sessionString}</div>
      </div>
      <div>
        <Button
          buttonText="Copy"
          className="active:translate-y-1 transition-transform active:opacity-95"
          onTap={() => handleCopy(sessionString)}
        />
      </div>
    </div>
  )
}

export default OutputSessionString