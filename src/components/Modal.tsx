import { Description, Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import { CgCloseO } from "react-icons/cg";
import { ModalProps } from "../utils/types";


const Modal = ({ showModal = false, onQuitButtonPress = () => { }, children }: ModalProps) => {
  return (
    <div>
      <Transition show={showModal}>
        <Dialog open={showModal} onClose={() => { }} className="relative z-50">
          <TransitionChild
            enter="duration-300 ease-out"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="duration-200 ease-in"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 transition-colors">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
          </TransitionChild>

          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <TransitionChild
                enter="duration-300 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-200 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full pt-7 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-sm md:max-w-sm">
                  <div className="absolute top-2 right-2 p-2">
                    <button
                      onClick={onQuitButtonPress}
                      className="text-gray-500 rounded-full outline-none group duration-300"
                    >
                      <CgCloseO className="h-6 w-6 group-hover:text-red-500" />
                    </button>
                  </div>
                  <Description as="div">
                    <div>{children}</div>
                  </Description>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}

export default Modal