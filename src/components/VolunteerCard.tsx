import { useState } from "react";
import Modal from "./Modal/Modal";
import VolunteerDetails from "./VolunteerDetails";
import VolunteerDetailsEdit from "./VolunteerDetailsEdit";
import { useAdminContext } from "../AdminContext";
import axios from "axios";

interface Volunteer {
  id: number;
  name: string;
  surname: string;
  contact: string;
  city: string;
  image: string;
  activities: string[];
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

  const toggleModal = () => {
    setModal(!modal);
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
        .delete(`http://localhost:3001/signedVolunteers/${volunteer.id}`)
        .then((rez) => {
          console.log(rez);
          setUpdateVolunteers((prev) => !prev);
        });
    }
  };

  return (
    <>
      {modal && (
        <Modal modal={modal} toggleModal={toggleModal}>
          {adminData.admin && editing ? (
            <VolunteerDetailsEdit
              volunteer={volunteer}
              toggleEdit={toggleEdit}
              setUpdateVolunteers={setUpdateVolunteers}
              cities={cities}
            />
          ) : (
            <VolunteerDetails volunteer={volunteer} toggleEdit={toggleEdit} />
          )}
        </Modal>
      )}
      <div className="volunteer-card">
        <img
          onClick={toggleModal}
          src={volunteer.image}
          alt="Volunteer avatar"
          className="volunteer-image"
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
          <div className="admin-buttons">
            <button onClick={handleDeleteVolunteer} className="admin-delete">
              <i className="bx bx-trash"></i>
            </button>
            <button onClick={toggleEditAndModal}>
              <i className="bx bx-edit-alt"></i>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
