import "./PlusButton.css";

export default function PlusButton({ openModal }: { openModal: () => void }) {
  return (
    <>
      <div className="add-button">
        <button onClick={openModal} className="open-modal">
          <i className="bx bx-plus-medical"></i>
        </button>
      </div>
    </>
  );
}
