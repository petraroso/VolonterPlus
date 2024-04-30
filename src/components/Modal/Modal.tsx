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
          <h3>Hello modal</h3>
          {children}
          <button onClick={toggleModal} className="close-modal">
            Zatvori
          </button>
        </div>
      </div>
    </>
  );
}
