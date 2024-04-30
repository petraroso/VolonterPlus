import { useState } from "react";
import "./Modal.css";

export default function Modal() {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <>
      <button onClick={toggleModal} className="btn-modal">
        Otvori
      </button>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h3>Hello modal</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Quisquam, natus deleniti perspiciatis rerum itaque at fugiat culpa
              unde fuga reiciendis fugit iure cumque, id qui voluptas mollitia
              sint! Fugit consequatur quas eos dolor ducimus tempore ut deleniti
              iure molestiae ipsa, corporis accusantium suscipit sed, cumque
              autem aspernatur debitis recusandae provident?
            </p>
            <button onClick={toggleModal} className="close-modal">
              Zatvori
            </button>
          </div>
        </div>
      )}
    </>
  );
}
