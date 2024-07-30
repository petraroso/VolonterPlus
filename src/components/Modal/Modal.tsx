import "./Modal.css";
import { useEffect } from "react";

export default function Modal({
  modal,
  toggleModal,
  children,
}: {
  modal: boolean;
  toggleModal: () => void;
  children?: React.ReactNode;
}) {
  useEffect(() => {
    if (modal) {
      document.body.classList.add("active-modal");
    }
    return () => {
      document.body.classList.remove("active-modal");
    };
  }, [modal]);

  return (
    <>
      <div className="modal">
        <div onClick={toggleModal} className="overlay"></div>
        <div className="modal-content">
          {children}
          <button onClick={toggleModal} className="close-modal close-button">
            <i className="bx bx-x"></i>
          </button>
        </div>
      </div>
    </>
  );
}
