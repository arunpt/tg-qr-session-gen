import toast from "react-hot-toast";
import { useCopyToClipboard } from "usehooks-ts";
import { SessionOutputProps } from "../../utils/types";
import { ModalHeader, ModalBody, ModalFooter, Textarea, Button } from "@nextui-org/react";
import { IoCopyOutline } from "react-icons/io5";

const OutputSessionString = ({ sessionString, userInfo }: SessionOutputProps) => {
  const [, copyToClipboard] = useCopyToClipboard();

  const handleCopy = (text: string) => {
    copyToClipboard(text);
    toast.success("Copied to clipboard");
  };

  return (
    <>
      <ModalHeader className="text-xl font-bold">Session String Successfully Generated</ModalHeader>
      <ModalBody>
        <div className="space-y-3 m-2">
          <div className="space-y-1">
            <p className="text-xl font-bold"></p>
            <p className="text-gray-500 font-semibold text-sm">Username: {userInfo || "n/a"}</p>
          </div>
          <Textarea
            size="lg"
            fullWidth
            isReadOnly
            variant="flat"
            placeholder="Enter your description"
            minRows={10}
            defaultValue={sessionString}
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          fullWidth
          onClick={() => handleCopy(sessionString)}
          variant="shadow"
          color="success"
          startContent={<IoCopyOutline />}
        >
          Copy
        </Button>
      </ModalFooter>
    </>
  );
};

export default OutputSessionString;
