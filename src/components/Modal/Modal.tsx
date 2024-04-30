import "./Modal.css";

export default function Modal({
  toggleModal,
  children,
}: {
  toggleModal: () => void;
  children?: React.ReactNode;
}) {
  return (
    <>
      <div className="modal">
        <div onClick={toggleModal} className="overlay"></div>
        <div className="modal-content">
          {children}
          <button onClick={toggleModal} className="close-modal">
            <i className="bx bx-x"></i>
          </button>
        </div>
      </div>
    </>
  );
}
