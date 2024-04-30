import "./Modal.css";

export default function Modal({
  modal,
  toggleModal,
  children,
}: {
  modal: boolean;
  toggleModal: () => void;
  children?: React.ReactNode;
}) {
  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }
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
