import { useState } from "react";
import Modal from "../Modal/Modal";
import VolunteerDetails from "../VolunteerDetails";
import VolunteerDetailsEdit from "../Forms/VolunteerDetailsEdit";
import { useAdminContext } from "../../AdminContext";
import axios from "axios";
import styles from "./style.module.css"

interface Volunteer {
  id: number;
  name: string;
  surname: string;
  contact: string;
  city: string;
  image: string;
  activities: string[];
  description: string;
}
interface City {
  id: Number;
  name: string;
}

interface VolunteerCardProps {
  volunteer: Volunteer;
  setUpdateVolunteers: React.Dispatch<React.SetStateAction<boolean>>;
  cities: City[];
}
export default function VolunteerCard({
  volunteer,
  setUpdateVolunteers,
  cities,
}: VolunteerCardProps) {
  const adminData = useAdminContext();
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(false);
  const [showUserMessage, setShowUserMessage] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
    if (modal === true && editing === true) setEditing(false);
  };
  function toggleEdit() {
    setEditing(!editing);
  }
  function toggleEditAndModal() {
    setEditing(!editing);
    setModal(!modal);
  }

  const handleDeleteVolunteer = () => {
    if (window.confirm("Jeste li sigurni da želite izbrisati volontera?")) {
      axios
        .delete(
          `https://json-server-volonterplus.onrender.com/signedVolunteers/${volunteer.id}`
        )
        .then((rez) => {
          console.log(rez);
          setUpdateVolunteers((prev) => !prev);
        });
    }
  };

  const handleUserMessage = () => {
    setShowUserMessage(false);
    setModal(!modal);
  };

  return (
    <>
      {modal && showUserMessage ? (
        <Modal modal={modal} toggleModal={handleUserMessage}>
          <div className="user-message-modal">
            <h3>Volonter spremljen!</h3>
          </div>
        </Modal>
      ) : (
        modal && (
          <Modal modal={modal} toggleModal={toggleModal}>
            {adminData.admin && editing ? (
              <VolunteerDetailsEdit
                volunteer={volunteer}
                toggleEdit={toggleEdit}
                setUpdateVolunteers={setUpdateVolunteers}
                cities={cities}
                setShowUserMessage={setShowUserMessage}
              />
            ) : (
              <VolunteerDetails volunteer={volunteer} toggleEdit={toggleEdit} />
            )}
          </Modal>
        )
      )}
      <div className={styles.volunteerCard}>
        <img
          onClick={toggleModal}
          src={volunteer.image}
          alt="Volunteer avatar"
          className={styles.volunteerImage}
        />
        <h3 onClick={toggleModal}>
          {volunteer.name}&nbsp;
          {volunteer.surname}
        </h3>

        <p onClick={toggleModal}>
          <i className="bx bx-location-plus"></i>
          {volunteer.city}
        </p>
        {adminData.admin && (
          <div className={`${styles.adminButtons} admin-buttons`}>
            <button className="edit-button" onClick={toggleEditAndModal}>
              <i className="bx bx-edit-alt"></i>
            </button>
            <button onClick={handleDeleteVolunteer} className="delete-button">
              <i className="bx bx-trash"></i>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
