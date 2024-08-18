import axios from "axios";
import { useState, useEffect } from "react";
import { useAdminContext } from "../AdminContext";

import VolunteerCard from "../components/VolunteerCard/VolunteerCard";
import PlusButton from "../components/PlusButton/PlusButton";
import Modal from "../components/Modal/Modal";
import NewVolunteerForm from "../components/Forms/NewVolunteerForm";
import Filter from "../components/Filter/Filter";
import Loader from "../components/Loader/Loader";

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
  id: number;
  name: string;
}
export default function VolunteersPage() {
  const adminData = useAdminContext();
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [openNewVolunteerForm, setOpenNewVolunteerForm] = useState(false);
  const [showUserMessage, setShowUserMessage] = useState(false);
  const [updateVolunteers, setUpdateVolunteers] = useState(false);
  const [cityFilter, setCityFilter] = useState("Svi");
  const [activityFilter, setActivityFilter] = useState("Sve");

  useEffect(() => {
    axios
      .get("https://json-server-volonterplus.onrender.com/signedVolunteers")
      .then((res) => {
        setVolunteers(sortAscending(res.data, "surname"));
      })
      .catch((err) => console.log(err.message));
    axios
      .get("https://json-server-volonterplus.onrender.com/cities")
      .then((res) => {
        setCities(sortAscending(res.data, "name"));
      })
      .catch((err) => console.log(err.message));
  }, [updateVolunteers]);

  const toggleOpenNewVolunteerForm = () => {
    setOpenNewVolunteerForm(!openNewVolunteerForm);
  };

  function sortAscending<T>(items: T[], key: keyof T): T[] {
    return items.slice().sort((a, b) => {
      const valueA = String(a[key]).toLowerCase();
      const valueB = String(b[key]).toLowerCase();
      if (valueA < valueB) return -1;
      if (valueA > valueB) return 1;
      return 0;
    });
  }

  const handleUserMessage = () => {
    setShowUserMessage(false);
    setOpenNewVolunteerForm(!openNewVolunteerForm);
  };

  return (
    <div className="page-container">
      <h2>Popis volontera</h2>
      {volunteers.length ? (
        <>
          <div className="volunteers-layout">
            <div>
              <Filter
                cities={cities}
                cityFilter={cityFilter}
                setCityFilter={setCityFilter}
                activityFilter={activityFilter}
                setActivityFilter={setActivityFilter}
              />
            </div>
            <div className="volunteer-list">
              {volunteers.map((volunteer) =>
                (cityFilter === "Svi" && activityFilter === "Sve") ||
                (activityFilter === "Sve" && cityFilter === volunteer.city) ||
                (cityFilter === "Svi" &&
                  volunteer.activities.includes(activityFilter)) ||
                (cityFilter === volunteer.city &&
                  volunteer.activities.includes(activityFilter)) ? (
                  <VolunteerCard
                    key={volunteer.id}
                    volunteer={volunteer}
                    setUpdateVolunteers={setUpdateVolunteers}
                    cities={cities}
                  />
                ) : (
                  <></>
                )
              )}
            </div>
          </div>
          {adminData.admin && (
            <PlusButton openModal={toggleOpenNewVolunteerForm} />
          )}

          {openNewVolunteerForm && showUserMessage ? (
            <Modal modal={openNewVolunteerForm} toggleModal={handleUserMessage}>
              <div className="user-message-modal">
                <h3>Novi volonter dodan!</h3>
              </div>
            </Modal>
          ) : (
            openNewVolunteerForm && (
              <Modal
                modal={openNewVolunteerForm}
                toggleModal={toggleOpenNewVolunteerForm}
              >
                <NewVolunteerForm
                  setUpdateVolunteers={setUpdateVolunteers}
                  cities={cities}
                  setShowUserMessage={setShowUserMessage}
                />
              </Modal>
            )
          )}
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}
