import axios from "axios";
import { useState, useEffect } from "react";
import { useAdminContext } from "../AdminContext";

import VolunteerCard from "../components/VolunteerCard";
import PlusButton from "../components/PlusButton/PlusButton";
import Modal from "../components/Modal/Modal";
import NewVolunteerForm from "../components/Forms/NewVolunteerForm";
import VolunteersFilter from "../components/VolunteersFilter";

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
  const [updateVolunteers, setUpdateVolunteers] = useState(false);
  const [cityFilter, setCityFilter] = useState("Svi");
  const [activityFilter, setActivityFilter] = useState("Sve");

  useEffect(() => {
    axios
      .get("http://localhost:3001/signedVolunteers")
      .then((res) => {
        setVolunteers(sortVolunteersAscending(res.data));
      })
      .catch((err) => console.log(err.message));
    axios
      .get("http://localhost:3001/cities")
      .then((res) => {
        setCities(sortCitiesAscending(res.data));
      })
      .catch((err) => console.log(err.message));
  }, [updateVolunteers]);

  const toggleOpenNewVolunteerForm = () => {
    setOpenNewVolunteerForm(!openNewVolunteerForm);
  };

  function sortVolunteersAscending(volunteers: Volunteer[]): Volunteer[] {
    return volunteers.slice().sort((a, b) => {
      const lastNameA = a.surname.toLowerCase();
      const lastNameB = b.surname.toLowerCase();
      if (lastNameA < lastNameB) return -1;
      if (lastNameA > lastNameB) return 1;
      return 0;
    });
  }

  function sortCitiesAscending(cities: City[]): City[] {
    return cities.slice().sort((a, b) => {
      const cityA = a.name.toLowerCase();
      const cityB = b.name.toLowerCase();
      if (cityA < cityB) return -1;
      if (cityA > cityB) return 1;
      return 0;
    });
  }

  return (
    <div className="page-container">
      <h2>Popis volontera</h2>
      <div className="volunteers-layout">
        <div>
          <VolunteersFilter
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
      {adminData.admin && <PlusButton openModal={toggleOpenNewVolunteerForm} />}

      {openNewVolunteerForm && (
        <Modal
          modal={openNewVolunteerForm}
          toggleModal={toggleOpenNewVolunteerForm}
        >
          <NewVolunteerForm
            setUpdateVolunteers={setUpdateVolunteers}
            cities={cities}
          />
        </Modal>
      )}
    </div>
  );
}
