import styles from "./style.module.css";

export default function PlusButton({ openModal }: { openModal: () => void }) {
  return (
    <>
      <div className={styles.addButton}>
        <button onClick={openModal} className={styles.openModal}>
          <i className="bx bx-plus-medical"></i>
        </button>
      </div>
    </>
  );
}
