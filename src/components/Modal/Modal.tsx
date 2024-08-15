import styles from "./style.module.css";
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
      <div className={styles.modal}>
        <div onClick={toggleModal} className={styles.overlay}></div>
        <div className={styles.modalContent}>
          {children}
          <button
            onClick={toggleModal}
            className={`${styles.closeModal} close-button`}
          >
            <i className="bx bx-x"></i>
          </button>
        </div>
      </div>
    </>
  );
}
