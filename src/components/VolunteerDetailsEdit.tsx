//import { useAdminContext } from "../AdminContext";
import { useState, useEffect } from "react";
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
  toggleEdit: () => void;
  setUpdateVolunteers: React.Dispatch<React.SetStateAction<boolean>>;
  cities: City[];
}

export default function VolunteerDetailsEdit({
  volunteer,
  toggleEdit,
  setUpdateVolunteers,
  cities,
}: VolunteerCardProps) {
  //const adminData = useAdminContext();
  const [newData, setNewData] = useState<Volunteer>({
    id: 0,
    name: "",
    surname: "",
    contact: "",
    city: "",
    image: "",
    activities: [],
  });
  const [displayEmail, setDisplayEmail] = useState("");
  const [displayContactError, setDisplayContactError] = useState(false);

  useEffect(() => {
    setNewData(volunteer);
    setDisplayEmail(volunteer.contact);
  }, []);

  const handleFormData = (
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value, type } = event.target;

    if (type === "checkbox") {
      let updatedActivities = [...newData.activities];
      if ((event.target as HTMLInputElement).checked) {
        updatedActivities.push(value);
      } else {
        updatedActivities = updatedActivities.filter(
          (activity) => activity !== value
        );
      }
      setNewData({ ...newData, activities: updatedActivities });
    } else {
      if (name === "contact") {
        setDisplayEmail(value);
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        if (isValidEmail) {
          setNewData({ ...newData, [name]: value });
          setDisplayContactError(false);
        } else {
          setNewData({ ...newData, [name]: "" });
          setDisplayContactError(true);
        }
      } else {
        setNewData({ ...newData, [name]: value });
      }
    }
  };

  const sendData = () => {
    if (
      newData.name === "" ||
      newData.surname === "" ||
      newData.contact === "" ||
      newData.city === "" ||
      newData.image === ""
    ) {
      window.alert("Unesite sve podatke.");
    } else {
      axios
        .patch(`http://localhost:3001/signedVolunteers/${newData.id}`, newData)
        .then((result) => {
          console.log(result);
          toggleEdit();
          setUpdateVolunteers((prev) => !prev);
        })
        .catch((err) => console.log(err.message));
    }
  };

  return (
    <>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Ime"
        value={newData.name}
        onChange={handleFormData}
      ></input>
      <input
        type="text"
        id="surname"
        name="surname"
        placeholder="Prezime"
        value={newData.surname}
        onChange={handleFormData}
      ></input>

      <input
        type="text"
        id="image"
        name="image"
        placeholder="../jadro.jpg"
        value={newData.image}
        onChange={handleFormData}
      ></input>
      <input
        type="text"
        id="contact"
        name="contact"
        autoComplete="auto"
        placeholder="Email adresa"
        value={displayEmail}
        onChange={handleFormData}
      ></input>
      {displayContactError && (
        <span className="errorMessage">Unesite ispravan e-mail</span>
      )}

      <i className="bx bx-location-plus"></i>
      <select
        id="city"
        name="city"
        value={newData.city}
        onChange={handleFormData}
        required
      >
        {cities.map((city) => (
          <option key={city.name} value={city.name}>
            {city.name}
          </option>
        ))}
      </select>

      <label>
        Aktivnosti:
        <label>
          <input
            type="checkbox"
            name="activities"
            checked={newData.activities.includes("Ekologija")}
            value="Ekologija"
            onChange={handleFormData}
          ></input>
          Ekologija
        </label>
        <label>
          <input
            type="checkbox"
            name="activities"
            value="Edukacija"
            checked={newData.activities.includes("Edukacija")}
            onChange={handleFormData}
          ></input>
          Edukacija
        </label>
        <label>
          <input
            type="checkbox"
            name="activities"
            checked={newData.activities.includes("Prijevoz")}
            value="Prijevoz"
            onChange={handleFormData}
          ></input>
          Prijevoz
        </label>
        <label>
          <input
            type="checkbox"
            name="activities"
            checked={newData.activities.includes("Razno")}
            value="Razno"
            onChange={handleFormData}
          ></input>
          Razno
        </label>
      </label>
      <button onClick={toggleEdit}>
        <i className="bx bx-x"></i>
      </button>
      <button onClick={sendData}>
        <i className="bx bx-check"></i>
      </button>
    </>
  );
}
