import Modal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
    maxHeight: "90vh", // Set your desired max height here
    overflowY: "auto",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 60,
  },
};

Modal.setAppElement("#modal");

const ModalComponent = ({ isOpen, closeModal, children }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
      <span className="absolute top-2 right-2" onClick={closeModal}>
        <AiOutlineClose className="font-bold text-xl" />
      </span>
      <div className="mt-2">{children}</div>
    </Modal>
  );
};

export default ModalComponent;
