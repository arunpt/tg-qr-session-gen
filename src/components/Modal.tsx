import { ModalProps } from "../utils/types";
import { Modal, ModalContent } from "@nextui-org/react";

const MainModal = ({ showModal = false, onQuitButtonPress = () => {}, children }: ModalProps) => {
  return (
    <div>
      <Modal isOpen={showModal} isDismissable={false} isKeyboardDismissDisabled={true} onOpenChange={onQuitButtonPress}>
        <ModalContent>{children}</ModalContent>
      </Modal>
    </div>
  );
};

export default MainModal;
